import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import serverMiddlewareError from './middlewares/serverMiddlewareError.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use(serverMiddlewareError);

export {
    app,
};
