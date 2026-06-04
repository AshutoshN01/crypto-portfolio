import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { sendError } from '../utils/response'

function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      return sendError(res, 400, parsed.error.errors[0]?.message ?? 'Invalid request', 'VALIDATION_ERROR')
    }
    req.body = parsed.data
    return next()
  }
}

export const validatePortfolioCreate = validate(z.object({
  name: z.string().min(1).max(80),
  baseCurrency: z.string().min(3).max(6).optional(),
  description: z.string().max(500).optional()
}))

export const validatePortfolioUpdate = validate(z.object({
  name: z.string().min(1).max(80).optional(),
  baseCurrency: z.string().min(3).max(6).optional(),
  description: z.string().max(500).optional()
}))

export const validateHoldingCreate = validate(z.object({
  portfolioId: z.string().min(1),
  coinId: z.string().min(1),
  symbol: z.string().min(1).max(12),
  name: z.string().min(1).max(80),
  quantity: z.coerce.number().positive(),
  averageBuyPrice: z.coerce.number().nonnegative()
}))

export const validateHoldingUpdate = validate(z.object({
  quantity: z.coerce.number().nonnegative().optional(),
  averageBuyPrice: z.coerce.number().nonnegative().optional(),
  currentPrice: z.coerce.number().nonnegative().optional()
}))

export const validateTransactionCreate = validate(z.object({
  portfolioId: z.string().min(1),
  holdingId: z.string().optional(),
  type: z.enum(['BUY', 'SELL', 'TRANSFER_IN', 'TRANSFER_OUT', 'FEE']),
  coinId: z.string().min(1),
  symbol: z.string().min(1).max(12),
  quantity: z.coerce.number().nonnegative(),
  price: z.coerce.number().nonnegative(),
  fee: z.coerce.number().nonnegative().optional(),
  note: z.string().max(500).optional(),
  executedAt: z.string().datetime().optional()
}))
