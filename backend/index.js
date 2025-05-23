const express = require("express");
require("./db/config");
const userModel = require("./db/User");
const productModel = require("./db/Product");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// signup api
app.post("/register", async (req, res) => {
  const user = new userModel(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

// login api
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let result = await userModel.findOne(req.body).select("-password");
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Please Enter Email and Password" });
  }
});

// add product api
app.post("/add_product", async (req, res) => {
  let product = new productModel(req.body);
  product = await product.save();
  res.send(product);
});

// get all product api
app.get("/get_products", async (req, res) => {
  let data = await productModel.find();
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "Null" });
  }
});

//get single user
app.get("/get_user/:id",async (req,res)=>{
  let user=await userModel.find({_id:req.params.id}).select("-password");
    res.send(user);
})

// get products of specific user
app.get("/get_products/:id", async (req, res) => {
  let data = await productModel.find({ userID: req.params.id });
  if (data.length > 0) {
    res.send(data);
  } else {
    res.send({ result: "Null" });
  }
});

// delete product api
app.delete("/delet_products/:id", async (req, res) => {
  let data = await productModel.deleteOne({ _id: req.params.id });
  console.log("data is deleted");
  res.send(data);
});

// get single product api
app.get("/get_single/:id", async (req, res) => {
  let data = await productModel.findOne({ _id: req.params.id });
  if (data) {
    res.send(data);
  } else {
    res.send({ data: "Null" });
  }
});

// update item API
app.put("/update/:id", async (req, res) => {
  let result = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

// search API
app.get("/search/:key", async (req, res) => {
  let result = await productModel.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});

app.listen(5000);
