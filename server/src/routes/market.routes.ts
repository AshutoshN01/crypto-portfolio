import { Router } from 'express'
import { coinDetails, prices, topCoins } from '../controllers/market.controller'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()

router.use(requireAuth)
router.get('/coins', topCoins)
router.get('/coins/:id', coinDetails)
router.get('/prices', prices)

export default router
