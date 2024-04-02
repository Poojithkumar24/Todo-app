const express = require('express')
const cors = require('cors');

const app = express()
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();


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