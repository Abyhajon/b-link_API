import {Router} from 'express'
import { check, validationResult } from "express-validator"
import { createTranslation, getTranslation } from './handlers/translations'
import { deleteUser } from './handlers/users'

const router = Router()

// Validation middleware
export const validateTranslateRequest = [
    check('text').notEmpty().withMessage('Text is required'),
  ];

//POST /translate
router.post('/translate', validateTranslateRequest, createTranslation);

//GET /translation
router.get('/translations', getTranslation);

//DELETE /delete user
router.delete('/delete', deleteUser)

export default router