var fs = require('fs');
var info = JSON.parse(fs.readFileSync('app_server/data/about.json', 'utf8'));

/* Get about page. */
const about = (req, res) => {
    res.render('about', {title: "Travlr Getaways", info});
};

module.exports = {
    about
}