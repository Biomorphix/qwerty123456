var $ = require('jquery');
var url = require('url');
var http = require('http');
var https = require('https');
var whoisAPI = "langley.tk/whois/v01?domain="


var IPLIST = [
  '217.107.217.0/27',
  '217.107.34.0/24',
  '217.107.219.0/24',
  '81.177.6.0/24',
  '81.177.139.0/24',
  '81.177.140.0/24',
  '81.177.141.0/24',
  '81.177.135.0/24',
  '81.177.165.0/24'
];

var NAMESERVERLIST = [
  'ns1.jino.ru',
  'ns2.jino.ru',
  'ns3.jino.ru',
];

function compareIP(givenIP, IPList) {
  if(":" in givenIP) {
    return false;
  }

  var ip2int = function(ip) {
    var parts = ip.split('.');
    return (Number(parts[0]) << 24) + (Number(parts[1]) << 16) + (Number(parts[2]) << 8) + Number(parts[3]); 
  };

  var firstbits = function(subnet) {
    return Number(Math.pow(2, subnet-1) << (32-subnet));
  };

  var given = ip2int(givenIP);

  for(var i = 0; i < IPList.length; i++) {
    var s = IPList[i].split('/');
    var ip_addr = ip2int(s[0]);
    var subnet = firstbits(Number(s[1]));
    if((given & subnet) === ip_addr)
      return true;
  }
  return false;
}

function checkNameServers(nameServer, nameServerList) {
  for(var i=0; i < nameServerList.length; i++) {
    if(nameServerList[i] in nameServer) {
      return true;
    }
  }
  return false;
}

var LogicClass = function(val) {
  var domain = url.parse(val).hostname;
  var fullUrl = val;
  var requestOptions = {
    https: {
      hostname: fullUrl,
      port: 443,
      path: '/',
      method: 'GET'
    },
    http: {
      hostname: fullUrl,
      port: 80,
      path: '/',
      method: 'GET'
    }
  }
  var result = '';

  var whois = http.get(whoisAPI+domain, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      if(parsed.status === 'success') {
        return parsed.data;
      }
      else if(parsed.status === 'whois error') {
        result += 'Whois error|';
        return null;
      }
    });
  })
  .on('error', function(e) {
    console.log('Got error: '+e.message);
    result += 'Getting whois data error|';
  })
  .end();

  function doRequest() {
    var httpReq = http.request(requestOptions.http, function(response) {
      if(response.statusCode >= 500) {
        result += 'Internal Server Error. HTTP '+response.statusCode+'|';
      } 
      else if(response.statusCode >= 400) {
        result += 'No access or Not found HTTP'+response.statusCode+'|';
      }
      else if(response.statusCode >= 300) {
        result += 'Redirection' + response.statusCode+'|';
      }
      else {
        result += 'OK' + response.statusCode + '|';
      }
      return response.statusCode;
    }).end();
    var httpsReq = https.request(requestOptions.https, function(response) {
      if(response.statusCode >= 500) {
        result += 'Internal Server Error. HTTPS '+response.statusCode+'|';
      } 
      else if(response.statusCode >= 400) {
        result += 'No access or Not found HTTPS'+response.statusCode+'|';
      }
      else if(response.statusCode >= 300) {
        result += 'Redirection HTTPS' + response.statusCode+'|';
      }
      else {
        result += 'OK' + response.statusCode + '|';
      }
      return response.statusCode;
    }).end();
  }

  function whoisLogic() {
    var res = '';
    if(!whois) {
      return '';
    }
    if("registered" in whois['status']) {
      res += '';
    }
  };
};

function runLogic(val) {
  var t = LogicClass(val);
  t.whoisLogic();
  t.doRequest();
  return t.result.split('|');
}
