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

    // Now this function has the modify restricted
    function pickWinner() public restricted {
        // Arithmetic modular on top of players array length
        uint index = random() % players.length;

        // transfer the total money amount for the winner
        players[index].transfer(this.balance); // obs: this.balance guard all the contract money

        // Reset the players to another lottery round.
        players = new address[](0);
    }

    // Modifier function: Don't repeat yourself!
    modifier restricted() {
         // Only the manager can invoke this function
        require(manager == msg.sender); // else, throws an error.

        // All the code of the function with the restricted is applyed, will be replaced in the '_;' target.
        _;
    }
}