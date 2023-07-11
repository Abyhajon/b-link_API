import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/users'
import { error } from 'console'


const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Translation logic
export const translateToBraille = (text: string): string => {
    const brailleMapping: { [key: string]: string } = {
      A: "⠈",
      B: "⠃",
      C: "⠉",
      D: "⠙",
      E: "⠑",
      F: "⠋",
      G: "⠛",
      H: "⠓",
      I: "⠊",
      J: "⠚",
      K: "⠅",
      L: "⠇",
      M: "⠍",
      N: "⠝",
      O: "⠕",
      P: "⠏",
      Q: "⠟",
      R: "⠗",
      S: "⠎",
      T: "⠞",
      U: "⠥",
      V: "⠧",
      W: "⠺",
      X: "⠭",
      Y: "⠽",
      Z: "⠵",
      ".": "⠲",
      ",": "⠂",
      ";": "⠆",
      ":": "⠒",
      "!": "⠖",
      "?": "⠦",
      "-": "⠤",
      "'": "⠄",
      "(": "⠐",
      ")": "⠄⠆",
      "/": "⠌",
      "@": "⠈⠲",
      "$": "⠚⠴",
      "&": "⠯"
    };
  
    let brailleText = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (brailleMapping.hasOwnProperty(char)) {
        brailleText += brailleMapping[char];
      } else {
        brailleText += char;
      }
    }
return brailleText;
};

app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: 'hello'})
})

app.post('/translate', (req, res) => {
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
  
    const brailleTranslation = translateToBraille(text);
  
    res.status(200).json({ brailleTranslation });
  });

  
//Mounting the router 
app.use('/api', router)

app.post('/user', protect, createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    console.log(error)
    res.status(500).json({message: 'internal server error'})
  }
})

export default app