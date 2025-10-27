const express = require('express');
const cors = require('cors')
const User = require('./models/db_connect');
const {getdata}= require('./models/get_data');


const app = express()
app.use(cors())
app.use(express.json());

app.get('/jobdetails/:name/:locatn/:expne', async (req,res)=>{
    let name = req.params.name.replace("%20"," ");
    let locatn=req.params.locatn;
   let expne=req.params.expne.toString();
    let result = await User.find({ title:{$regex : name,$options:"i"},location:{$regex : locatn,$options:"i"},experience:{$regex : expne,$options:"i"}});
    if(result.length>0)
    {   console.log("executing...");
       res.send(result);
   }
    else {
        let results=await getdata(name,locatn,expne);
         //console.log("this is executing...");
        res.send(results);
    }
})
app.get('/jobdetails',async(req,res)=>{
    let result=await User.find();
    res.send(result);
})

app.listen(8080);