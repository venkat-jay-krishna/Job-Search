const mongo = require('mongoose');

mongo.connect('mongodb://localhost/webscrape');

const userschema = new mongo.Schema({
    title: String,
    company:String,
    location:[String],
    experience:String,
    salary:String,
    skillset:[String],
    url:String
});

module.exports = mongo.model('user',userschema);
