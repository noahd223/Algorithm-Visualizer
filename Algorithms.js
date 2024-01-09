// Function to create blocks in the center of the screen 
function createBlocks(container, numOfBlocks) {
    for (var i = 0; i < numOfBlocks; i++) {
        var block = document.createElement("div");
        block.className = "block";
        block.style.height = Math.floor((Math.random() * numOfBlocks * 4) + 5) + "px"; // Set random height for sorting
        container.appendChild(block);
    }
}

// Method to sort the blocks using insertion sort
function insertionSort(container) {
    var blocks = Array.from(container.children); // make it so it only adds the blocks to the array and not the buttons

    for (let i = 1; i < blocks.length; i++) {
        let currentIndex = i;

        setTimeout(function () {
            var currentBlock = blocks[currentIndex];
            var previous = currentIndex - 1;

            currentBlock.style.backgroundColor = "green";
            while (previous >= 0 && parseInt(blocks[previous].style.height) > parseInt(currentBlock.style.height)) {
                blocks[previous + 1] = blocks[previous];
                previous = previous - 1;
            }

            blocks[previous + 1] = currentBlock;

            currentBlock.style.backgroundColor = "#3498db"; // Reset background color after sorting
            // Rearrange the sorted blocks in the container
            container.innerHTML = "";
            blocks.forEach(block => container.appendChild(block));
        }, i * 250); // NEED TO IMPLEMENT FUNCTION TO MAKE TIME DECREASE AS BLOCKS INCREASE
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

    const insertionSortButton = document.createElement("button");
    insertionSortButton.textContent = "Insertion Sort";
    document.body.appendChild(insertionSortButton);
    createBlocks(container, numBlocks);
    insertionSortButton.addEventListener("click", function () {
        insertionSort(container);
    });

    
}

drawBlocks();
