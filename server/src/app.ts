import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from 'config';
import socket from './socket';
import moment from 'moment';

const port = config.get<number>('port');

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.send("Server is up and running");
})

httpServer.listen(port, () => {
    console.log(`Server is running on port: ${port}, \n at time: ${moment(new Date()).format('D/M/YYYY hh:mm:ss a')}`);
    socket({ io });
  });

