const express = require('express');
const cors = require('cors');
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

//Find Data By Id
app.get('/courses/:id', (request, response) =>{
    const id = request.params.id;
    const course = courses.find(course => course.id == id);
    console.log('Id:', id, course)
    response.send(course);
});

//Get Method With Response(Query)
app.get('/users', (req, res) =>{
    if(req.query.name){
        const search = req.query.name;
        const filtered = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0 );
        res.send(filtered);
    }
    else{
        res.send(users);
    }
   
});

//Data Post Method
app.post('/users', (req, res) =>{
    console.log('Post API Called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
})

app.listen(port, () =>{
    console.log('Node Server is Running on Port: ', port);
});