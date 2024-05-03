import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router()

router.post('/create-user', userController.createUser )
router.get('/', userController.getAllUser )
router.get('/:id', userController.getSingleUser )
router.patch('/:id', userController.updateUsers )
router.delete('/:id', userController.deleteUsers )


export const userRouters = router;