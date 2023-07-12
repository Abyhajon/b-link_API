import prisma from "../db"
import { translateToBraille } from "../server"
import { validationResult } from "express-validator"

//Get all Translations
export const getTranslation = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            translations: true
        }
    })
    
    if (!user.translations){
        return res.status(404).json("No translations yet")
    }
    res.json({data: user.translations})
    } catch (e) {
        next(e)
    }
    
}

//Get One Translation
export const getOneTranslation = async (req, res, next) => {
    const id = req.params.id
   try {
        const translation = await prisma.translation.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        },
    })
    
    if (!translation) {
       return res.status(404).json({message: "Translation not found"}) 
    }
    res.json({data: translation})
    } catch(e) {
        next(e)
    }

    
    
}

// Create new translation
export const createTranslation = async (req, res) =>  {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { text } = req.body;
    const brailleTranslation = translateToBraille(text);

    console.log("This is a user",req.user)


    try {
        const savedTranslation = await prisma.translation.create({

            data: {
                text: req.body.text,
                belongsToId: req.user.id,
                brailleText: brailleTranslation,
                
            },
        } )

        res.status(200).json({data: savedTranslation})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occured while saving your translation'})
    }
}