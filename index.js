const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://simpleCrudServer:xfWKc0lEvAkmkebu@cluster0.uqn5hx4.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("simpleCrud");
    const userCollection = db.collection("users");

    app.get("/users", async(req, res) => {
      // console.log('Ustho vai');
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const user = await userCollection.findOne(query);
      console.log('user id',id)
      res.send(user)
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query)
      res.send(result);

    })

    // app.get("/products", async(req, res) => {
    //   console.log('Ustho vai');
    //   // const cursor = userCollection.find();
    //   // const result = await cursor.toArray();
    //   res.send([]);
    // });

    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("salman shah");
});

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`);
});
