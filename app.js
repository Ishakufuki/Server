const{ configDotenv }=require("dotenv");
const express = require('express');


const cors = require('cors');
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');

configDotenv();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

//Middleware to parse JSON bodies
const app = express();
app.use(express)

app.use(cors())
app.use(bodyParser.json());




// 'POST, GET, PATCH, PUT, DELETE'
const uri = process.env.SUPABASE_URL
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      
    }
  }
  run().catch(console.dir);

const studList = [
    { id: 1, name: "John doe", age: 24},
    { id: 2, name: "Micheal sun", age: 23},
    { id: 3, name: "Timothy Rain", age: 22},
    { id: 4, name: "Mark sunday", age: 21},
    { id: 5, name: "Malan Mafwil", age: 20},
];

app.get('/',(req, res)=>{
    res.send("HELLO WORLD")
});

app.get("/student-list",async(req, res)=> {
   
    try {
      const result = await client
      .db("CICT")
      .collection("student")
      .find()
      .toArray();
      console.log(result)
      res.json({data: studList})
    } catch (error) {
      
    }
})
app.post("/student", async (req, res)=>{
  try {
    const name = req.body.name;
    const age = req.body.age;

    if(!name || !age){
        res.status(403).json({ message: "All fields are required"});
        return;
    }

    const result = await client.db("CICT").collection("students").insertOne({
      name:name, 
      age:age,
    });
    
    console.log(result);

    res.status(200).json({message: "student added successfully"})

  } catch (error) {
    console.log(error)
  }
    

});

app.listen(port,host,()=>console.log("app is running on port"+port))
