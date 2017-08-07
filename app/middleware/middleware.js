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
              var recentTrades = [];

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
              function (e, data, responce){
                if(e){
                  console.log(e);
                  throw e;
                }
                parser.parseString(data, function (err, result) {
                  if(err){
                    throw err;
                  }

                  accountNumber = result.response.accountbalance[0].account
                  accountTotalValue = result.response.accountbalance[0].accountvalue
                  if(null == accountTotalValue) {
                    accountTotalValue = 0;
                  }

                  /*=====get cash and secreuity value ========*/
                  oauth.get(
                  'https://api.tradeking.com/v1/accounts/' + accountNumber + '/balances.xml',
                  process.env.OAUTH_TOKEN, //test user token
                  process.env.OAUTH_SECRET_TOKEN, //test user secret
                  function (e, data, responce){
                    if(e){
                      console.log(e);
                      throw e;
                    }
                    parser.parseString(data, function (err, result) {
                      if(err){
                        throw err;
                      }
                      console.log(result.response.accountbalance[0]);
                      console.log(result.response.accountbalance[0].money.total);
                      console.log(result.response.accountbalance[0].money);
                      accountCashValue = result.response.accountbalance[0].money.total
                      accountSecuritiesValue = result.response.accountbalance[0].securities.total
                      if(null == accountCashValue) {
                        accountCashValue = 0;
                      }
                      if(null == accountSecuritiesValue) {
                        accountSecuritiesValue = 0;
                      }

                      /*=====get specifics of holdings========*/
                      var stockSym = "memes"
                      var costBasis = 0.0 //per share
                      var qty = 0;
                      var marketvalue = 0;
                      var gainloss = .01 //1 PENNY GAINS KID
                      var marketvaluechange = .01 //1% GAINS KID; if "gainz" are neg must be calced another way (assuming ally's exampl,es were not whack)
                      //instrument.sym, costbasis, qty, marketvalue, gainloss, marketvaluechange,
                      for (var i = 0; i < 6; i++) {
                           stockHoldings[i] = [];
                      }
                      oauth.get(
                      'https://api.tradeking.com/v1/accounts/' + accountNumber + '/holdings.xml',
                      process.env.OAUTH_TOKEN, //test user token
                      process.env.OAUTH_SECRET_TOKEN, //test user secret
                      function (e, data, responce){
                        if(e){
                          console.log(e);
                          throw e;
                        }
                        parser.parseString(data, function (err, result) {
                          if(err){
                            throw err;
                          }
                          for(var xd = 0; xd < result.response.accountholdings.length; xd++) {
                            console.log(result.response.accountholdings[xd]);
                            if(result.response.accountholdings[xd].totalsecurities == '0') {
                              console.log('no holdings')
                              break;
                            }
                            stockSym = result.response.accountholdings[xd].instrument[4]
                            costBasis = result.response.accountholdings[xd].costbasis
                            qty = result.response.accountholdings[xd].qty
                            marketvalue = result.response.accountholdings[xd].marketvalue
                            gainloss = result.response.accountholdings[xd].gainloss
                            marketvaluechange = result.response.accountholdings[xd].marketvaluechange

                            stockHoldings[xd][0] = stockSym
                            stockHoldings[xd][1] = costBasis
                            stockHoldings[xd][2] = qty
                            stockHoldings[xd][3] = marketvalue
                            stockHoldings[xd][4] = gainloss
                            stockHoldings[xd][5] = marketvaluechange
                          }




                          /*=====get recent trades========*/
                          var tradeActivity = "";
                          var amount = 0;
                          var date = "";
                          var desc = "";
                          var symbol = "";
                          var price = 0;
                          var quantity = 0;
                          for (var i = 0; i < 6; i++) {
                               recentTrades[i] = [];
                          }
                          oauth.get(
                          'https://api.tradeking.com/v1/accounts/' + accountNumber + '/holdings.xml?range=all&transactions=all',
                          process.env.OAUTH_TOKEN, //test user token
                          process.env.OAUTH_SECRET_TOKEN, //test user secret
                          function (e, data, responce){
                            if(e){
                              console.log(e);
                              throw e;
                            }
                            parser.parseString(data, function (err, result) {
                              if(err){
                                throw err;
                              }
                              console.log("transactions: " + result.response)
                              if(result.response.transactions == null) {
                                length2 = 0;
                                console.log("no recent trades")
                              }
                              for(var xda = 0; xda < length2; xda++) {
                                //activity, date, desc, symbol, transaction[4] //price, transaction[5]

                                price = result.response.transactions[xda].transaction[4]
                                quantity = result.response.transactions[xda].transaction[5]
                                activity = result.response.transactions[xda].activity
                                date = result.response.transactions[xda].date
                                desc = result.response.transactions[xda].desc
                                symbol = result.response.transactions[xda].symbol

                                recentTrades[xda][0] = price
                                recentTrades[xda][1] = quantity
                                recentTrades[xda][2] = activity
                                recentTrades[xda][3] = date
                                recentTrades[xda][4] = desc
                                recentTrades[xda][5] = symbol
                              }




                              res.render('./pages/trading.ejs', { totalBalanceEJS: totalBalance, orderDataEJS: orderData, cryptoDataEJS: cryptoData,
                                accountTotalValueEJS: accountTotalValue, accountCashValueEJS: accountCashValue, accountSecuritiesValueEJS: accountSecuritiesValue,
                                accountNumberEJS: accountNumber, stockHoldingsEJS: stockHoldings, recentTradesEJS: recentTrades});

                            });

                          });


                        });

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
