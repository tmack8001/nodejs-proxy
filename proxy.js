var http = require('http')
var url = require('url')
 
http.createServer(function(request, response){
    console.log(request.connection.remoteAddress + ": " + request.method + " " + request.url);
    var query_data = url.parse(request.url, true).query
    if (query_data && query_data.site) {
        var parsed_site  = url.parse(query_data.site, false, true)
        var request_options = {
            host: parsed_site.hostname,
            port: parsed_site.port || 80,
            path: parsed_site.path || '/',
            method: request.method
        }

        console.log(request_options.method + " " + request_options.host + ":" + request_options.port + request_options.path)
        var proxy_request = http.request(request_options, function(proxy_response){
            proxy_response.pipe(response)
            var responseCache = ''
            proxy_response.on('data', function (chunk) {
            
            })
            response.writeHead(proxy_response.statusCode, proxy_response.headers)
        }).on('error', function(e) {
            console.log('error: ' + e.message)
        })
        
        request.pipe(proxy_request)
    }
}).listen(8010)
