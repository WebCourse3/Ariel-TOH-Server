const express = require('express');
const router = express.Router();
let heroes = require('./state').heroes;

router.route('/')
    .get((req, res) => {
        res.send(heroes);
    })
    .post((req, res) => {
        heroes.push({
            id: req.body.id,
            name: req.body.name,
        });
        res.send(heroes);
    })
    .delete((req, res) => {
        heroes = heroes.filter(hero => hero.name != req.query.name);
        res.send(heroes);
    });

router.route('/:id')
    .get((req, res) => {
        res.send(heroes.filter(hero => hero.id == req.params.id));
    })
    .put((req, res) => {
        const hero = heroes.find(hero => hero.id == req.body.id);
        if (hero) {
            hero.name = req.body.name
        } else {
            heroes.push({
                id: req.body.id,
                name: req.body.name,
            });
        }
        res.send(heroes);
    })
    .delete((req, res) => {
        heroes = heroes.filter(hero => hero.id != req.params.id);
        res.send(heroes);
    });

module.exports = router;
