import { NextFunction, Request, Response } from 'express'
import { transactionService } from '../services/transaction.service'
import { sendSuccess } from '../utils/response'

export async function listTransactions(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { transactions: await transactionService.list(req.user!.id, { portfolioId: req.query.portfolioId as string | undefined, type: req.query.type as string | undefined }) })
  } catch (err) {
    next(err)
  }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, { transaction: await transactionService.create(req.user!.id, req.body) }, 201)
  } catch (err) {
    next(err)
  }
}
