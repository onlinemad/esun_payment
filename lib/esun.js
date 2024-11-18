const crypto = require('crypto')

const _esun = function (hash_key) {
  this.hash_key = hash_key
}

/**
 * 產生 mac
 * 
 * @param {string} text 準備要被 hash 的 text 如果是 json object 要使用 JSON.stringify() 轉成 text
 */
_esun.prototype.mac = function (text) {
  return crypto.createHash('sha256').update(text + this.hash_key, 'utf8').digest('hex')
}

/**
 * Esun 建構子
 * 
 * @param {string} hash_key
 */
const esun = function (hash_key) {
  return new _esun(hash_key)
}

module.exports = esun
