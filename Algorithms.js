var blocks = []; // Array to store the blocks to sort

// Function to create blocks in the center of the screen 
function createBlocks(container, numOfBlocks) {
    for (let i = 0; i < numOfBlocks; i++) {
        let block = document.createElement("div");
        block.className = "block";
        block.style.height = Math.floor((Math.random() * numOfBlocks * 4) + 5) + "px"; // Set random height for sorting
        container.appendChild(block);
        blocks.push(block);
    }
}

// Method to sort the blocks using insertion sort
function insertionSort(container) {
    for (let i = 1; i < blocks.length; i++) {
        let currentIndex = i;
        let currentBlock = blocks[currentIndex];

        setTimeout(() => {

            let previous = currentIndex - 1;

            let highlightPreviousBlock = function () {
                if (previous >= 0 && parseInt(blocks[previous].style.height) > parseInt(currentBlock.style.height)) {
                    blocks[previous + 1] = blocks[previous];
                    blocks[previous] = currentBlock;
                    setTimeout(() => {
                        blocks.forEach(block => container.appendChild(block));
                        highlightPreviousBlock();
                    }, 250);
                } else {
                    setTimeout(() => {
                        currentBlock.style.backgroundColor = "green"; // Reset background color after sorting
                    }, 250);
                }
                previous--;
            };
            highlightPreviousBlock();
        }, i * 250);
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
    insertionSortButton.className = "algoButton";
    document.querySelector('h2').appendChild(insertionSortButton);
    createBlocks(container, numBlocks);
    
    insertionSortButton.addEventListener("click", () => {
        insertionSort(container);
        //blocks.map((block) => block.style.backgroundColor = "green"); // makes sure all blocks are green after sorting
    });
}

drawBlocks();