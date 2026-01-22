var fs = require('fs');
var room = JSON.parse(fs.readFileSync('app_server/data/rooms.json', 'utf8'));

/* Get rooms page. */
const rooms = (req, res) => {
    res.render('rooms', {title: "Travlr Getaways", room });
};

module.exports = {
    rooms
}