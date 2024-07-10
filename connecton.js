const mongoose = require("mongoose");

async function mongoDbConnect(url){
  return mongoose
  .connect(url)
  .then(()=>{console.log('mongoDb connect')})
  .catch((err)=>{console.log(err, 'mongoDb Error')})
}

module.exports ={
    mongoDbConnect,
}