const { v4: uuidv4 } = require('uuid');
const urls = new Map();

module.exports = (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const { url } = JSON.parse(body);
            const id = uuidv4().slice(0, 8); // Generate a short id
            urls.set(id, url); // Store the URL with id as the key
            res.end(JSON.stringify({ id, shortUrl: `https://${req.headers.host}/${id}` }));
        });
    } else if (req.method === 'GET') {
        const id = req.url.slice(1); // Remove the '/' from the URL path
        const url = urls.get(id);

        if (url) {
            res.writeHead(302, { Location: url });
            res.end();
        } else {
            res.writeHead(404);
            res.end('URL not found');
        }
    } else {
        res.writeHead(405);
        res.end(`${req.method} is not allowed.`);
    }
};
