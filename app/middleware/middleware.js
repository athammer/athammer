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
              var accountTotalValue = 0;
              var accountCashValue = 0;
              var accountSecuritiesValue = 0;
              var accountNumber = 0;
              var stockHoldings = [];

              var oauth = new OAuth.OAuth(
                'https://developers.tradeking.com/oauth/request_token',
                'https://developers.tradeking.com/oauth/access_token',
                process.env.CONSUMER_KEY,
                process.env.CONSUMER_SECRET,
                '1.0A',
                null,
                'HMAC-SHA1'
              );


              /*=====get basic account info========*/
              oauth.get(
              'https://api.tradeking.com/v1/accounts/balances.xml',
              process.env.OAUTH_TOKEN, //test user token
              process.env.OAUTH_SECRET_TOKEN, //test user secret
              function (e, data, res){
                if(e){
                  console.log(e);
                  throw e;
                }
                parser.parseString(data, function (err, result) {
                  if(err){
                    throw err;
                  }

                  accountNumber = result.response.accountbalance[0].account
                  console.log("Account number: " +  accountNumber);
                  accountTotalValue = result.response.accountbalance[0].accountvalue
                });




                /*=====get cash and secreuity value ========*/
                oauth.get(
                'https://api.tradeking.com/v1/accounts/' + accountNumber + '/balances.xml',
                process.env.OAUTH_TOKEN, //test user token
                process.env.OAUTH_SECRET_TOKEN, //test user secret
                function (e, data, res){
                  if(e){
                    console.log(e);
                    throw e;
                  }
                  parser.parseString(data, function (err, result) {
                    if(err){
                      throw err;
                    }
                    accountNumber = result.response.accountbalance[0].money
                    accountSecurities = result.response.accountbalance[0].securities

                    /*=====get specifics of holdings========*/
                    var stockSym = "memes"
                    var costBasis = 0.0 //per share
                    var qty = 0;
                    var marketvalue = 0;
                    var gainloss = .01 //1 PENNY GAINS KID
                    var marketvaluechange = .01 //1% GAINS KID; if "gainz" are neg must be calced another way (assuming ally's exampl,es were not whack)
                    //instrument.sym, costbasis, qty, marketvalue, gainloss, marketvaluechange,
                    var stockHoldings = []
                    for (var i = 0; i < 6; i++) {
                         stockHoldings[i] = [];
                    }
                    console.log('https://api.tradeking.com/v1/accounts/' + accountNumber + '/holdings.xml')
                    oauth.get(
                    'https://api.tradeking.com/v1/accounts/' + accountNumber + '/holdings.xml',
                    process.env.OAUTH_TOKEN, //test user token
                    process.env.OAUTH_SECRET_TOKEN, //test user secret
                    function (e, data, res){
                      if(e){
                        console.log(e);
                        throw e;
                      }
                      parser.parseString(data, function (err, result) {
                        if(err){
                          throw err;
                        }
                        for(var xd = 0; xd < result.response.accountholdings.length; xd++) {
                          stockSym = result.response.accountholdings[i].instrument.sym
                          costBasis = result.response.accountholdings[i].costbasis
                          qty = result.response.accountholdings[i].qty
                          marketvalue = result.response.accountholdings[i].marketvalue
                          gainloss = result.response.accountholdings[i].gainloss
                          marketvaluechange = result.response.accountholdings[i].marketvaluechange

                          stockHoldings[i][0] = stockSym
                          stockHoldings[i][1] = costBasis
                          stockHoldings[i][2] = qty
                          stockHoldings[i][3] = marketvalue
                          stockHoldings[i][4] = gainloss
                          stockHoldings[i][5] = marketvaluechange
                        }
                        accountCashValue = result.response.accountholdings[0].account
                        accountSecuritiesValue = result.response.accountholdings[0].accountvalue




                        res.render('./pages/trading.ejs', { totalBalanceEJS: totalBalance, orderDataEJS: orderData, cryptoDataEJS: cryptoData,
                          accountTotalValueEJS: accountTotalValue, accountCashValueEJS: accountCashValue, accountSecuritiesValueEJS: accountSecuritiesValue,
                          accountNumberEJS: accountNumber, stockHoldingsEJS: stockHoldings});

                      });

                    });








                  });




                });

              });















            });
          });
    }
  )},
}
