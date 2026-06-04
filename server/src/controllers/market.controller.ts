import { NextFunction, Request, Response } from 'express'
import { marketService } from '../services/market.service'
import { sendSuccess } from '../utils/response'

export async function topCoins(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { coins: await marketService.topCoins(Number(req.query.limit ?? 25)) })
  } catch (err) {
    next(err)
  }
}

export async function coinDetails(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { coin: await marketService.coinDetails(req.params.id) })
  } catch (err) {
    next(err)
  }
}

export async function prices(req: Request, res: Response, next: NextFunction) {
  try {
    const ids = String(req.query.ids ?? '').split(',').filter(Boolean)
    return sendSuccess(res, { prices: await marketService.prices(ids) })
  } catch (err) {
    next(err)
  }
}
