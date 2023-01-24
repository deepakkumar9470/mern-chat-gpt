import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
const PORT = process.env.PORT || 8000
import cors from 'cors'

// OpenAi configuration
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-F59mYjfpQKIdt0gjhkyD9ikk",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi
(configuration);

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended  :true}))




app.post('/', async (req,res)=>{

    const {message} = req.body

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });

      res.json({
        message : response.data.choices[0].text
      })

})

app.listen(PORT, ()=>{
    console.log(`Server started at PORT http://localhost:${PORT}`)
})