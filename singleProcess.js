const http = require('http');

const handler = (req, res) => {
	if(req.method === 'GET') {
		res.statusCode = 200;
		res.end('Okay');
	}
};
const server = http.createServer(handler);
const port = 9998;
server.listen(port, '127.0.0.1');