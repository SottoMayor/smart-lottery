pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() {
        manager = msg.sender;
    }

    function enter() public payable {
        // OBS: Prevent the manager to enter.

        players.push(msg.sender);
    }
}