import { Router } from 'express'
import { createPortfolio, deletePortfolio, getPortfolio, listPortfolios, updatePortfolio } from '../controllers/portfolio.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { validatePortfolioCreate, validatePortfolioUpdate } from '../validators/product.validator'

const router = Router()

router.use(requireAuth)
router.get('/', listPortfolios)
router.post('/', validatePortfolioCreate, createPortfolio)
router.get('/:id', getPortfolio)
router.patch('/:id', validatePortfolioUpdate, updatePortfolio)
router.delete('/:id', deletePortfolio)

export default router
