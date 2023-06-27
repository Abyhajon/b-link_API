import {Router} from 'express'
import { translateToBraille } from './server'
import { check, validationResult } from "express-validator"
import { createTranslation, getTransalation } from './handlers/translations';

const router = Router()

// Validation middleware
export const validateTranslateRequest = [
    check('text').notEmpty().withMessage('Text is required'),
  ];

//POST /translate
router.post('/translate', validateTranslateRequest, createTranslation);

//GET /translation
router.get('/translations', getTransalation);

export default router