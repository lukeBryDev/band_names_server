// este archivo solo se va a reinicializar cuando recargue el navegador web, haga algun cambio en el back end

const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Pink Floyd'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Queen'));

console.log(bands);

// Mesajes de Sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());

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

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands()); // emite a todos
    });

});