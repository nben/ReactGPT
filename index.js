const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const cors = require('cors')


// const { Configuration, OpenAIApi } = require("openai"); - redundant?
const configuration = new Configuration({
  organization: "org-8qWLXbrvG4vztI58EZDuwGTs",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


async function callApi(){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 3000,
        temperature: 0,
      });
    console.log(response.data.choices[0].text)    
}

// create a simple express API that calls the above function


const app = express()
app.use(cors());
app.use(express.json());
const port = 3080

app.post('/', async (req,res) => {
  const { message } = req.body;
  console.log(message)
  // const response = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: "Say this is a test",
  //       max_tokens: 3000,
  //       temperature: 0,
  //     });
    // console.log(response.data.choices[0].text) 
    res.json({
        //data: response.data
        data: message,
      })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});