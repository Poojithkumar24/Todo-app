const express = require('express')
const app = express()
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes')
const dotenv = require('dotenv').config();
const cors = require('cors');



app.use(cors());


app.use(express.json())
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url, req.body);
    next();
  });

app.use('/api/auth', authRoutes);
app.use('/api/task',taskRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server connected to port ${process.env.PORT}`)
})