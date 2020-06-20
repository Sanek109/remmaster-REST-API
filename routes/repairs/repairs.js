const express = require('express');
const {Router} = require('express');
const Repairs = require('../../models/Repairs');
const router = Router();
const jsonParser = express.json();

router.get('/api/repairs', (req, res) => {
    Repairs.find({}, (err, repairs) => {
        if(err) console.log(err);

        res.send(repairs)
    })
})

router.get('/api/repairs/search', async (req, res) => {

    let select = req.query.select;
    let value = req.query.value;
    const repairs = await Repairs.find({[select]: value})
    res.send(repairs)
})

router.get('/api/repairs/search/repair', async (req, res) => {

    let repairs = req.query.repairs;
    let name = req.query.name;

    const repair = await Repairs.find({repairs: repairs, name: name})
    res.send(repair)
})

router.post('/api/repairs', jsonParser, async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let {repairs, name, model, price} = req.body;

    const repair = new Repairs({
        repairs: repairs,
        name: name,
        model: model,
        price: price
    })

    await repair.save((err) => {
        if(err) return console.log(err);
        res.send(repair);
    })
})

router.put('/api/repairs', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let {id, repairs, name, model, price} = req.body;
    const newRepair = {
        repairs: repairs,
        name: name,
        model: model,
        price: price
    }

    Repairs.findOneAndUpdate(
        {_id: id},
        newRepair,
        {new: true},
        (err, repair) => {
            if(err) return console.log(err)

            res.send(repair)
        }
    )
})

router.delete('/api/repairs/:id', jsonParser, async (req, res) => {
    const id = req.params.id;
    await Repairs.findByIdAndDelete(id, (err, repair) => {
        if(err) return console.log(err)
        res.send(repair)
    });
});

module.exports = router;
