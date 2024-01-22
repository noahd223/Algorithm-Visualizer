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

// Function to sort the blocks using the insertion sort algorithm
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
        maxDelay = Math.max(maxDelay, (i + 1) * speed);
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

// Function to sort the blocks using the bubble sort algorithm
function bubbleSort(container, speed) {
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            setTimeout(function () {
                var currentBlock = blocks[j];
                var nextBlock = blocks[j + 1];
                if (parseInt(currentBlock.style.height) > parseInt(nextBlock.style.height)) {
                    // Swap blocks
                    var tempHeight = currentBlock.style.height;
                    currentBlock.style.height = nextBlock.style.height;
                    nextBlock.style.height = tempHeight;
                }
                if (i > 0) { // highlight the sorted block at the end of the list in green
                    blocks[blocks.length - i].style.backgroundColor = "green";
                }
                // Rearrange the sorted blocks in the container
                blocks.forEach(block => container.appendChild(block));
            }, ((i / 5) * (blocks.length - 1) + (j / 5)) / 2 * speed); // Adjust the delay as needed
        }
    }
}

// Function to sort the blocks using the merge sort algorithm
function mergeSort(container, speed) {
    // Helper function to merge two sorted arrays
    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (parseInt(left[leftIndex].style.height) < parseInt(right[rightIndex].style.height)) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    // Recursive function to perform merge sort
    function mergeSortRecursive(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        return merge(mergeSortRecursive(left), mergeSortRecursive(right));
    }

    const sortedBlocks = mergeSortRecursive(blocks);

    // Animate the sorted blocks
    sortedBlocks.forEach((block, index) => {
        setTimeout(() => {
            container.appendChild(block);
        }, index * speed);
    });
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
        console.log(sortingInProgress);
        if (!sortingInProgress) {
            drawBlocks();
        } else {
            alert("Please wait until the blocks are finished sorting before reseting");
        }
    });

    // Draws insertion sort button
    const insertionSortButton = document.createElement("button");
    insertionSortButton.textContent = "Insertion Sort";
    document.querySelector('h2').appendChild(insertionSortButton);
    insertionSortButton.addEventListener("click", () => {
        if (!sortingInProgress) {
            sortingInProgress = true;
            insertionSort(container, speed);
        }
    });

    // Draws the bubble sort button
    const bubbleSortButton = document.createElement("button");
    bubbleSortButton.textContent = "Bubble Sort";
    document.querySelector('h2').appendChild(bubbleSortButton);
    bubbleSortButton.addEventListener("click", () => {
        if (!sortingInProgress) {
            sortingInProgress = true;
            bubbleSort(container, speed);
        }
    });

    // Draws the merge sort button
    const mergeSortButton = document.createElement("button");
    mergeSortButton.textContent = "Merge Sort";
    document.querySelector('h2').appendChild(mergeSortButton);
    mergeSortButton.addEventListener("click", () => {
        if (!sortingInProgress) {
            sortingInProgress = true;
            mergeSort(container, speed);
        }
    });
}

function drawScreen() {
    drawBlocks();
    drawButtons();
}

drawScreen();
