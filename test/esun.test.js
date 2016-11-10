/* eslint-env mocha */

const expect = require('chai').expect
const ESUN = require('../lib/esun')

describe('esun', () => {
  var sample_config = {
    SID: '',
    KEY: '123456789ABCDEF123456789ABCDEF'
  }
  it('#mac()', () => {
    var mac = ESUN.mac(JSON.stringify({
      TxnType: 'A',
      Account: 'testacct'
    }), sample_config.KEY)
    expect(mac).to.equal('6125537529184f83096449d5e04a68732a72ce434e580940dccd73d2ced3d389')
  })
  it('#hash()', () => {
    var esun = new ESUN(sample_config)
    var hashed_payload = esun.hash({
      TxnType: 'A',
      Account: 'testacct'
    })
    expect(hashed_payload.mac).to.equal('6125537529184f83096449d5e04a68732a72ce434e580940dccd73d2ced3d389')
  })
})
