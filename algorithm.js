class Algorithm {
    #numOfBlocks = 0; // number of blocks to use
    #type; // type of algorithm to display
    constructor(numOfBlocks, type) {
        this.#numOfBlocks = numOfBlocks;
        this.#type = type;
    }

    // Method to create blocks in the center of the screen
    createBlocks(container) {
        for (var i = 0; i < this.#numOfBlocks; i++) {
            var block = document.createElement("div");
            block.className = "block";
            block.style.height = Math.floor((Math.random() * this.#numOfBlocks * 10) + 5) + "px"; // Set random height for sorting
            container.appendChild(block);
        }
    }
}
// function to draw the blocks on the screen based on the number the user requests
function drawBlocks() {
    var container = document.body;
    var numBlocks = prompt("Enter the number of blocks:");
    if (isNaN(numBlocks) || numBlocks <= 0) { // checks for valid input
        alert("Please enter a valid number greater than 0.");
        drawBlocks(); // restarts the function after alerting the user
    }
    const algorithm = new Algorithm(numBlocks, "THIS NEEDS TO BE IMPLEMENTED")
    algorithm.createBlocks(container);
}

drawBlocks();


