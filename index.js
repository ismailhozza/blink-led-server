const fs = require('fs')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const ledAttrFile = '/sys/class/ledclass/led02/led_attr'

const app = express()
app.use(cors())
app.use("/", express.static(__dirname + "/public"))
app.use(bodyParser.json())

//app.get('/', (req, res) => res.send('Welcome to blinking led light!'))

app.post('/api/blink', (req, res) => {
  const state = req.body.state
  if(state==="on") {

    fs.writeFile(ledAttrFile, 'on', (err) => {
      if (err) throw err;
      res.json({state:"on"})
    });
  } else if (state === "off") {
    fs.writeFile(ledAttrFile, 'off', (err) => {
      if (err) throw err;
      res.json({state:"off"})
    });
 }
})

app.get('/api/delay', (req, res) => {
  fs.readFile(ledAttrFile, "utf8", (err, data) => {
    if (err) throw err;
    res.json({delay: Number(data.split(" ")[0])})
  });
})


app.post('/api/delay', (req, res) => {
  const delay = req.body.delay
    fs.writeFile(ledAttrFile, delay, (err) => {
      if (err) throw err;
      res.json({delay:delay})
    });
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))

