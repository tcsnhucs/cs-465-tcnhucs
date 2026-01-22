const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('app_server/data/trips.json', 'utf8'));

/* Get travel page */
const travel = (req, res) => {
    res.render('travel', {title: "Travlr Getaways", trips});
};

module.exports = {
    travel
}