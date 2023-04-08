//const fs = require("fs")
const fs = require("fs-extra");
const cron = require('node-cron');
const { keep_alive } = require("./keep_alive.js");
const http = require('https');
const login = require("node-ainzfb");
const axios = require("axios");
const request = require('request');
login({ appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8')) }, (err, api) => {
  
    if (err) return console.error(err);
    api.setOptions({
      listenEvents: true, selfListen: false});
    const listenEmitter = api.listenMqtt(async (err, event) => {
        if (err) return console.error(err);
                let msgid = event.messageID;
                let input = event.body;
            let input2 = input.toLowerCase();
            
                if (event.body != null) {
                    let input = event.body;
                  let input2 = input.toLowerCase();
if (input.startsWith("status") || input.startsWith("Status") || input.startsWith("stats")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {         api.sendMessage("»Ai is acive\n»Anti unsent is active\n»Antout is active (auto)", event.threadID,event.messageID);
                            
                       }
}
if(input.startsWith("sim") || input.startsWith("Sim")) {
								let data = input.split(" ")
								if(data.length < 2) {
api.sendMessage("Common ask something", event.threadID, event.messageID)
								} else {
									try {
										data.shift()
										let txt = data.join(" ")
										axios.get("https://api.simsimi.net/v2/?text=" + txt + "&lc=en&cf=false").then((response) => {
api.sendMessage(response.data["success"], event.threadID, event.messageID)
										})
									} catch(err) {
api.sendMessage(`${err.message}`, event.threadID, event.messageID)
									}
								}
              }
if(input2.includes("sanaol") || input2.includes("sana ol") || input2.includes("naol") || input2.includes("sabaok") || input2.includes("sana all")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("(2)", event.threadID, event.messageID)
               }
        })
}
                    if (input.startsWith("ai") || input.startsWith("Ai") || input.startsWith("AI") || input.startsWith("aI")) {
            const configuration = new Configuration({
              apiKey: "apikey",
            });
            const openai = new OpenAIApi(configuration);
            let data = input.split(" ");
            if (data.length < 2) {
              api.sendMessage("Ask me something. I can help you to all your subjects, make an essay for you, help you in coding and more...", event.threadID, event.messageID);
            } else {
              try {
                data.shift()
                const completion = await openai.createCompletion({
                  model: "text-davinci-003",
                  prompt: data.join(" "),
                  temperature: 1,
                  max_tokens: 2048,
});
api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
              }
              catch (error) {
                if (error.response) {
                  console.log(error.response.status);
                  console.log(error.response.data);
                } else {
                  console.log(error.message);
                  api.sendMessage(error.message, event.threadID);
                }
              }
            }
          }
                }


      
    });
});