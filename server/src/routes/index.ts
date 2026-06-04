import { Router } from 'express'
import authRoutes from './auth.routes'
import portfolioRoutes from './portfolio.routes'
import holdingRoutes from './holding.routes'
import transactionRoutes from './transaction.routes'
import marketRoutes from './market.routes'
import { sendSuccess } from '../utils/response'

const router = Router()

router.use('/auth', authRoutes)
router.use('/portfolios', portfolioRoutes)
router.use('/holdings', holdingRoutes)
router.use('/transactions', transactionRoutes)
router.use('/markets', marketRoutes)

router.get('/health', (req, res) => sendSuccess(res, { status: 'ok' }))

export default router
