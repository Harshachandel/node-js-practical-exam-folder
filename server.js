
const express = require('express');

require('dotenv').config();
// const cookieSession = require('cookie-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
// const userRoutes = require('./routes/File.routes');

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);


// app.use(cookieSession({
//     name : 'session',
//     keys : [process.env.SECRET_KEY],
//     maxAge: 24*60*60*1000
// }))

const userRoutes = require('./routes/File.routes');

app.get('/', (_, res) => {
    res.send('Hello World!');
})

app.use('/api/user', userRoutes);
app.use("/api/tasks", require("./routes/task.routes"));

require('./config/db')

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is Running on Port http://localhost:${PORT}`)
})
