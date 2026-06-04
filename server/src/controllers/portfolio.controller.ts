import { NextFunction, Request, Response } from 'express'
import { portfolioService } from '../services/portfolio.service'
import { sendSuccess } from '../utils/response'

export async function listPortfolios(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { portfolios: await portfolioService.list(req.user!.id) })
  } catch (err) {
    next(err)
  }
}

export async function getPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { portfolio: await portfolioService.get(req.user!.id, req.params.id) })
  } catch (err) {
    next(err)
  }
}

export async function createPortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { portfolio: await portfolioService.create(req.user!.id, req.body) }, 201)
  } catch (err) {
    next(err)
  }
}

export async function updatePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { portfolio: await portfolioService.update(req.user!.id, req.params.id, req.body) })
  } catch (err) {
    next(err)
  }
}

export async function deletePortfolio(req: Request, res: Response, next: NextFunction) {
  try {
    await portfolioService.delete(req.user!.id, req.params.id)
    return sendSuccess(res, { deleted: true })
  } catch (err) {
    next(err)
  }
}
