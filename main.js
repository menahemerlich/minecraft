
const board = document.getElementById("game-container")
const boardCells = []

function clearCellClicks() {
    const areaList = document.getElementsByClassName("hover");
    for (const area of areaList) {
        area.onclick = null;
    }
}


for (let row = 0; row < 25; row++) {
    boardCells[row] = []
    for (let col = 0; col < 40; col++) {
        const element = document.createElement("div")
        element.classList.add("hover")
        element.addEventListener("click", () => {
            actions(element, counters)
        })
        board.appendChild(element)
        boardCells[row][col] = element

        if (row >= 20) {
            element.classList.add("stone")
        }
        else if (row >= 18 && row < 20) {
            element.classList.add("soil")
        }
        else if (row >= 17 && row < 18) {
            element.classList.add("grass")
        }
        else {
            element.classList.add("sky")
        }
    }
}

function createTree(startRow, startCol, treeMatrix) {
    for (let i = 0; i < treeMatrix.length; i++) {
        for (let j = 0; j < treeMatrix[i].length; j++) {
            if (treeMatrix[i][j] === 1) {
                const stem = boardCells[startRow + i][startCol + j]
                stem.classList.add("stem")
            }
            if (treeMatrix[i][j] === 2) {
                const branches = boardCells[startRow + i][startCol + j]
                branches.classList.add("branches")
            }
        }
    }
}

const tree = [
    [0, 0, 2, 0, 0],
    [0, 2, 2, 2, 0],
    [2, 2, 2, 2, 2],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
];
const tree1 = [
    [0, 0, 2, 2, 0, 0],
    [0, 2, 2, 2, 2, 0],
    [2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0]
];
const tree2 = [
    [0, 0, 2, 0, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0]
];

createTree(11, 6, tree)
createTree(8, 25, tree1)
createTree(3, 10, tree2)
createTree(8, 15, tree1)

let tool;
const tools = document.getElementById("tools")
for (const element of tools.children) {
    element.addEventListener("click", () => {
        clearCellClicks()
        document.body.style.cursor = "auto";
        document.body.style.cursor = `url("images/${element.id}-s.png"),auto`;
        tool = element.id
    })
}
const counters = {
    stone: 0,
    soil: 0,
    grass: 0,
    stem: 0,
    branches: 0
}

const footer = document.getElementById("tools-container")
const box = document.getElementById("box")
box.addEventListener("click", () => {
    const inventory = document.getElementById("inventory")
    if (inventory.style.display == "flex") {
        inventory.style.display = "none"
    } else {
        inventory.style.display = "flex"
    }
    inventory.innerHTML = "";
    const types = ["stone", "soil", "grass", "stem", "branches"];
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        const item = document.createElement("div");
        item.id = "item" + (i + 1);
        item.classList.add("item", type);
        item.innerText = counters[type];
        if (counters[type] <= 0) {
            item.style.display = "none"
        }
        inventory.appendChild(item);
        item.addEventListener("click", () => {
            clearCellClicks()
            const elementType = item.classList[item.classList.length - 1];
            tool = "place";
            document.body.style.cursor = `url("images/${elementType}-s.jpg"),auto`;
            if (counters[elementType] > 0) {
                const areaList = document.getElementsByClassName("hover")
                for (const area of areaList) {
                    area.onclick = () => {
                        if (area.classList[area.classList.length - 1] === "sky" && counters[elementType] > 0) {
                            area.classList.remove("sky")
                            area.classList.add(elementType)
                            area.style.background = ""
                            counters[elementType]--;
                            item.innerText = counters[elementType];
                            if (counters[elementType] === 0) {
                                item.remove();
                                document.body.style.cursor = "auto";
                            }
                        }
                    }
                }
            }
        })
    }
})

function actions(element, counters) {
    const elementType = element.classList[element.classList.length - 1];
    const toolMapping = {
        stone: "axe",
        soil: "shovel",
        grass: "shovel",
        stem: "pickaxe",
        branches: "pickaxe"
    };
    const inventoryIds = {
        stone: "item1",
        soil: "item2",
        grass: "item3",
        stem: "item4",
        branches: "item5"
    };

    if (tool === toolMapping[elementType]) {
        element.classList.remove(elementType);
        element.classList.add("sky");
        element.style.background = "#a5e1e1";

        counters[elementType]++;

        const itemId = inventoryIds[elementType];
        const item = document.getElementById(itemId);

        if (item) {
            item.classList.add("item", elementType);
            item.innerText = counters[elementType];
            item.style.display = "block";
        }
    }
}


const man = document.createElement("div")
board.appendChild(man)
man.classList.add("man")