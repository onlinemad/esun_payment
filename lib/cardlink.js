var crypto = require('crypto');

/**
 * @param config        銀行核發的設定
 * @param config.SID        特店代碼
 * @param config.KEY        押碼 KEY
 */
function cardlink(config) {
  if (typeof config === undefined) throw new Error();
  this.config = config;
}

/**
* @param payload        cardlink 交易時的 payload
*/
cardlink.prototype.hash = function(payload) {
  return {
    data: JSON.stringify(payload),
    mac: cardlink.mac(payload, this.config.KEY),
    ksn: 1
  }
}

cardlink.mac = function(data, key) {
  return crypto.createHash('sha256').update(JSON.stringify(data) + key).digest('hex')
}

module.exports = cardlink;
