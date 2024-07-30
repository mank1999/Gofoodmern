const express = require("express");
const router = express.Router();
const OrderSchema = require("../model/Orders");

router.post("/orderdata", async (req, res) => {
    console.log('data to server runniing')
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  //if null email existing in db thrn create else : Insertmany()
  let eId = await OrderSchema.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await OrderSchema.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.json({ error: error.message });
    }
  } else {
    try {
      await OrderSchema.findOneAndUpdate({email: req.body.email},
        {$push:{order_data : data}}
        ).then(()=>{
            res.json({success : true})
        })
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
  }
});
router.post("/myorderdata", async (req, res) => {
  try {
    let mydata =await OrderSchema.findOne({'email' : req.body.email})
    res.json({myorder : mydata})
  } catch (error) {
    res.jsom({error : error.message})
  }
})
module.exports = router