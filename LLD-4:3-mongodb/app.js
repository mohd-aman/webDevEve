const mongoose = require('mongoose');

const DB_URL =
  "mongodb+srv://mohdaman1:C7jcY2g70yv9GHOc@cluster0.glsla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL)
  .then(function (connection) {
    console.log("Connection established");
  })
  .catch(function (error) {
    console.log(error);
  });
  

  //Define a schema for user

  const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    createdAt:Date,
    updatedAt:Date,
  })

  //Pre-save hook to add timestamps 
  userSchema.pre('save',function(next){
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt){
        this.createdAt = now;
    }
    next();
  })

  userSchema.post('save',function(doc,next){
    console.log(`User ${doc.name} saved successfully`);
    next();
  })

  //Create a model based on userSchema
  const User = mongoose.model("User",userSchema);

  const newUser = new User({name:"Alice",email:"abex@gmail.com"});

  newUser.save(); // save user to db