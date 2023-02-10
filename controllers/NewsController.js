const News = require("../models/NewsModel")
let path = require('path');
const uniqueID = require("../helpers/uniqueID");
const apiResponse = require("../helpers/apiResponse");

exports.addNews = async (req, res) => {

  var imagesArray = [];
  req.files.map(async (file) => {
    file.filename = "http://localhost:5000/public/" + file.filename;
    console.log(file.filename);
   });

  try {
    const newNews = new News({
      ID: uniqueID.generateNewsID(),
      body: req.body.body,
      images: req.files,
      newsName: req.body.newsName,
      newsDescription: req.body.newsDescription,
    });

   await newNews.save();

   apiResponse.Success(res,"News Added Successfully", {data:newNews}); 
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }
};

exports.getNews = async (req, res) => {
  const id = req.params.id;
  try {
    let News = await News.findOne({ _id: id });
    apiResponse.Success(res,"News Detail", {data:News});
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }

};

exports.getNews = async (req, res) => {
  try {
    let News = await News.find();
    apiResponse.Success(res,"All News", {data:News});
  } catch (err) {
    apiResponse.ServerError(res,"Server Error",{err:err});
  }

};



exports.updateNews = async (req, res) => {
  const { id } = req.params;
  console.log(req.body,req.files);
  const filter = { _id: id };
  const update = { 
    ID: req.body.ID,
    body: req.body.body,
    images: req.files,
    newsName: req.body.newsName,
    newsDescription: req.body.newsDescription, 
      };

  try {
  
  let data = await News.findOneAndUpdate(filter, update);
  console.log(data);
  apiResponse.Success(res,"News Details Updated", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}

exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  const filter = { _id: id };

  try {
  
  let data = await News.findOneAndDelete(filter);
  console.log(data);
  apiResponse.Success(res,"News Details Deleted", {data:data});

  } catch (error) {
    apiResponse.ServerError(res,"Server Error",{err:error});
  }
}
