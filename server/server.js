const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes')
require('dotenv').config();
const cors = require('cors');

// ...

app.use(cors());


app.use(express.json())
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url, req.body);
    next();
  });

app.use('/api/auth', authRoutes);
app.use('/api/task',taskRoutes);

app.listen(4000,()=>{
    console.log("connected to 4000")
})