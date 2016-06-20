var expect = require('chai').expect;
var cardlink = require('../lib/cardlink');

describe('cardlink', function() {
  var sample_config = {
    SID: '',
    KEY: '123456789ABCDEF123456789ABCDEF'
  }
  describe('#mac()', function() {
    var mac = cardlink.mac(JSON.stringify({TxnType:'A',Account:'testacct'}), sample_config.KEY);
    expect(mac).to.equal('6125537529184f83096449d5e04a68732a72ce434e580940dccd73d2ced3d389');
  });
  describe('#hash()', function() {
    var esun = new cardlink(sample_config);
    var hashed_payload = esun.hash({TxnType:'A',Account:'testacct'});
    expect(hashed_payload.mac).to.equal('6125537529184f83096449d5e04a68732a72ce434e580940dccd73d2ced3d389');
  });
})
