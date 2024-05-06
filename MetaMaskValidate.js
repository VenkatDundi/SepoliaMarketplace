
// Asynuc function to connect to Wallet

async function connectToMetaMask(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask:", accounts[0]);
            localStorage.setItem("MyAddress", accounts[0]);             // Set Wallet Address
            window.location.href = "home.html";                 // Redirect to Home Page where User can perform actions on block chain
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        console.error("MetaMask not detected. Please install MetaMask to use this application.");
    }
  
}

// Add event listener to button
document.getElementById('connectMeta').addEventListener('click', connectToMetaMask);


