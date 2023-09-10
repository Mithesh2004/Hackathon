import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.4/ethers.min.js";

let signer = null;
let provider;

console.log(window.ethereum);

while (window.ethereum == null || window.ethereum == undefined) {
  alert("Please install MetaMask");
}
provider = new ethers.BrowserProvider(window.ethereum);
signer = await provider.getSigner();
//console.log(signer)
const balance = await provider.getBalance(signer.address);
const formattedBalance = ethers.formatEther(balance);
const accountAddressElement = document.getElementById("accountAddress");
accountAddressElement.textContent = signer.address;

const accountBalanceElement = document.getElementById("accountBalance");
accountBalanceElement.textContent = formattedBalance;
