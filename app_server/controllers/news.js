var fs = require('fs');
var theNews = JSON.parse(fs.readFileSync('app_server/data/news.json', 'utf8'));

/* Get news page. */
const news = (req, res) => {
    res.render('news', {title: "Travlr Getaways", theNews });
};

module.exports = {
    news
}