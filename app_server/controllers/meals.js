var fs = require('fs');
var foods = JSON.parse(fs.readFileSync('app_server/data/meals.json', 'utf8'));

/* Get meals page. */
const meals = (req, res) => {
    res.render('meals', {title: "Travlr Getaways", foods});
};

module.exports = {
    meals
}