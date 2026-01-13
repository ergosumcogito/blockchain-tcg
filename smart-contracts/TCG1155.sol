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

    constructor() ERC1155("https://example.com/metadata/{id}.json") Ownable(msg.sender) { // has to be changed later with local uri for metadata
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
        require(packSize > 0 && packSize <= 10, "Pack size too big"); // limit of pack size set to 10

        // arrays for batch minting
        uint256[] memory idsToMint = new uint256[](packSize);
        uint256[] memory amounts = new uint256[](packSize);

        for (uint256 i = 0; i < packSize; i++) {
            uint256 cardType = _pickRandomAvailableCard();

            require(cardType != 0, "No cards are available");

            totalMinted[cardType] += 1;

            idsToMint[i] = cardType;
            amounts[i] = 1;
        }

        _mintBatch(msg.sender, idsToMint, amounts, ""); // saves gas cost if done with _mintBatch
    }

    function _pickRandomAvailableCard() internal view returns (uint256) {
        if (cardIds.length == 0) return 0;

        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))); // newer version: prevrandao instead of difficulty
        
        for(uint256 i = 0; i < 10; i++) {
            uint256 index = (rand + i) % cardIds.length;
            uint256 id = cardIds[index];

            if (totalMinted[id] < maxSupply[id]) { // if card got minted 3 times its not available anymore
                return id;
            }
        }

        // if the for-loop above does not find a suitable cardtype, it gets choosen linear here
        for (uint256 i = 0; i < cardIds.length; i++) {
            uint256 id = cardIds[i];
            if (totalMinted[id] < maxSupply[id]) {
                return id;
            }
        }

        return 0;
    }

    // Optional helper to see all card IDs
    function getAllCardIds() external view returns (uint256[] memory) {
        return cardIds;
    }
}
