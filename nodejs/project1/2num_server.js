var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;
  var num1 = parseInt(qdata.num1);
  var num2 = parseInt(qdata.num2);
  var r = (num1+num2)/2;
  //console.log(r)
  fs.readFile('2num.html', function(err, data) {
    console.log(r)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    // res.send()
    return res.end();
  });
}).listen(8080);
