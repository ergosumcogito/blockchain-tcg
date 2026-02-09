// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TCG1155 is ERC1155, Ownable {

    /* =========================
            STORAGE
    ========================== */

    // Max supply per card ID
    mapping(uint256 => uint256) public maxSupply;
    mapping(uint256 => uint256) public totalMinted;

    // All card IDs (used for boosters & frontend)
    uint256[] public cardIds;

    // Booster price (MVP: can be 0 or very small)
    uint256 public boosterPrice = 1 wei;

    /* =========================
             EVENTS
    ========================== */

    event CardTypeAdded(uint256 indexed tokenId, uint256 maxSupply);
    event BoosterOpened(address indexed user, uint256[] ids);
    event DemoMintExecuted(address indexed to);
    event BoosterPriceUpdated(uint256 newPrice);

    /* =========================
           CONSTRUCTOR
    ========================== */

    constructor()
        ERC1155("https://example.com/metadata/{id}.json")
        Ownable(msg.sender)
    {
        // Initial demo cards
        _addCardType(1, 20);  // Pikachu Standard
        _addCardType(2, 3);   // Pikachu VMAX
        _addCardType(3, 20);  // Charizard Standard
        _addCardType(4, 3);   // Charizard VMAX
        _addCardType(5, 1);   // Umbreon VMAX
        _addCardType(6, 20);  // Slowpoke Standard
        _addCardType(7, 10);  // Greninja EX
        _addCardType(8, 5);   // Alakazam Reverse Holo
        _addCardType(9, 3);   // Zekrom EX
        _addCardType(10, 20); // Rattata Standard
        _addCardType(11, 20); // Emolga Standard
        _addCardType(12, 20); // Ludicolo Standard
        _addCardType(13, 20); // Slugma Standard
        _addCardType(14, 20); // Torchic Standard
        _addCardType(15, 20); // Simsear Standard
        _addCardType(16, 20); // Swadloon Standard
        _addCardType(17, 5);  // Whimsicott EX
        _addCardType(18, 20); // Litwick Standard
        _addCardType(19, 20); // Joltik Standard
        _addCardType(20, 20); // Herdier Standard
    }

    /* =========================
        CARD TYPE MANAGEMENT
    ========================== */

    function _addCardType(uint256 tokenId, uint256 supply) internal {
        require(supply > 0, "Supply must be > 0");

        maxSupply[tokenId] = supply;
        totalMinted[tokenId] = 0;
        cardIds.push(tokenId);

        emit CardTypeAdded(tokenId, supply);
    }

    function addCardType(uint256 tokenId, uint256 supply)
        external
        onlyOwner
    {
        require(maxSupply[tokenId] == 0, "Card already exists");
        _addCardType(tokenId, supply);
    }

    /* =========================
              MINTING
    ========================== */

    // Admin mint (debug / rewards / demo)
    function mint(uint256 tokenId, uint256 amount)
        external
        onlyOwner
    {
        require(
            totalMinted[tokenId] + amount <= maxSupply[tokenId],
            "Max supply reached"
        );

        totalMinted[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");
    }

    /* =========================
           BOOSTER LOGIC
    ========================== */

    function openBooster(uint256 packSize) external payable {
        require(msg.value == boosterPrice, "Incorrect booster price");
        require(packSize > 0 && packSize <= 10, "Invalid pack size");

        uint256 availableCount = _availableCardsCount();
        require(availableCount > 0, "No cards left");

        // Booster gives up to packSize UNIQUE cards
        // If fewer unique cards are available, give all remaining
        uint256 cardsToMint = packSize;
        if (availableCount < packSize) {
            cardsToMint = availableCount;
        }

        // Build a list of all available card IDs
        uint256[] memory available = _getAvailableCardIds();

        // Shuffle available cards (pseudo-random)
        _shuffleArray(available);

        uint256[] memory ids = new uint256[](cardsToMint);
        uint256[] memory amounts = new uint256[](cardsToMint);

        for (uint256 i = 0; i < cardsToMint; i++) {
            uint256 cardId = available[i];

            ids[i] = cardId;
            amounts[i] = 1;
            totalMinted[cardId] += 1;
        }

        _mintBatch(msg.sender, ids, amounts, "");
        emit BoosterOpened(msg.sender, ids);
    }

    // Returns all card IDs that still have available supply
    function _getAvailableCardIds() internal view returns (uint256[] memory) {
        uint256 count = _availableCardsCount();
        uint256[] memory result = new uint256[](count);

        uint256 index = 0;
        for (uint256 i = 0; i < cardIds.length; i++) {
            uint256 id = cardIds[i];
            if (totalMinted[id] < maxSupply[id]) {
                result[index++] = id;
            }
        }

        return result;
    }

    // Simple Fisher–Yates style shuffle (pseudo-random, MVP-safe)
    function _shuffleArray(uint256[] memory arr) internal view {
        uint256 rand = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender
                )
            )
        );

        for (uint256 i = arr.length - 1; i > 0; i--) {
            uint256 j = rand % (i + 1);
            (arr[i], arr[j]) = (arr[j], arr[i]);
            rand = uint256(keccak256(abi.encodePacked(rand, i)));
        }
    }

    function _availableCardsCount() internal view returns (uint256 count) {
        for (uint256 i = 0; i < cardIds.length; i++) {
            uint256 id = cardIds[i];
            if (totalMinted[id] < maxSupply[id]) {
                count++;
            }
        }
    }

    /* =========================
          DEMO / MVP HELPERS
    ========================== */

    function demoMintStarter() external onlyOwner {
        uint256 len = cardIds.length;
        uint256 mintCount = len > 20 ? 20 : len;

        uint256[] memory ids = new uint256[](mintCount);
        uint256[] memory amounts = new uint256[](mintCount);

        for (uint256 i = 0; i < mintCount; i++) {
            uint256 id = cardIds[i];
            if (totalMinted[id] < maxSupply[id]) {
                ids[i] = id;
                amounts[i] = 1;
                totalMinted[id] += 1;
            }
        }

        _mintBatch(msg.sender, ids, amounts, "");
        emit DemoMintExecuted(msg.sender);
    }

    /* =========================
               BURN
    ========================== */

    function burn(
        address from,
        uint256 id,
        uint256 amount
    ) external {
        require(
            from == msg.sender || isApprovedForAll(from, msg.sender),
            "Not authorized"
        );

        _burn(from, id, amount);
    }

    /* =========================
           ECONOMY ADMIN
    ========================== */

    function setBoosterPrice(uint256 newPrice) external onlyOwner {
        boosterPrice = newPrice;
        emit BoosterPriceUpdated(newPrice);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /* =========================
           VIEW FUNCTIONS
    ========================== */

    function getAllCardIds()
        external
        view
        returns (uint256[] memory)
    {
        return cardIds;
    }

    function getCardInfo(uint256 id)
        external
        view
        returns (uint256 max, uint256 minted)
    {
        return (maxSupply[id], totalMinted[id]);
    }
}
