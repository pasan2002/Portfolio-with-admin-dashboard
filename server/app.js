require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const path = require('path');

const express = require("express");
const app = express();


const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
//use v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

//connectDB
const connectDb = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

//project router
const projectRouter = require("./routes/projects");
const publicRouter = require("./routes/public")

//skill router
const skillRouter = require("./routes/skills")

//error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// Routers
const authRouter = require("./routes/auth");

// Mounting routes
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/projects', authenticateUser, projectRouter);
app.use("/api/v1/public", publicRouter )
app.use("/api/v1/skills", authenticateUser, skillRouter)

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();

module.exports = app;
