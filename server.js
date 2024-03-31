const mongoose = require('mongoose');
const dotenv = require('dotenv');

// catching uncaught exception
process.on('uncaughtException', err => {
    console.log('uncaughtException', err.name, err.message);
    process.exit(1);
});

dotenv.config({path: './config.env'});
const app = require('./app');

// connect to mongodb database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(con => {
    console.log("DB connection successfull!!!");
}).catch(err => {
    console.log("DB connection error", err);
});


// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`);
});

// catching unhandled rejection 
process.on('unhandledRejection', err => {
    console.log('unhandledRejection', err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
