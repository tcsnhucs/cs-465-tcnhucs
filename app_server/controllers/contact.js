var fs = require('fs');
var contactInfo = JSON.parse(fs.readFileSync('app_server/data/contact.json', 'utf8'));

/* Get contact page. */
const contact = (req, res) => {
    res.render('contact', {title: "Travlr Getaways", contactInfo });
};

module.exports = {
    contact
}