
var My_Address = localStorage.getItem('SentAddress3')

const contABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "ItemListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ItemPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "listItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_itemId",
				"type": "uint256"
			}
		],
		"name": "purchaseItem",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "items",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextItemId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isSold",
						"type": "bool"
					}
				],
				"internalType": "struct Marketplace.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];




//console.log("Address is (without click) : ", My_Address);
async function handleSubmit(event) {
	event.preventDefault(); // Prevent default form submission behavior
    //const  My_Address = localStorage.getItem("MyAddress");
    console.log("Address is : ", My_Address);
    // Get the values from the input text boxes
    // const ItemId = document.getElementById('itemid').value;
	var regexp = /[^\w\s]/g;
	const til = document.getElementById('title').value;
	const Title = til.replace(regexp, '');
    // Replace special characters with an empty string
    const Desc = document.getElementById('description').value;
	const Description = Desc.replace(regexp, '');
    const Price = document.getElementById('price').value;

    // Redirect to another file with the values appended as query parameters

	const contAddress = '0x97B5ee79024046D5352A81b54685ce6C8aceB026'

    if(window.ethereum) {
        const w3ins = new Web3(window.ethereum);
        await window.ethereum.enable();
    
        const contIns = new w3ins.eth.Contract(contABI, contAddress);

        const wiePrice = w3ins.utils.toWei(Price.toString(), 'ether');
        const res = await contIns.methods.listItem(Title, Description, wiePrice).send({from: My_Address});
        console.log('curr res: ', res)
		localStorage.setItem("MyAddress", My_Address);
		localStorage.setItem("thash", res.transactionHash);
		localStorage.setItem("bhash", res.blockHash);
		localStorage.setItem("bnum", res.blockNumber);
		localStorage.setItem("gas", res.gasUsed);
		localStorage.setItem("tevent", res.events.ItemListed.event);
		localStorage.setItem("iid", res.events.ItemListed.returnValues.id);
		localStorage.setItem("iname", res.events.ItemListed.returnValues.title);
		localStorage.setItem("iprice", res.events.ItemListed.returnValues.price);
		const w = "https://sepolia.etherscan.io/tx/".concat(res.transactionHash)
		localStorage.setItem("wurl", w);
		window.location.href = "ListedResult.html";

    }

    //window.location.href = "";
}

// Event listener for the form submission
window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('listing');
    if (el) {
      el.addEventListener('click', handleSubmit);
    }
});