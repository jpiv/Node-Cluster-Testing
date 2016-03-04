const http = require('http');
const cluster = require('cluster');

if(cluster.isMaster) {
	console.log('This is a node cluster app, spawning children...');
	cluster.fork();
	cluster.fork();
	cluster.on('online', worker => {
		console.log('Worker: ' + worker.id + ' is Online.');
	});
	cluster.on('listening', worker => {
		console.log('Worker: ' + worker.id + ' is Listening.');
		if(worker.id === 2) {
			console.log('All workers are listening, sending 10 requests');
			sendReqs();
		}
	});
	const sendReqs = () => {
		for(var i = 0; i < 10; i++) {
			http.get('http://localhost:9999', response => {
				console.log('Got response from cluster:', response.statusMessage);
			}).on('error', err => {
				console.log('There was an error with a request', err);
			});
		}
	};
} else {
	const handler = (req, res) => {
		if(req.method === 'GET') {
			console.log('Worker: ' + cluster.worker.id + ' is now working on the request');
			setTimeout(() => {
				console.log('GET request - handled by worker:', cluster.worker.id);
				res.statusCode = 200;
				res.end('Okay, process id: ' + process.pid);
			}, 5000);
		}
	};
	const server = http.createServer(handler);
	const port = 9999;
	server.listen(port, '127.0.0.1');
}

