# Smart Lottery

## General Information
Built with Javascript and Solidity.

To run the smart contract, Ganache was used to run the Local Network and Infura to run the TestNet Sepolia Network.

The compiler, functional tests and deployment code were written using Javascript and NodeJs as runtime.

The UI was also written using Javascript with React Library.

## Rules
Smart lottery is a lottery based on smart contracts. It follows simple rules:
- Every contract has a manager, he creates the contract and can view all the players that participate in
- Everyone, except the manager, can enter sending some amount of Ether. There is only a lower bound of 0.01 Ether
- The contract accepts the entry of new players until the manager decides to close the lottery
- In every lottery closure a winner is picked, in this project the choice occurs in a pseudorandom way, and the lottery restarts.
- The winner receives all the amount of Ether accumulated throughout the lottery

# Side Notes

## Concepts
Smart contracts written using solidity should be compiled, the more often tool to do this is Solc. This process generates two distinct pieces: the Bytecode and the ABI.

- Bytecode: The code that is indeed deployed on the blockchain.
- ABI (Application Binary Interface): Allows the interaction between the smart contract and the Web3 library.

Web3 is an essential tool to connect the applications world Web2 and Web3, it allows the creation of apps that interact with the blockchain. It provides the necessary 
apparatus to interact with the smart contract through the ABI generated.

Truffle is a tool that makes the deployment of contracts easier in a development environment. Without it, it would be necessary to configure a blockchain node manually and that would be more painful.

Ganache raises a local test network where a smart contract instance can be executed. It simulates a blockchain environment to smart contracts testing (homologation), allowing tests and local development.

Infura is a platform that allows the access of Ethereum node without the need of running a node locally, so you don't need to think about the underlying blockchain infrastructure. 
It acts as a gateway to interact with the blockchain, allowing developer to deploy contracts in the TestNet or MainNet.

## Testing (homologation) Process Local Flow: 

- Instantiate the Web3 and inject the Ganache as a provider
- The Web3 sends a request which is processed by the local test network (managed by Ganache)
- The response is sent back to Web3, with the provider behaving as intermediary between the Web3 and the network.
  
## Functional Tests
To test smart contracts, a framework of automated test is commonly used, as Mocha. During the test, the contract deployment occurs after each 'it' block
where the asserts are done. This guarantee that each test manipulates a single and separated contract instance, preventing interference between the tests.

## Deploy on Public Networks  
Once you want to interact with the smart contract in some public network, like a testNet or the mainNet itself, you need to use the Infura as a provider instead of Ganache. For this:
- It is necessary to have at least an account with some amount of Ether, the easiest way to get Ether for testing is accessing the [Ethereum Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) managed by Google.
- A set of accounts is retrieved using the mnemonic, once interactions with smart contract requires payment in Ether.
- Infura provides a node to deploy the contract
- Truffle connects the provider to the network and unlocks a bunch of accounts using the mnemonic
- Finally, the provider configured by Truffle is injected into a Web3 instance.



