require("dotenv").config();
const router = require('express').Router();
const parcels = require('../models/parcel');

let Parcels = [{
    title : "read book",
        descriptions: "a book you can read",
        image: "picture",
        categories: "horror",
        size: "1",
        color: "red",
        price: 50
},
{
    title : "read ur book",
        descriptions: "a book you can read",
        image: "picture",
        categories: "horror",
        size: "1",
        color: "red",
        price: 50
}]


router.get('/', (req, res, next) => {
    res.send(Parcels)
    console.log(Parcels)


});

router.post('/', async(req, res, next) => {
   const newParcels = new parcels ({
    title : req.body.title,
    descriptions : req.body.descriptions,
    image : req.body.image,
    categories : req.body.categories,
    size : req.body.size,
    color : req.body.color,
    price: req.body.price,

   });
   try {
     const savedParcels = await newParcels.save();
     res.status(200).send(savedParcels);
     console.log(savedParcels)

   } catch (error) {
    res.status(401).json("err")
    
   }
});

router.put('/:id', async(req, res) => {
    try {
        const updateParcel = await Parcels.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updateParcel)
    } catch (error) {
        res.status(500).json(err);
    }
    

});

router.delete('/:id', (req, res) => {
    const {id} = req.params.id;
    let parcel = Parcels.filter((Parcels) => Parcels.id !== id);
    res.send ("Information deleted")


})



module.exports = router;