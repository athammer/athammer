var request = require('request');
var http = require('http');
var OAuth = require('oauth');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

      //  'X-API-KEY': process.env.KEY_COINIGY
      //  'X-API-SECRET': process.env.SECRET_COINIGY
//

module.exports = {



  stockUpdate: function(req, res, totalBalance, cryptoData, orderData) {

  },




  tradingUpdate: function(req, res, possibleUser) {
    var BTCPrice;
    var totalBalance = 0;
    var orderData = []
    for (var i = 0; i < 5; i++) {
         orderData[i] = [];
    }
    var cryptoData = []
    for (var i = 0; i < 3; i++) {
         cryptoData[i] = [];
    }


    http.get({
      host: 'api.coindesk.com',
      path: '/v1/bpi/currentprice.json'
    }, function(response) {
      var body = '';
      response.on('data', function(d) { body += d; });
      response.on('end', function() {
      var parsed = JSON.parse(body);
          BTCPrice = parsed.bpi.USD.rate;
          BTCPrice = BTCPrice.replace(/,/g, "");
          BTCPrice = parseFloat(BTCPrice);
      });
      request({
        method: 'POST',
        url: 'https://api.coinigy.com/api/v1/balances',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.KEY_COINIGY,
          'X-API-SECRET': process.env.SECRET_COINIGY
        }}, function (error, response, body) {
          if(error){
            return;
          }
          var obj = JSON.parse(body);
          //console.log(obj.data)

          for(var i = 0; i < obj.data.length; i++) {
            cryptoData[i][0] = obj.data[i].balance_curr_code;
            cryptoData[i][1] = obj.data[i].balance_amount_total;
            cryptoData[i][2] = obj.data[i].btc_balance * parseInt(BTCPrice);
            totalBalance = (obj.data[i].btc_balance * parseInt(BTCPrice)) + totalBalance;
          }
          request({
            method: 'POST',
            url: 'https://api.coinigy.com/api/v1/orders',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': process.env.KEY_COINIGY,
              'X-API-SECRET': process.env.SECRET_COINIGY
            }}, function (error, response, body) {
              if(error){
                return;
              }
              var obj = JSON.parse(body);
              for(var i = 0; i < obj.data.order_history.length; i++) {
                orderData[i][0] = obj.data.order_history[i].mkt_name;
                orderData[i][1] = obj.data.order_history[i].order_type
                orderData[i][2] = obj.data.order_history[i].order_price_type
                orderData[i][3] = obj.data.order_history[i].quantity
                orderData[i][4] = obj.data.order_history[i].order_time
              }
              totalBalance = parseInt(totalBalance);



              /*=============STOCK PART ================*/
              var oauth = new OAuth.OAuth(
                'https://developers.tradeking.com/oauth/request_token',
                'https://developers.tradeking.com/oauth/access_token',
                process.env.CONSUMER_KEY,
                process.env.CONSUMER_SECRET,
                '1.0A',
                null,
                'HMAC-SHA1'
              );

              oauth.get(
              'https://api.tradeking.com/v1/accounts.xml',
              process.env.OAUTH_TOKEN, //test user token
              process.env.OAUTH_SECRET_TOKEN, //test user secret
              function (e, data, res){
                if(e){
                  throw e;
                }
                parser.parseString(data, function (err, result) {
                  if(err){
                    throw err;
                  }
                  console.dir(result);
                  console.dir(result[1]);
                  console.log('Done');
                });

              });
              res.render('./pages/trading.ejs', { totalBalanceEJS: totalBalance, orderDataEJS: orderData, cryptoDataEJS: cryptoData  });








            });
          });
    }
  )},









}
