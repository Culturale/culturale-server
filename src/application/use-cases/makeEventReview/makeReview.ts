
import type { Request, Response } from 'express';

import type {  IEvent } from '~/domain/entities/event';
import type { IReview } from '~/domain/entities/review';
import { EventRepository } from '~/domain/repositories';
import { ReviewRepository } from '~/domain/repositories/review-repository';
import type { MakeReviewDTO } from '~/infrastructure/dtos/make-review.dto';

export async function makeReview(req: Request, res: Response): Promise<void> {
  res.setHeader('Content-Type', 'application/json');
    try {

      const newValoracioDTO: MakeReviewDTO = req.body;
      const newIReview: IReview = await ReviewRepository.addReview(newValoracioDTO.eventId, newValoracioDTO.author, newValoracioDTO.puntuation, newValoracioDTO.comment);
      const event: IEvent = await EventRepository.findEvent(newIReview.eventId);
      const oldValoracions: IReview[] =  event.valoracions;
      if (event) {
        for (const val of oldValoracions) {
          const valo = await ReviewRepository.findValoracioById(val._id);
          if (valo.author === newIReview.author) {
            res.status(403).json({
              message: `Usuario ${valo.author} ya ha valorado este evento`,
            });
            return;
            }
          }
     event.updateValoracions(newIReview);
     try{
      await EventRepository.editarEvent(event);
      }
      catch (e){
        res.status(119);
         return;
      }
      res.status(200).json({
          message: 'Valoracion añadida correctamente',
          newValoracioDTO,
        });
       return ;
      } else {
        res.status(404).json({
          message: 'Event not found',
        });
      }
    } catch (e) {
      res.status(500);
      res.json({
        error: e,
      });
    }
  }
  