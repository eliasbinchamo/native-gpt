const { Translate } = require("@google-cloud/translate").v2;
const { Configuration, OpenAIApi } = require("openai");
var cors = require("cors");
require("dotenv").config();
// const fs = require("fs");

const express = require("express");
let port = process.env.PORT;

let configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
let openai = new OpenAIApi(configuration);
const app = express();
//cors

app.use(cors());
// Create a client
const translate = new Translate({
  key: process.env.TRANSLATE_KEY,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let translation = "no results";
app.get("/translate", async (req, res) => {
  const text = req.query.text;
  let target = "en";
  let translated_data = [];

  //translate from amharic to english
  await translate
    .translate(text, target)
    .then(results => {
      translation = results[0];
      console.log("translation: " + translation);
      //perform ai completion
      openai
        .createCompletion({
          prompt: translation,
          model: "text-davinci-002",
          max_tokens: 200,
          // temperature: 0.7,
        })
        .then(generated => {
          //translate generated text to native language
          translate
            .translate(generated.data.choices[0].text, "am")
            .then(results => {
              translation = results[0];
              //   console.log(results);
              translated_data.push(translation);
              //   console.log(translated_data);
              res.json(translated_data).send();
            })
            .catch(err => {
              console.error("ERROR:", err);
              res.status(500).send(err.message);
            });
        });
      // let dat = [];
      // translate.getLanguages().then(data => {
      //   dat = data[0].map(val => {
      //     return JSON.stringify(val);
      //   });
      //   console.log(dat);
      //   fs.writeFile("./helloworld.txt", dat, function (err) {
      //     if (err) return console.log(err);
      //     console.log("Hello World > helloworld.txt");
      //   });
      //   // console.log(dat);
      // });
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.status(500).send(err.message);
    });
});

// app.get("/ai", async (req, res) => {
//   let complation = await openai.createCompletion({
//     prompt:
//       "how do you make a website? show me a step-by-step guide using 500 words or less.",
//     model: "text-davinci-003",
//     temperature: 0.7,
//     max_tokens: 356,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });

//   console.log(complation.data);
//   res.send(complation.data.choices[0].text);
// });
