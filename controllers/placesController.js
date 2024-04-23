const Places = require('../Models/places')

exports.createPlaces = async (req,res)=>{
    let places= await Places.findOne(req.body.createPlace)
    if(places){
        return res.status(400).json({message:'Already existed '})
    }
    let createPlaces = await Places.create({
        createPlace:req.body.placeCreate
    })
    if(!createPlaces){
        return res.status(400).json({message:'Something went wrong '})
    }
    res.send(places)

}