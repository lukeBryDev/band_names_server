const { io } = require('../index');


// Mesajes de Sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje!!!:', payload);
        io.emit('mensaje', { admin: payload });

    });

    client.on('emitir-mensaje', (payload) => {
        console.log('emitir-mensaje!!!:', payload);
        //io.emit('emitir-mensaje', payload); // emite a todos
        client.broadcast.emit('emitir-mensaje', payload); // emite a todos menos el que lo emitio
    });

});