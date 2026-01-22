const fs = require('fs');
const mainPage = JSON.parse(fs.readFileSync('app_server/data/index.json', 'utf8'));

/* Get Homepage */
const index = (req, res) => {
    res.render('index', { title: "Travlr Getaways", mainPage});
};

module.exports = {
    index
}