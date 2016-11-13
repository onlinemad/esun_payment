var crypto = require('crypto')
var eol = require('os').EOL

function leftPad (str, length, character) {
  return pad(true, str, length, character)
}

function rightPad (str, length, character) {
  return pad(false, str, length, character)
}

function pad (left, str, length, character) {
  var str = str == null ? '' : String(str)
  var length = ~~length
  var pad = ''
  var padLength = length - str.length
  while (padLength--) {
    pad += character
  }
  if (left) {
    return pad + str
  } else {
    return str + pad
  }
}

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
* @param sid          系統廠商代號。
* @param stores       待請款的特店
*/
esun.statement = function (sid, stores) {
  var header = `FS${rightPad(sid, 15, ' ')}${leftPad('', 4, ' ')}${leftPad(stores.length, 4, '0')}${eol}`
  var total_record = 0
  var body = ''
  stores.map(stroe => {
    var sub_header = `FH${rightPad(stroe.sid, 15, ' ')}${leftPad('', 4, ' ')}N${leftPad('', 7, ' ')}${eol}`
    var sub_data = ''
    stroe.orders.map(order => {
      sub_data += `FD${rightPad(order.id, 20, ' ')}${order.type}${leftPad(order.amount.toFixed(2).replace('.',''), 12, '0')}  ${rightPad('', 25, ' ')}${rightPad('', 40, ' ')}${rightPad('', 20, ' ')}${leftPad('', 20, ' ')}${eol}`
    })
    var sub_trailer = `FT${leftPad(stroe.orders.length, 6, '0')}${eol}`
    total_record += stroe.orders.length
    body += `${sub_header}${sub_data}${sub_trailer}`
  })
  var trailer = `FE${leftPad(total_record, 7, '0')}`
  return `${header}${body}${trailer}`
}

/**
* @param text       準備要被 hash 的 text 如果是 json object 要使用 JSON.stringify() 轉成 text
* @param key        押碼 KEY
*/
esun.mac = function (text, key) {
  return crypto.createHash('sha256').update(text + key, 'utf8').digest('hex')
}

module.exports = esun
