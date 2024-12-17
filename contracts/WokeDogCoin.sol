// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Woke Dog Coin (WOKED)
 * @dev ERC20 token with burnable functionality, gasless approvals (EIP-2612),
 * and controlled initial supply for transparency. Future ecosystem reserve will be
 * managed by a DAO.
 * 
 * Because who doesn't want another token in the crypto space, right?
 */
contract WokeDogCoin is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens with 18 decimals

    constructor() 
        ERC20("Woke Dog Coin", "WOKED") 
        ERC20Permit("Woke Dog Coin") 
        Ownable(msg.sender) // Because we all know how much we love centralized ownership... for now.
    {
        // Initial minting for transparency: Only airdrop and liquidity supply
        _mint(msg.sender, 50_000_000 * 10**18); // 5% for Airdrop, because everyone loves free money
        _mint(msg.sender, 1_000_000 * 10**18);  // 0.1% for initial liquidity on Uniswap, because why not?
    }

    /**
     * @notice Mint function to be used for controlled token distribution.
     * Can only be called by the owner (eventually, ownership will be transferred to a DAO).
     * @param to Address to receive the minted tokens.
     * @param amount Amount of tokens to mint.
     * 
     * Just a friendly reminder: Minting tokens is totally not a recipe for inflation. 
     * What could possibly go wrong?
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Cannot exceed max supply"); // Because we definitely want to avoid that.
        _mint(to, amount);
    }

    /**
     * @notice Transfer ownership to a DAO contract when governance is ready.
     * @param newOwner The address of the DAO contract.
     * 
     * Because handing over control to a DAO is always a brilliant idea, right?
     */
    function transferToDAO(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid DAO address"); // As if anyone would want to send tokens to the void.
        transferOwnership(newOwner);
    }
}