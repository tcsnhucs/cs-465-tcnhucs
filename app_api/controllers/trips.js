const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /api/trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const q = await Model.find({}).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// GET: /api/trips/:tripCode - finds a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!q || q.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// POST: /api/trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    try {
        // Create new instance of the Trip model using data from the Angular form (req.body)
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
        });

        const q = await newTrip.save();

        if (!q) {
            return res.status(400).json({ message: "Database error: Trip not saved" });
        } else {
            return res.status(201).json(q);            
        }
    } catch (err) {
        // This catches schema validation errors (e.g., missing required fields)
        return res.status(500).json({ error: "Server error", details: err });
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    
    const q = await Model
        .findOneAndUpdate(
                { 'code' : req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
            .exec();

            if(!q)
            { // Database returned no data
                return res
                    .status(400)
                    .json(err);
            } else { // Return resulting updated trip
                return res
                    .status(201)
                    .json(q);
            }
            // Uncomment the following line to show results of operation
            // on the console
            console.log(q);
};

// Export the functions
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
