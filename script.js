const portfolioElement = document.getElementById("portfolio");
const addStockButton = document.getElementById("addStock");

addStockButton.addEventListener("click", addStock);

function addStock() {
  const symbol = prompt("Enter stock symbol (e.g., AAPL):");

  if (!symbol) {
    return;
  }

  fetchStockData(symbol);
}

async function fetchStockData(symbol) {
  const apiKey = "64QDM8O22G8KZ7AS";
  const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.error) {
      alert(`Error fetching data: ${data.error}`);
      return;
    }

    displayStock(data);
  } catch (error) {
    alert(`Error fetching data: ${error}`);
  }
}

function displayStock(data) {
  const stockElement = document.createElement("div");
  stockElement.classList.add("stock");

  // Extract relevant data
  data = data["Global Quote"];
  const symbol = data["01. symbol"];
  const latTradeDay = data["07. latest trading day"];
  const price = data["05. price"];
  const changePercent =
    parseFloat(data["10. change percent"]) >= 0
      ? data["10. change percent"] + " &#x2191;"
      : data["10. change percent"] + " &#x2193;";

  // Determine colour based on change
  const changeColor = parseFloat(data["09. change"]) >= 0 ? "green" : "red";

  stockElement.innerHTML = `
      <h2>${symbol}</h2>
      <p>Latest Trading Day(EDT): ${latTradeDay}</p>
      <p>Price: $${price}</p>
      <p style="color: ${changeColor}">${changePercent}</p>
      <button class="close-button">X</button>
    `;

  const closeBtn = stockElement.querySelector(".close-button"); // Get the close button
  closeBtn.addEventListener("click", closeStock); // Add event listener

  portfolioElement.appendChild(stockElement);
}

function closeStock(event) {
  const stockElement = event.target.parentElement; // Get the parent element (stock)
  portfolioElement.removeChild(stockElement); // Remove the stock element from the portfolio
}

const updateInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

// Function to fetch and update stock data
async function updateStock(symbol) {
  try {
    const apiKey = "64QDM8O22G8KZ7AS";
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.error) {
      alert(`Error fetching data for ${symbol}: ${data.error}`);
      return;
    }

    // Update the displayed stock element
    const stockElement = document.querySelector(`#stock-${symbol}`);
    if (stockElement) {
      const price = data["Global Quote"]["05. price"];
      const changePercent =
        parseFloat(data["Global Quote"]["10. change percent"]) >= 0
          ? data["Global Quote"]["10. change percent"] + " &#x2191;"
          : data["Global Quote"]["10. change percent"] + " &#x2193;";
      const changeColor =
        parseFloat(data["Global Quote"]["09. change"]) >= 0 ? "green" : "red";

      stockElement.innerHTML = `
          <h2>${symbol}</h2>
          <p>Latest Trading Day(EDT): ${data["Global Quote"]["07. latest trading day"]}</p>
          <p>Price: $${price}</p>
          <p style="color: ${changeColor}">${changePercent}</p>
          <button class="close-button">X</button>
        `;
    }
  } catch (error) {
    console.error(`Error updating data for ${symbol}:`, error);
  }
}

// Function to update all stocks in the portfolio
function updateAllStocks() {
  const stocks = document.querySelectorAll(".stock");
  stocks.forEach((stock) => {
    const symbol = stock.querySelector("h2").textContent;
    updateStock(symbol);
  });
}

// Initial update
updateAllStocks();

// Set interval to update every 5 minutes
setInterval(updateAllStocks, updateInterval);
