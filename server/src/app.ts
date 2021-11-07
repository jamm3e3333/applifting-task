import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from 'config';
import socket from './socket';
import moment from 'moment';

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
});

app.get('/', (req, res) => {
    res.send("Server is up and running");
})

httpServer.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}, \n at time: ${moment(new Date()).format('D/M/YYYY hh:mm:ss a')}`);
    socket({ io });
  });

