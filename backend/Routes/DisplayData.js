const express = require("express");
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {
        let fooddata = global.foodData
        let foodCatg =  global.foodCatg
        // console.log(global.foodData);

        res.send({fooddata,foodCatg})
      
    } catch (error) {
        console.log(error);
        res.send('server error')
    }
})
module.exports = router