const {io} = require('../index');


// Mesajes de Sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Nuevo mensaje!!!:', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });

});