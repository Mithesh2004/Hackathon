import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.4/ethers.min.js";

let signer = null;
let provider;

console.log(window.ethereum);

while (window.ethereum == null || window.ethereum == undefined) {
  //provider = ethers.getDefaultProvider();
  alert("Please install MetaMask");
}
provider = new ethers.BrowserProvider(window.ethereum);
console.log("HI");
signer = await provider.getSigner();
console.log(signer);
//console.log(signer)
const balance = await provider.getBalance(signer.address);
const formattedBalance = ethers.formatEther(balance);
console.log(formattedBalance);
const accountAddressElement = document.getElementById("accountAddress");
accountAddressElement.textContent = signer.address;

const accountBalanceElement = document.getElementById("accountBalance");
accountBalanceElement.textContent = formattedBalance;
