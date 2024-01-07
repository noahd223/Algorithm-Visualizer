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
    // Method to sort the blocks using insertion sort
    insertionSort(container) {
        var blocks = Array.from(container.children);

        for (let i = 1; i < blocks.length; i++) {
            let currentIndex = i;

            setTimeout(function () {
                var key = blocks[currentIndex];
                var j = currentIndex - 1;

                while (j >= 0 && parseInt(blocks[j].style.height) > parseInt(key.style.height)) {
                    blocks[j + 1] = blocks[j];
                    j = j - 1;
                }

                blocks[j + 1] = key;

                // Rearrange the sorted blocks in the container
                container.innerHTML = "";
                blocks.forEach(block => container.appendChild(block));
            }, i * 250); // NEED TO IMPLEMENT FUNCTION TO MAKE TIME DECREASE AS BLOCKS INCREASE
        }
    }

}

// function to draw the blocks on the screen based on the number the user requests
function drawBlocks() {
    var container = document.body;
    var numBlocks = prompt("Enter the number of blocks:");

    if (isNaN(numBlocks) || numBlocks <= 0) {
        alert("Please enter a valid number greater than 0.");
        drawBlocks();
    }

    const algorithm = new Algorithm(numBlocks, "insertionSort");
    algorithm.createBlocks(container);
    algorithm.insertionSort(container);
}

drawBlocks();
