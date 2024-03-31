const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require("compression");
const cookieParser = require("cookie-parser");



const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const publicDataRouter = require('./routes/publicDataRouter');

const app = express();


// Middlewares
app.use(helmet());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 1000,
    message: 'Too many requests from this ip, please try after one hour'
});

app.use('/api', limiter)
app.use(express.json({limit: '10kb'}));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(cookieParser());


// swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/publicdata', publicDataRouter);



app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;