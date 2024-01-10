var blocks = []; // Array to store the blocks to sort
var container = document.body;
var speed = 250; // stores the speed of the algorithm based on the slider
var sortingInProgress = false;


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

// Function to sort the blocks using insertion sort
function insertionSort(container, speed) {
    let maxDelay = 0;
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
                    }, speed);
                } else {
                    setTimeout(() => {
                        currentBlock.style.backgroundColor = "green"; // Reset background color after sorting
                    }, speed);
                }
                previous--;
            };
            highlightPreviousBlock();
        }, i * speed);
        maxDelay = Math.max(maxDelay, (i + 1) * speed); 3
        console.log(maxDelay);
    }

    // Add a final setTimeout with the maximum delay observed during sorting
    setTimeout(() => {
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.backgroundColor = "green"; // make sure all blocks are green
            }, (index + 1) * speed);
        });
    }, maxDelay);
}

// function to draw the blocks on the screen based on the number the user requests
function drawBlocks() {
    var numBlocks = prompt("Enter the number of blocks:");

    if (isNaN(numBlocks) || numBlocks <= 0) {
        alert("Please enter a valid number greater than 0.");
        drawBlocks();
    }
    blocks.forEach(block => block.remove()); // Remove each block element
    blocks = [];
    createBlocks(container, numBlocks);
}

// function to draw the buttons to activate certain algorithms
function drawButtons() {
    const speedSlider = document.getElementById('speedRange');
    // Draws speed slider
    speedSlider.addEventListener("input", () => {
        speed = 500 - speedSlider.value;
    })

    // Draws reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    document.querySelector("h4").appendChild(resetButton);
    resetButton.addEventListener("click", () => {
        sortingInProgress = false;
        drawBlocks();
    });

    // Draws insertion sort button
    const insertionSortButton = document.createElement("button");
    insertionSortButton.textContent = "Insertion Sort";
    document.querySelector('h2').appendChild(insertionSortButton);
    insertionSortButton.addEventListener("click", () => {
        if (!sortingInProgress) {
            insertionSort(container, speed);
            sortingInProgress = true;
        }
    });
}

function drawScreen() {
    drawBlocks();
    drawButtons();
}

drawScreen();
