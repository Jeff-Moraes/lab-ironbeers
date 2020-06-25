const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:

app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      res.render('beers', { beer: beersFromAPI });
    })
    .catch(err => console.log(err));
});

app.get('/beer/:id', (req, res) => {
  // console.log(req.params.id);
  // const id = req.params.id;
  punkAPI
    .getBeer(req.params.id)
    .then(beerFromAPI => {
      res.render('beer', { beer: beerFromAPI[0] });
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromAPI => {
      // console.log(randomBeerFromAPI[0]);
      res.render('beer', { beer: randomBeerFromAPI[0] });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
