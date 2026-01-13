// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TCG1155 is ERC1155, Ownable {
    // Max supply per card ID
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public totalMinted;

    // Dynamic list of all card IDs for boosters
    uint256[] public cardIds;

    constructor() ERC1155("https://example.com/metadata/{id}.json") Ownable(msg.sender) {
        // Add initial cards
        _addCardType(1, 20); // Pikachu Standard
        _addCardType(2, 3);  // Pikachu VMAX
    }

    // Internal function to add card type (used in constructor)
    function _addCardType(uint256 tokenId, uint256 supply) internal {
        maxSupply[tokenId] = supply;
        totalMinted[tokenId] = 0;
        cardIds.push(tokenId);
    }

    // Owner can add new card types anytime
    function addCardType(uint256 tokenId, uint256 supply) external onlyOwner {
        require(maxSupply[tokenId] == 0, "Card already exists");
        _addCardType(tokenId, supply);
    }

    // Admin mint function (optional)
    function mint(uint256 tokenId, uint256 amount) public onlyOwner {
        require(totalMinted[tokenId] + amount <= maxSupply[tokenId], "Max supply reached");
        totalMinted[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");
    }

    // Open booster pack (variable size)
    function openBooster(uint256 packSize) public {
        require(packSize > 0, "Pack size must be > 0");

        for (uint256 i = 0; i < packSize; i++) {
            uint256 cardType = _randomCard();
            require(totalMinted[cardType] < maxSupply[cardType], "No more cards of this type");
            totalMinted[cardType] += 1;
            _mint(msg.sender, cardType, 1, "");
        }
    }

    // Fake randomness for MVP
    function _randomCard() internal view returns (uint256) {
        require(cardIds.length > 0, "No cards available");
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)));
        return cardIds[rand % cardIds.length];
    }

    // Optional helper to see all card IDs
    function getAllCardIds() external view returns (uint256[] memory) {
        return cardIds;
    }
}
