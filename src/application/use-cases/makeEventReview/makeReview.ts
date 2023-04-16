import type { Request, Response } from 'express';
import { IEvent } from '~/domain/entities/event';
import { IReview } from '~/domain/entities/review';
import { EventRepository } from '~/domain/repositories';

export async function makeReview(req: Request, res: Response): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
    try {

      const newValoracio: IReview = req.body;
      const event: IEvent = await EventRepository.findEvent(newValoracio.eventCode);
      const oldValoracions: IReview[] =  event.valoracions;
      const newValoracions: IReview[] = [];
      if (event) {
        for (const val of oldValoracions) {
          if (val.author === newValoracio.author) {
            res.status(404).json({
              message: `Usuario ${val.author} ya ha valorado este evento`,
            });
            return;
            }
          }
      newValoracions.push(newValoracio);
      event.updateValoracions([...oldValoracions, ...newValoracions]);
      await EventRepository.editarEvent(event);
        res.status(200).json({
          message: 'Valoracion añadida correctamente',
          newValoracio,
        });
      } else {
        res.status(404).json({
          message: `Event not found`,
        });
      }
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
  