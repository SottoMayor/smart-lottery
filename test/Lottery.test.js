const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const { interface, bytecode } = require('../compile');
const { describe } = require('mocha');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3
    .eth
    .Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({from: accounts[0], gas: '1000000'})
})

describe('Lottery Contract', () => {
    it('deploys a contract', async () => {
        assert.ok(lottery.options.address);
    })

    it('allows an account to enter', async () => {
        await lottery
        .methods
        .enter()
        .send({ from: accounts[1], value: web3.utils.toWei('0.02', 'ether') });

        const players = await lottery.methods.getPlayers().call({ from: accounts[1] });

        assert.equal(players[0], accounts[1])
        assert.equal(players.length, 1);
    })

    it('allows multiple accounts to enter', async () => {

        for(let index = 1; index < 6; index++){
            await lottery
            .methods
            .enter()
            .send({ from: accounts[index], value: web3.utils.toWei('0.02', 'ether') });
        }
        
        const players = await lottery.methods.getPlayers().call({ from: accounts[1] });

        assert.equal(players.length, 5);
        for(let index = 1; index < 6; index++){
            assert.equal(players[index - 1], accounts[index])
        }
    })
})