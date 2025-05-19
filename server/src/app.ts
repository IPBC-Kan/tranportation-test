// router imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as middleware from './middleware';
import router from './routes';
import passport from 'passport';
import { bearerStrategy } from './auth/authConfig';
import { authenticate, getUser } from './middleware/authorization';
import { AuthenticatedRequest } from './interfaces/Auth';
import mongoose from 'mongoose';
import { connectDB } from './db/database';
import { config } from 'dotenv';

// import CHANNEL from './db/models/channels';

const app = express();
config();

// var corsOptions = {
// 	origin: ['http://localhost:3000'],
// 	optionsSuccessStatus: 200, // For legacy browser support
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: 20000 }));
app.use(express.json());
app.use(passport.initialize());
passport.use(bearerStrategy);

app.get('/api', (req, res) => {
    res.send('Up and running: ' + process.env.BE_VERSION + ``);
});

//Check DB Running
app.get('/api/health', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).json({ success: true, message: 'Server and database are healthy' });
    } else {
        res.status(500).json({ success: false, message: 'Database connection issue' });
    }
});
connectDB()
    .then(() => {
        console.log('Database connected, setting up routes...');

        // Secure API routes after successful DB connection
        app.use(authenticate);
        app.use((req, res, next) => getUser(req as AuthenticatedRequest, res, next));

        // API routes setup
        app.use('/api/auth', router.auth);

        // Custom middleware for not found and error handling
        app.use(middleware._notFound);
        app.use(middleware._error);
    })
    .catch((error) => {
        console.error('Database connection failed. Routes will not be setup.', error);
    });

export default app;
