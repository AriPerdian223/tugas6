const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    
    const motoGPData = [
        {
            circuit: 'Losail',
            location: 'Qatar',
            winner:{
                firstName: 'Andrea',
                lastName: 'Dovizioso',
                country: 'Italy'
            }
        },
        {
            circuit: 'Autodromo',
            location: 'Argentine',
            winner:{
                firstName: 'Cal',
                lastName: 'Crutchlow',
                country: 'UK'
            }
        },
        {
            circuit: 'De Jerez',
            location: 'Spain',
            winner:{
                firstName: 'Valentino',
                lastName: 'Rossi',
                country: 'Italy'
            }
        },
        {
            circuit: 'Mugello',
            location: 'Italy',
            winner:{
                firstName: 'Andrea',
                lastName: 'Dovizioso',
                country: 'Italy'
            }
        },
    ];

    if (request.url === '/') {
        response.statusCode = 200;
        response.end(JSON.stringify(motoGPData));
    } else if (request.url === '/country') {
        const countryData = {};
        motoGPData.forEach((race) => {
            const country = race.winner.country;
            if (!countryData[country]) {
                countryData[country] = [];
            }
            countryData[country].push(race);
        });
        response.statusCode = 200;
        response.end(JSON.stringify(countryData));
    } else if (request.url === '/name') {
        const nameData = {};
        motoGPData.forEach((race) => {
            const name = `${race.winner.firstName} ${race.winner.lastName}`;
            if (!nameData[name]) {
                nameData[name] = [];
            }
            nameData[name].push(race);
        });
        response.statusCode = 200;
        response.end(JSON.stringify(nameData));
    } else {
        response.statusCode = 400;
        response.end('Bad Request');
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server Berjalan Pada http://${host}:${port}`);
});