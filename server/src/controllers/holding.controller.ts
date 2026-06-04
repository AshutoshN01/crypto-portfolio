import { NextFunction, Request, Response } from 'express'
import { holdingService } from '../services/holding.service'
import { sendSuccess } from '../utils/response'

export async function createHolding(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { holding: await holdingService.create(req.user!.id, req.body) }, 201)
  } catch (err) {
    next(err)
  }
}

export async function updateHolding(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { holding: await holdingService.update(req.user!.id, req.params.id, req.body) })
  } catch (err) {
    next(err)
  }
}

export async function deleteHolding(req: Request, res: Response, next: NextFunction) {
  try {
    await holdingService.delete(req.user!.id, req.params.id)
    return sendSuccess(res, { deleted: true })
  } catch (err) {
    next(err)
  }
}
