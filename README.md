# Sepolia Marketplace

This project is focused on demonstrating a web application to facilitate buying and selling of products between users without any intermediary. Making use of block chain technology with Ethereum test currency in sepolia test netowrk, this application ensures user-friendly interaction for users with transparecy and security.


## Functions

1. List an Item: User can list an item on the marketplace application using details like name, description, and price. Any user who can have an access to wallet will be able to list any number of items on the application.
2. Purchase an Item: Any user who have a valid wallet can purchase any item listed on the marketplace using the required currency specified while listing the product. Item Id is used to perform this action.
3. View Item Details: User can access this module to view details of items available in the marketplace. Moreover, additional functionality to view sold and unsold items has been introduced in the application.

## Components

1. Metamask: Install the metamask cryptocurrency wallet (https://metamask.io/) which helps in interaction with ethereum block chain. Create a wallet and use the respective address to make the transactions using test coins.
2. Solidity: A programming language used to develop smart contracts which help in functioning of the cryptocurrency marketplace.
3. Smart Contract: Components in crypto domain to facilitate the execution of actions among users.
4. Web3.js: Javascript library that helps in interacting with block chain and perform required actions.
5. HTML, CSS, JS: Front-end tech stack to develop the interfaces of the web application.


## Use Case Diagram
This diagram shows the actions which can be performed by a user whoc access the application.    

![image](https://github.com/VenkatDundi/SepoliaMarketplace/assets/59659900/a5bb8925-0651-4486-8bdb-18ec11fea1d6)

## Flow Diagram

Please find below, the flow of actions which can be performed by a user in the application.    

![image](https://github.com/VenkatDundi/SepoliaMarketplace/assets/59659900/8052ffcc-adc2-458e-bfe1-2ead9a77f35a)

## Steps Performed

1. Create a smart contract using solidity with a structure for Iteam and corresponding functions to List, Purchase, View All items.
2. Remix IDE is used to deploy the contract and generate the address for the contract.
3. Installed Node js and used Web3 for interactions with components of block chain
4. Created web pages using html & css to take input from the users
5. Created JS files to provide connectivity among web pages and call the functions from contract
6. Results have been shown on respective web pages, View Item Details pages.

## Note

Several conditions have been included for the transperacy and effective working of the application. Some of them are:

* A user who listed the item cannot purchase the same item. A pop up has been specified to show a message that User need not buy the item listed by themselves.
* A user will only be able to purchase the available item, which wasn't sold yet. This was considered as each item has been made available only once for a purchase.

## Snapshots

Web Page to list an Item on Marketplace

![Screenshot (84)](https://github.com/VenkatDundi/SepoliaMarketplace/assets/59659900/c8ea9a67-83ae-4dc8-8616-a68e7bb6ff45)


Txn Details upon purchasing an Item

![Screenshot (82)](https://github.com/VenkatDundi/SepoliaMarketplace/assets/59659900/8d3f482a-b4e8-484b-a7c7-0f37f6cb0e79)

View All Item Detaiuls on the Market Place

![Screenshot (83)](https://github.com/VenkatDundi/SepoliaMarketplace/assets/59659900/8db6d67b-957e-4787-b672-954a3f424efa)
