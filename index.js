const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

// const { Configuration, OpenAIApi } = require("openai"); - redundant?
const configuration = new Configuration({
  organization: "org-8qWLXbrvG4vztI58EZDuwGTs",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// create a simple express API that calls the above function


app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
const port = 3080

app.post('/', async (req,res) => {
  const { message } = req.body; // maybe add currentModel later
  console.log(message, "message")
  const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 3000,
        temperature: 0.5,
      });
    res.json({
        
        message: response.data.choices[0].text,
      })
});

// app.get('/models', async (req,res) => {
//   const response = await openai.listEngines();
//   console.log(response.data.data)
//   res.json({
//     models: response.data.data
//   })
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});