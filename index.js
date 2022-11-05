const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//API Data
const courses = require('./data/courses.json');
const users = require('./data/users.json');

app.use(cors());
app.use(express.json());

//Server Running Response on Root
app.get('/', (request, response) =>{
    response.send('Node Simple Server is Up');
});

//Simple Get Method
app.get('/courses', (request, response) =>{
    response.send(courses);
});

//-------------------Find Data By Id---------------------
app.get('/courses/:id', (request, response) =>{
    const id = request.params.id;
    const course = courses.find(course => course.id == id);
    console.log('Id:', id, course)
    response.send(course);
});

//---------Get Method With Response(Query)-------------
// app.get('/users', (req, res) =>{
//     if(req.query.name){
//         const search = req.query.name;
//         const filtered = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0 );
//         res.send(filtered);
//     }
//     else{
//         res.send(users);
//     }
   
// });

//-------Data Post Method-----------//

// app.post('/users', (req, res) =>{
//     console.log('Post API Called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// });


//MongoDB
const uri = "mongodb+srv://tushar:tushar2151@learnph.159fxoq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("simpleNode").collection("users");
//   // perform actions on the collection object
//   console.log('Database Connected')
//   client.close();
// });.
const run = async() =>{
    try{
        const userCollection = client.db('simpleNode').collection('users');
        // const user = {name: 'Anika Tabassum', Email: 'anika@ctg.com'}
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async(req, res) =>{
            const cursor = userCollection.find({});
            const users = await cursor.toArray(); 
            res.send(users);
        })

        app.post('/users', async(req, res) =>{
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })

    }
    finally{

    }
}

run().catch(error => console.log(error));


app.listen(port, () =>{
    console.log('Node Server is Running on Port: ', port);
});