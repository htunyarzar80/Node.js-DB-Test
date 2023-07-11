const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const {User} = require("./models")

const db = require('./models');

app.get('/select',(req,res)=>{
    User.findAll({where: {firstname :"Zack"}}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        console.log(error)
    })
})

app.get('/create',(req,res)=>{
    User.create({
        firstname: "Zack",
        age: 20,
    }).catch(error =>{
        if(error){
            console.log(error)
        }
    })
    res.send("Created")
})

app.get('/delete', (req, res) => {
    User.destroy({ where: { id: 2 } })
      .then(() => {
        res.send("Successfully Deleted!");
      })
      .catch((error) => {
        console.log(error);
        res.send("Failed to delete the user.");
      });
  });
  


db.sequelize.sync({}).then(() => {

    console.log('Connection configuration:', db.sequelize.config);

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}!`);
  });
}).catch(error => {
  console.error('Error connecting to the database:', error);
});
