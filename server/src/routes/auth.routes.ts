import { Router } from 'express'
import { register, login, refresh, logout, me } from '../controllers/auth.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { validateRegister, validateLogin } from '../validators/auth.validator'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/refresh', refresh)
router.post('/logout', requireAuth, logout)
router.get('/me', requireAuth, me)

export default router
