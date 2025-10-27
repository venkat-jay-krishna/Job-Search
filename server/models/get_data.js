const {connection} = require('mongoose');
const {scrapper} = require('./scrapper');
const User = require('./db_connect');

async function getdata(job,location,experience) {
  let results=[];
  try {
    const status = await scrapper(job, location, experience);
    console.log(status);

    results = await User.find();
    //console.log(results);

    const dlt = await User.deleteMany({});
    console.log(dlt);

  }
  catch (error) {
    console.error('Error fetching job cards:', error);
  }
  finally {
   // await connection.close();
   // console.log('Database connection closed');
  }

  return results;
};

module.exports = { getdata };
