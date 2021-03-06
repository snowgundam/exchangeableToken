var TestToken = artifacts.require("./ERC20/TestToken.sol");

contract('TestTestToken', function(accounts) {

    let tst = null;
    let startBlock = null;
    let initToken = 100000000;
    it("Test bid Function", function () {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.balanceOf.call(accounts[1]);
        }).then(function (res) {
            assert.equal(res.toNumber(), 0);
        }).then(function() {
            return tst.bid.call(1, 10, { from: accounts[1], value: web3.toWei(10) });
        }).then(function (res) {
            assert.equal(res.toNumber(), 0);
            tst.bid.sendTransaction(1, 10, { from: accounts[1], value: web3.toWei(10) });
        })
    })
    it("should transfer right token", function() {
        var token;
        return TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.transfer(accounts[1], 50);
        }).then(function(res){
            console.log(res.logs[0].event)
            return tst.balanceOf.call(accounts[0]);
        }).then(function(res){
            assert.equal(res.toNumber(), initToken-50, 'accounts[0] balance is wrong');
            return tst.balanceOf.call(accounts[1]);
        }).then(function(res){
            assert.equal(res.toNumber(), 50, 'accounts[1] balance is wrong');
        })
    });
    it("Test ask Function", function () {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.balanceOf.call(accounts[0]);
        }).then(function (res) {
            assert.equal(res.toNumber(), initToken - 50);
        }).then(function () {
            return tst.ask.sendTransaction(1, 100, {'from': accounts[0]});
        }).then(function () {
            return tst.ask.call(1, 100, {'from': accounts[0]});
        }).then(function (res) {
            assert.equal(res.toNumber(), 1);
        }).then(function() {
            return tst.balanceOf.call(accounts[0]);
        }).then(function(res) {
            assert.equal(res.toNumber(), initToken - 50 - 100)
        }).then(function() {
            return tst.checkAskTicker.call(0)
        }).then(function(res) {
            assert.equal(res[0], accounts[0]);
        })
    })
    it("Test cancel ask", function() {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.cancelAsk.sendTransaction(0, accounts[0]);
        }).then(function (res) {
            console.log(res);
        }).then(function() {
            return tst.balanceOf(accounts[0]);
        }).then(function(res) {
            assert.equal(res.toNumber(), initToken - 50);
        })
    })
    it("Test getter", function() {
        TestToken.deployed().then(function(ins) {
            return ins.checkAskTicker(0);
        }).then(function(res) {
            assert.equal(res[0], accounts[0])
            assert.equal(res[1].toNumber(), 1)
            assert.equal(res[2].toNumber(), 100)
        })
    })

    it("Test fill bid", function() {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.fillBid.call(0, 1, 10, {from: accounts[0]})
        }).then(function(res) {
            assert.equal(res.toNumber(), 1);
        })
    })
    it("Test fill ask", function() {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.fillAsk.call(0, 1, 100, {from: accounts[0], value: 100})
        }).then(function(res) {
            assert.equal(res.toNumber(), 1);
            tst.fillAsk.sendTransaction(0, 1, 100, {from: accounts[0], value: 100})
        })
    })
    it("Test deleted ask", function() {
        TestToken.deployed().then(function(ins) {
            tst = ins;
            return tst.checkAskTicker.call(0)
        }).then(function(res) {
            console.log(res)
            assert.equal(res[1].toNumber(), 0)
            assert.equal(res[2].toNumber(), 0)
        })
    })
})

