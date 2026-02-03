// Bring in the DB connection and the Trip schema
const { exit } = require('process');
const Mongoose = require('./db');
const Trip = require('./travlr');
const path = require('path');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

// Delete any existing records, then insert seed data
const seedDB = async () => {
    if (Mongoose.connection.readyState !== 1) {
        await new Promise((resolve) => Mongoose.connection.once('connected', resolve));
    }
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB conection and exit
seedDB().then(async () =>{
    await Mongoose.connection.close();
    process.exit(0);
});