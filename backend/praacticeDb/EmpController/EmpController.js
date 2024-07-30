const employee = require("../models/Employee");
const Employee = require("../models/Employee");
// show the list of employee
const index = (req, res, next) => {
  employee
    .find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.json({
        message: "an error occure",
      });
    });
};

const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  employee
    .findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) =>
      res.json({
        message: "an error occure while show data",
      })
    );
};

const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  employee.save().then((respomse) => {
    res
      .json({
        message: "Empolyye addes succesfully",
      })
      .catch((err) => {
        res.json({
          message: "An error occure",
        });
      });
  });
};
//update an employee

const update = (req, res, next) => {
  let employyeID = req.body.employeeID;

  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };
  employee
    .findByIdAndUpdate(employyeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Employee update succesfully",
      });
    })
    .catch((err) => {
      res.json({
        message: " an error occure while update new  employee",
      });
    });
};
//delet an Employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findOneAndDelete(employeeID)
    .then(() => {
      res.json({
        message: "Employee delet succesfully",
      });
    })
    .catch((err) => {
      res.json({
        message: "an error while delete an employee",
      });
    });
};
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
