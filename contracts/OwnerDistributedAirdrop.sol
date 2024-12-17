// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract OwnerDistributedAirdrop is Ownable, ReentrancyGuard {
    // The token being distributed
    IERC20 public token;

    // Vesting schedule details for a recipient
    struct Recipient {
        uint256 totalAmount;
        uint256 claimedAmount;
        uint256 startTime;
    }

    // Mapping of recipient addresses to their vesting info
    mapping(address => Recipient) public recipients;

    // Vesting schedule parameters
    uint256 public constant FIRST_MONTH_PERCENTAGE = 10;
    uint256 public constant SUBSEQUENT_MONTHS_PERCENTAGE = 20;
    uint256 public constant FINAL_MONTH_PERCENTAGE = 30;
    uint256 public constant TOTAL_VESTING_MONTHS = 6;

    // Events
    event RecipientAdded(address indexed recipient, uint256 amount);
    event TokensDistributed(address indexed recipient, uint256 amount);

    // Change visibility of allRecipients to internal
    address[] internal allRecipients;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);
    }

    /**
     * Calculate claimable tokens for a recipient
     * @param _recipient Address of the recipient
     * @return Amount of tokens currently claimable
     */
    function calculateClaimableAmount(address _recipient) public view returns (uint256) {
        Recipient memory recipient = recipients[_recipient];
        if (recipient.totalAmount == 0) return 0;

        uint256 elapsedMonths = (block.timestamp - recipient.startTime) / 30 days;
        uint256 claimablePercentage = 0;

        // First month: 10%
        if (elapsedMonths == 0) {
            claimablePercentage = FIRST_MONTH_PERCENTAGE;
        }
        // Months 2-5: 20% each
        else if (elapsedMonths > 0 && elapsedMonths <= 5) {
            claimablePercentage = FIRST_MONTH_PERCENTAGE + (elapsedMonths * SUBSEQUENT_MONTHS_PERCENTAGE);
        }
        // Final month: Remaining 30%
        else if (elapsedMonths >= 6) {
            claimablePercentage = 100;
        }

        uint256 claimableAmount = (recipient.totalAmount * claimablePercentage) / 100;
        return claimableAmount - recipient.claimedAmount;
    }

    /**
     * Distribute tokens to a specific recipient
     * @param _recipient Address to distribute tokens to
     */
    function distributeToRecipient(address _recipient) public nonReentrant {
        uint256 claimableAmount = calculateClaimableAmount(_recipient);
        require(claimableAmount > 0, "No tokens available for distribution");

        Recipient storage recipient = recipients[_recipient];
        recipient.claimedAmount += claimableAmount;

        require(token.transfer(_recipient, claimableAmount), "Token transfer failed");

        emit TokensDistributed(_recipient, claimableAmount);
    }

    /**
     * Bulk distribute tokens to multiple recipients
     * @param _recipients Array of recipient addresses
     */
    function bulkDistribute(address[] calldata _recipients) external nonReentrant {
        for (uint256 i = 0; i < _recipients.length; i++) {
            distributeToRecipient(_recipients[i]);
        }
    }

    /**
     * Add a recipient to the airdrop
     * @param _recipient Address of the token recipient
     * @param _amount Total amount of tokens to be vested
     */
    function addRecipient(address _recipient, uint256 _amount) external onlyOwner {
        require(recipients[_recipient].totalAmount == 0, "Recipient already added");
        
        recipients[_recipient] = Recipient({
            totalAmount: _amount,
            claimedAmount: 0,
            startTime: block.timestamp
        });

        allRecipients.push(_recipient);

        emit RecipientAdded(_recipient, _amount);
    }

    /**
     * Bulk add recipients to the airdrop
     * @param _recipients Array of recipient addresses
     * @param _amounts Array of corresponding token amounts
     */
    function bulkAddRecipients(address[] calldata _recipients, uint256[] calldata _amounts) external onlyOwner {
        require(_recipients.length == _amounts.length, "Mismatched array lengths");
        
        for (uint256 i = 0; i < _recipients.length; i++) {
            require(recipients[_recipients[i]].totalAmount == 0, "Recipient already added");
            
            recipients[_recipients[i]] = Recipient({
                totalAmount: _amounts[i],
                claimedAmount: 0,
                startTime: block.timestamp
            });

            allRecipients.push(_recipients[i]);

            emit RecipientAdded(_recipients[i], _amounts[i]);
        }
    }

    /**
     * Get the list of all participants
     * @return Array of recipient addresses
     */
    function getAllRecipients() external view returns (address[] memory) {
        return allRecipients;
    }

    /**
     * Automatically distribute tokens to all recipients
     */
    function distributeToAllRecipients() external nonReentrant {
        for (uint256 i = 0; i < allRecipients.length; i++) {
            distributeToRecipient(allRecipients[i]);
        }
    }

    /**
     * Withdraw all tokens from the contract
     */
    function withdrawAllTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        
        require(token.transfer(owner(), balance), "Token transfer failed");
    }
}