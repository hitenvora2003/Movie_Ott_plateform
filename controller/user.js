
const user = require('../model/user')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "vorahiten2024katargam@gmail.com",
    pass: "ltvtfyhyrnakgczo",
  },
});

const sendMail = async (email) => {
  const info = await transporter.sendMail({
    from: 'vorahiten2024katargam@gmail.com',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hi How are you Today</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
}


exports.pageview = async (req, res) => {
  try {
    const Alldata = await user.find().populate('subscription')
    console.log(Alldata);
    res.status(200).json({
      status: 'success',
      message: 'data found is complate',
      data: Alldata
    })
  }
  catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error
    })
  }
}
exports.createdata = async (req, res) => {
  try {
    let passdata = req.body
    console.log("pppppp====",passdata);
      passdata.password = await bcrypt.hash(passdata.password, 10)
    
    // passdata.image = req.file.filename
   
    sendMail(passdata.email)
    console.log("============",passdata);
    var datas = await user.create(passdata)
  
    console.log(datas);

    
   
    

    res.status(200).json({
      status: 'success',
      message: 'data create successfull',
      data: datas
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    })
  }
}
exports.deleteData = async (req, res) => {
  try {
    const deleteid = req.params.deleteid
    const deleteData = await user.findByIdAndDelete(deleteid)
    res.status(200).json({
      status: 'success',
      message: 'data delete is success',
      data: deleteData

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
}
exports.updatedata = async (req, res) => {
  try {

    const Id = req.params.editdata

    const editdata = await user.findByIdAndUpdate(Id, req.body, { new: true })
    res.status(200).json({
      status: 'success',
      message: 'data update is success',
      data: editdata

    })
  }
  catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error
    })
  }
}

exports.login = async (req, res) => {
  try {

    const passdata = req.body
    const emailVerify = await user.findOne({
      
    $or: [
    { email: passdata.email },
    { username: passdata.username },
    { mobile: passdata.mobile },
  ]
    
    });
    console.log(emailVerify);

    if (!emailVerify) throw new Error("Invalid name or email or mobile ");

    const passVerify = await bcrypt.compare(
      passdata.password,
      emailVerify.password
    );
    console.log(passVerify);

    if (!passVerify) throw new Error("Invalid password");

    const token = jwt.sign({id : emailVerify._id},'ten',{expiresIn : "1h"})

    res.status(200).json({
      status: "success",
      message: "Login user Success",
      data : emailVerify,token
    });  
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message
    });
  }
};