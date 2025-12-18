// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Hello {
    string public greeting = "Hello, Blockchain TCG";

    function setGreeting(string calldata _greeting) external {
        greeting = _greeting;
    }
}
