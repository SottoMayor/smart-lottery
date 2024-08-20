# Smart Lottery

## General Informations
Built with Javascript and Solidity.

To run the smart contract was used Ganache to run the Local Network and Infura to run the TestNet Sepolia Network.

The compiler, functinal tests and deploy codes was written using Javascript and NodeJs as runtime.

The UI was written using also Javascript with React Library.

## Rules
Smart lottery is a lottery based on smart contracts. It follows simple rules:
- Every contract has a manager, he creates the contract and can view all the players that participate in
- Everyone, except the manager, can enter sending some amount of Ether. There is only a lower bound of 0.01 Ether
- The contract accept the entry of new players until the manager decides to close the lottery
- In every loterry closure a winner is picked, in this project the choice occurs in pseudorandom way, and the lottery restarts.
- The winner receives all the amount of Ether accumulated throughout the lottery

