
var My_Address = localStorage.getItem('SentAddress3')

// ABI file which holds the components of the contract written using solidity

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




console.log("Address is (without click) : ", My_Address);

// Async function call to View Result of All Items
async function handleView(event) {

	event.preventDefault(); // Prevent default form submission behavior
    //const  My_Address = localStorage.getItem("MyAddress");
    console.log("Address is : ", My_Address);
    
	const contAddress = '0x97B5ee79024046D5352A81b54685ce6C8aceB026'

    if(window.ethereum) {
        const w3ins = new Web3(window.ethereum);
        // await window.ethereum.enable();

        const contIns = new w3ins.eth.Contract(contABI, contAddress);
		
		try{

		var res = await contIns.methods.viewAllItems().call();
        
        console.log('curr res: ', res);
		localStorage.setItem('resultJson', res)
		localStorage.setItem("MyAddress", My_Address);
		window.location.href = "ViewResult.html";

		} catch(error){

			console.error(error)
		}

    }

}


// Async function call to View Result of Sold Items
async function handleView2(event) {

	event.preventDefault(); // Prevent default form submission behavior
    //const  My_Address = localStorage.getItem("MyAddress");
    console.log("Address is : ", My_Address);

	const contAddress = '0x97B5ee79024046D5352A81b54685ce6C8aceB026'

    if(window.ethereum) {
        const w3ins = new Web3(window.ethereum);
        // await window.ethereum.enable();

        const contIns = new w3ins.eth.Contract(contABI, contAddress);
		
		try{

		const res = await contIns.methods.viewAllItems().call();
        
        console.log('curr res: ', res);
		localStorage.setItem('resultJson', res)
		window.location.href = "ViewResult2.html";
		} catch(error){

			console.error(error)
		}

    }

}

// Async function call to View Result of Unsold Items
async function handleView3(event) {

	event.preventDefault(); // Prevent default form submission behavior
    //const  My_Address = localStorage.getItem("MyAddress");
    console.log("Address is : ", My_Address);
    
    // Redirect to another file with the values appended as query parameters

	const contAddress = '0x97B5ee79024046D5352A81b54685ce6C8aceB026'

    if(window.ethereum) {
        const w3ins = new Web3(window.ethereum);
        // await window.ethereum.enable();

        const contIns = new w3ins.eth.Contract(contABI, contAddress);
		
		try{

		const res = await contIns.methods.viewAllItems().call();
        
        console.log('curr res: ', res);
		localStorage.setItem('resultJson', res)
		window.location.href = "ViewResult3.html";
		} catch(error){

			console.error(error)
		}

    }

}


// Event listener for the form submission
window.addEventListener("DOMContentLoaded", (event) => {
    const e1 = document.getElementById('viewlist');
    if (e1) {
      e1.addEventListener('click', handleView);
    }
});

// Event listener for the form submission
window.addEventListener("DOMContentLoaded", (event) => {
    const e2 = document.getElementById('viewlistsold');
    if (e2) {
      e2.addEventListener('click', handleView2);
    }
});

// Event listener for the form submission
window.addEventListener("DOMContentLoaded", (event) => {
    const e2 = document.getElementById('viewlistunsold');
    if (e2) {
      e2.addEventListener('click', handleView3);
    }
});