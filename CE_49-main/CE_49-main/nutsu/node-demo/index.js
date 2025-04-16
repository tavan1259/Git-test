
const http = require('http')
const port = 8000

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/html'})
    response.write(`
        <!doctype html>
        <html>
        <head>
            <title>Node.js</title>
        </head>
        <body>
            <h3>Welcome to Node.js</h3>
            <b>Node.js runs JavaScript on Server-Side</b>
        </body>
        </html>
    `)
    response.end()

}).listen(port)

console.log('Server listening on port ' + port)
