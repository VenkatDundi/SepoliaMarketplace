// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Marketplace {
    using SafeMath for uint256;

    address payable public owner;
    uint256 public nextItemId;

    // Structure of Item Object in contract
    struct Item {                    
        uint256 id;
        string title;
        string description;
        uint256 price;
        address payable seller;
        bool isSold;
    }

    mapping(uint256 => Item) public items;

    //Events used in the contract
    event ItemListed(uint256 indexed id, string title, uint256 price, address indexed seller);
    event ItemPurchased(uint256 indexed id, address indexed buyer);
    // event ItemUpdated(uint256 indexed id, string title, string description, uint256 price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    // constructor for the Owner
    constructor() {
        owner = payable(msg.sender);
        nextItemId = 1;
    }

    // function to list items in marketplace with required conditions
    function listItem(string memory _title, string memory _description, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        items[nextItemId] = Item(nextItemId, _title, _description, _price, payable(msg.sender), false);
        emit ItemListed(nextItemId, _title, _price, msg.sender);
        nextItemId++;
    }

    // function purchase an item using item id and validating with corresponding price
    function purchaseItem(uint256 _itemId) external payable {
        Item storage item = items[_itemId];
        require(item.id != 0, "Item not found");
        require(!item.isSold, "Item already sold");
        require(msg.value >= item.price, "Insufficient funds");

        // Transfer Ether to seller
        item.seller.transfer(item.price);

        // Mark item as sold
        item.isSold = true;

        // Emit event
        emit ItemPurchased(_itemId, msg.sender);
    }

    // function to view all items
    function viewAllItems() external view returns (Item[] memory) {
        Item[] memory allItems = new Item[](nextItemId - 1);
        uint256 itemCount = 0;

        for (uint256 i = 1; i < nextItemId; i++) {
            Item storage item = items[i];
            if (item.id != 0) {
                allItems[itemCount] = item;
                itemCount++;
            }
        }
        // Resize the array to remove any unused slots
        assembly {
            mstore(allItems, itemCount)
        }

        return allItems;
    }
}
