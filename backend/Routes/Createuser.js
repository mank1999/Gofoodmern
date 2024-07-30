const express = require("express");
const router = express.Router();
const UserSchema = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");
const jwtSecret = "MynameisManishiamworkingProfetional";

router.post(
  "/createuser",
  [
    body("name", "provide Your first Name").notEmpty(),
    body("password", "incorect password").isLength({ min: 5 }),
    body("email", "provide valid emails").isEmail(),
    body("location", "location value not be emplty").notEmpty(),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await UserSchema.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      console.log("updated to database");
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error });
    }
  }
);

router.post(
  "/userlogin",
  [
    body("password", "incorect password").isLength({ min: 5 }),
    body("email", "provide valid emails").isEmail(),
  ],
  async (req, res) => {
    let email = req.body.email;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      const UserData = await UserSchema.findOne({ email });

      if (!UserData) {
        return res
          .status(400)
          .json({ erros: " try log in with valid credentials" });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        UserData.password
      );
      if (!passCompare) {
        return res.status(400).json({ errors: "Try with correct password" });
      }
      const data = {
        user: {
          id: UserData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
