import { Router } from 'express'
import { createHolding, deleteHolding, updateHolding } from '../controllers/holding.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { validateHoldingCreate, validateHoldingUpdate } from '../validators/product.validator'

const router = Router()

router.use(requireAuth)
router.post('/', validateHoldingCreate, createHolding)
router.patch('/:id', validateHoldingUpdate, updateHolding)
router.delete('/:id', deleteHolding)

export default router
