
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




console.log("Address is (without click) : ", My_Address);
async function handleBuy(event) {

    event.preventDefault(); // Prevent default form submission behavior
    //const  My_Address = localStorage.getItem("MyAddress");
    console.log("Address is : ", My_Address);
    
    const ItemId = document.getElementById('idd').value;
    console.log("Item Id is : ", ItemId);

	const contAddress = '0x97B5ee79024046D5352A81b54685ce6C8aceB026'

    if(window.ethereum) {
        
        const w3ins = new Web3(window.ethereum);

        const contIns = new w3ins.eth.Contract(contABI, contAddress);
		
		try{

            var jsonData = await contIns.methods.viewAllItems().call();

            try {
                // Parse the JSON data
                //const jsonData = JSON.parse(res);
            
                // Iterate over key-value pairs using for loop
                for (const key in jsonData) {
                  if (Object.hasOwnProperty.call(jsonData, key)) {
                    const value = jsonData[key];
                    //console.log(`${key}: ${value}`);
                    if (Number(`${key}`) === Number(ItemId)-1) {

                        var seller_validate = `${value}`.split(',')[4];
                        var item_validate = `${value}`.split(',')[5];
                        var x = `${value}`.split(',')[3];
                        break;
                        //console.log(x)
                    } 
                    // else{console.log("Still Struck!!")}
                  }
                }
              } catch (error) {
                console.error('Error parsing JSON:', error);
            }

            // console.log(seller_validate)
            // console.log(My_Address)
            

            if (seller_validate.toLocaleLowerCase() === My_Address) {

                alert("You need not buy an item listed by yourself!!")
                window.location.href = "PurchaseItems.html";
            }

            else {

                if (item_validate === 'false') {

                    var res = await contIns.methods.purchaseItem(ItemId).send({from: My_Address, value: x});
                    
                    console.log('Purchase Txn result is : ', res);
                    localStorage.setItem("MyAddress", My_Address);
                    localStorage.setItem("thash", res.transactionHash);
                    localStorage.setItem("bhash", res.blockHash);
                    localStorage.setItem("bnum", res.blockNumber);
                    localStorage.setItem("gas", res.gasUsed);
                    localStorage.setItem("tevent", res.events.ItemPurchased.event);
                    localStorage.setItem("iid", res.events.ItemPurchased.returnValues.id);
                    
                    const w = "https://sepolia.etherscan.io/tx/".concat(res.transactionHash)
                    localStorage.setItem("wurl", w);
                    window.location.href = "PurchaseResult.html";
                }

                else{

                    alert("Sorry! This Item has been sold already! Try another One..")
                    window.location.href = "PurchaseItems.html";
                }

            }

		} catch(error){

			alert(error)
		}

    }


}


// Event listener for the form submission
window.addEventListener("DOMContentLoaded", (event) => {
    const e7 = document.getElementById('buyitem');
    if (e7) {
      e7.addEventListener('click', handleBuy);
    }
});