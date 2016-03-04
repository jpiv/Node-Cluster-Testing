const bench = require('api-benchmark');

const app = process.argv[2];

const apis = {
	cluster: { cluster: 'http://localhost:9999' },
	singleProcess: { singleProcess: 'http://localhost:9998' }
};
const routes = {
	route: '/'
};

bench.measure(apis[app], routes, { runMode: 'parallel', minSamples: 500, maxTime: 50 }, (err, results) => {
	if(err) {
		console.log(err);
	} else {
		bench.getHtml(results, (err, html) => {
			if(err) {
				console.log(err);
				return;
			}
			console.log(html);
		})
	}
});