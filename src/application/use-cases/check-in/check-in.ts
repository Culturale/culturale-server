import type { Request, Response } from 'express';

import type { IEvent, IUser } from '~/domain/entities';
import { EventRepository, UserRepository } from '~/domain/repositories';
import type { AddAssistentDto } from '~/infrastructure';

const MAX_DISTANCIA = 200;


function calcularDistancias(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Codigo para calcular la distancia entre dos puntos:
    /*where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
    note that angles need to be in radians to pass to trig functions!*/

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d;
}

export async function checkin(req: Request, res: Response): Promise<void> {
    try {
        // check-in user
        const addAssistentDto: AddAssistentDto = req.body;
        addAssistentDto.id = req.params.id;
        const { id, username, user_lat, user_long } = addAssistentDto;

        const event: IEvent = await EventRepository.findEvent(id);
        const user: IUser = await UserRepository.findByUsername(username);

        if (!event || !user) {
            res.status(404);
            res.json({
                message: 'Usuario o evento no encontrado',
            });
            return;
        }

        // Comprobamos si el usuario ya ha hecho check in al evento:
        const assistents: IUser[] = event.assistents;
        for (const ass of assistents) {
            if (ass._id.equals(user._id)) {
                res.status(403).json({
                    message: 'El usuario ya asiste a este evento',
                });
                return;
            }
        }


        if (calcularDistancias(event.lat, event.long, user_lat, user_long) > MAX_DISTANCIA) res.status(400).json({
            message: 'Usuario demasiado lejos para asistir',
        });


        event.addAssistent(user);

        await EventRepository.editarEvent(event);

        res.status(200);
        res.json({
          message: 'Asistente añadido correctamente',
        });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}