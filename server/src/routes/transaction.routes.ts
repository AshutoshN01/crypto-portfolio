import { Router } from 'express'
import { createTransaction, listTransactions } from '../controllers/transaction.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { validateTransactionCreate } from '../validators/product.validator'

const router = Router()

router.use(requireAuth)
router.get('/', listTransactions)
router.post('/', validateTransactionCreate, createTransaction)

export default router
