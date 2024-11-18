/* eslint-env mocha */

const assert = require('chai').assert

const Esun = require('../lib/esun')

const KEY = '123456789ABCDEF123456789ABCDEF'

suite('Esun', () => {
  test('#mac()', () => {
    const mac = Esun(KEY).mac(JSON.stringify({ TxnType: 'A', Account: 'testacct' }))
    assert.equal(mac, '6125537529184f83096449d5e04a68732a72ce434e580940dccd73d2ced3d389')
  })
})
