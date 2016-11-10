var crypto = require('crypto')

/**
 * @param config        銀行核發的設定
 * @param config.SID        特店代碼
 * @param config.KEY        押碼 KEY
 */
function esun (config) {
  if (typeof config === undefined) throw new Error()
  this.config = config
}

/**
* @param payload        esun 交易時的 payload
*/
esun.prototype.hash = function (payload) {
  return {
    data: JSON.stringify(payload),
    mac: esun.mac(JSON.stringify(payload), this.config.KEY),
    ksn: 1
  }
}

/**
* @param text       準備要被 hash 的 text 如果是 json object 要使用 JSON.stringify() 轉成 text
* @param key        押碼 KEY
*/
esun.mac = function (text, key) {
  return crypto.createHash('sha256').update(text + key, 'utf8').digest('hex')
}

module.exports = esun
