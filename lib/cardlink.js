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
    mac: crypto.createHash('sha256').update(JSON.stringify(payload) + this.config.KEY).digest('hex'),
    ksn: 1
  }
}

module.exports = cardlink;
