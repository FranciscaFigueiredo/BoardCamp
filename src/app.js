import express from 'express';
import cors from 'cors';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use();

app.use(serverMiddlewareError);

export {
    app,
};
