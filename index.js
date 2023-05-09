const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://absiddik:siddik12**@cluster0.l9yjteg.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect(); 
    const userCollocation =client.db("userDB").collection("user");

    app.get('/users',async(req,res)=>{
      const cursor = userCollocation.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post('/user', async(req,res)=>{
        const user  = req.body;
        console.log(user);
        const result = await userCollocation.insertOne(user);
        res.send(result)
    })



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('simple crud is running')
})

app.listen(port)