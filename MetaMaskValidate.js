

async function connectToMetaMask(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask:", accounts[0]);
            localStorage.setItem("MyAddress", accounts[0]);
            window.location.href = "home.html";
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        console.error("MetaMask not detected. Please install MetaMask to use this application.");
    }
  
}

// Add event listener to button
document.getElementById('connectMeta').addEventListener('click', connectToMetaMask);
//window.location.href = "home.html";


