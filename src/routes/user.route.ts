import express from 'express'
import { userController } from '../controllers/user.controller'
import { checkAuth } from '../middleware/checkAuth'
import { USER_ROLE } from '../constant/user.constant'

const router = express.Router()

router.post('/create-user', userController.createUser)
router.get('/', checkAuth(USER_ROLE.admin), userController.getAllUser)
router.get('/:id', userController.getSingleUser)
router.patch('/:id', userController.updateUsers)
router.delete('/:id', userController.deleteUsers)

export const userRouters = router
