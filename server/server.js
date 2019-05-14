const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const GameArena = require('./src/engine/game-arena');
const Bot = require('./src/model/bot');
const League = require('./src/model/league');
const GameLauncher = require('./src/engine/game-launcher');
const Fight = require('./src/model/fight');

const botFolder = `${__dirname}/src/bots/`;

app.use(bodyParser.json());
app.use(cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://codeinthedarkve.eu.auth0.com/.well-known/jwks.json'
  }),
//   audience: 'jsfight',
  audience: 'XIa57QS7CiWhoD5Oo0xR8H78MGdJ45jL',
  issuer: 'https://codeinthedarkve.eu.auth0.com/',
  algorithms: ['RS256']
});


app.get('/', (req, res) => {
  res.send('OK');
})

app.post('/source', jwtCheck, (req, res) => {

  const userId = req.user.sub;
  const botId = req.body.botId;
  let code = req.body.source;
  const level = req.body.level;

  code = code.replace('/n', '');
  code = code.replace('/r', '');

  let pl2Source = null;

  switch (level) {
    case 'senior':
      pl2Source = fs.readFileSync(botFolder + 'senior.js').toString();
      break;
    case 'mid-level':
      pl2Source = fs.readFileSync(botFolder + 'mid-level.js').toString();
      break;
    case 'junior':
    default:
      pl2Source = fs.readFileSync(botFolder + 'junior.js').toString();
      break;
  }

  GameLauncher.launch(
    {
      source: code
    },
    {
      source: pl2Source
    })
    .then(gameHistory => {
      res.json(gameHistory)
    })
    .catch(error => {
      res.send(error)
    })


})

app.get('/mybots', jwtCheck, (req, res) => {

  const user = req.user.sub;

  Bot.all(user)
    .then(bots => {
      res.json(bots);
    })
    .catch(error => {
      res.status(500).send(error)
    })

})

app.get('/bot/:id', jwtCheck, (req, res) => {
  const user = req.user.sub;

  Bot.one({user, botId: req.params.id})
    .then(bot => {
      res.json(bot)
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message)
    })
})

app.get('/leaderboard', (req, res) => {
  res.json(JSON.parse(League.leaderboard()))
})

app.get('/fight/:bot1/:bot2', (req, res) => {

  Promise.all([
    Bot.one({botId: req.params.bot1}),
    Bot.one({botId: req.params.bot2}),
    Fight.one({
      bot1: req.params.bot1,
      bot2: req.params.bot2
    }),
      Fight.one({
        bot2: req.params.bot1,
        bot1: req.params.bot2
      }),
    ])
    .then(results => {

      res.json({
        bots: [results[0], results[1]],
        fights: [results[2], results[3]]
      })


    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })

})

app.get('/API', (req, res) => {
  res.send(fs.readFileSync('./src/API.md').toString());
})

app.post('/league', jwtCheck, (req, res) => {

  let code = req.body.source;
  code = code.replace('/n', '');
  code = code.replace('/r', '');

  GameArena.start({
      source: code,
      botId: req.body.botId,
      user: req.user.sub
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({error: error});
    })


})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})