const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express')

app.use(express.static(__dirname + '/public'));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node JS API Project using Socket',
      version: '1.0.0'
    },
    servers:[
      {
        url: 'https://localhost:3000'
      }
    ]
  },
  apis: ['./server.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api method is used to send messages in real time using socket.io
 *      description: This render a webpage where input data is taken and sent to display webpage.
 */




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  /* socket.on('message', (data) => {
    console.log('Message received: ' + data);
    io.emit('message', data); // Broadcast the message to all connected clients
  }); */

  // ...

// Receive data from the input fields
socket.on('inputData', (data) => {
  // Broadcast the received data to all connected clients
  io.emit('displayData', data);
});

// ...


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
