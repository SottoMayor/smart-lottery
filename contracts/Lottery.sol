pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() {
        manager = msg.sender;
    }

    function enter() public payable {
        // Prevent the manager to enter.
        require(manager != msg.sender); // else, throws an error.
        // Guarantee a minimum amount of money to enter in the lottery
        require(msg.value > .01 ether); // else, throws an error.

        // OBS: if all the require statements were met, so the function flow continues. 

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
}