// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 1. Main Token Contract
contract WOKEDToken is ERC20Permit, ERC20Burnable, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18;

    constructor() ERC20("Woke Dog Coin", "WOKED") ERC20Permit("Woke Dog Coin") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    // Optional: Add token transfer restrictions or other custom logic
    function transferWithPermit(
        address sender,
        address recipient,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        // Permit for gasless approvals
        permit(sender, msg.sender, amount, deadline, v, r, s);
        transferFrom(sender, recipient, amount);
    }
}