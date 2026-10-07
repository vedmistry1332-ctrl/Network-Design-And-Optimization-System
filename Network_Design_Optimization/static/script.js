// =========================================================
// GLOBAL DATA
// =========================================================

let nodes = [];

let connections = [];


// =========================================================
// ADD DATA CENTER
// =========================================================

function addNode() {

    const input =
        document.getElementById(
            "nodeName"
        );

    const name =
        input.value
            .trim()
            .toUpperCase();


    if (name === "") {

        alert(
            "Please enter a data center name."
        );

        return;

    }


    if (nodes.includes(name)) {

        alert(
            "This data center already exists."
        );

        return;

    }


    nodes.push(name);

    input.value = "";


    updateNodeLists();

    updateStatistics();

    drawGraph();

}


// =========================================================
// UPDATE ALL NODE DROPDOWNS
// =========================================================

function updateNodeLists() {

    const sourceNode =
        document.getElementById(
            "sourceNode"
        );

    const destinationNode =
        document.getElementById(
            "destinationNode"
        );

    const pathSource =
        document.getElementById(
            "pathSource"
        );

    const pathDestination =
        document.getElementById(
            "pathDestination"
        );


    sourceNode.innerHTML =
        '<option value="">Source</option>';


    destinationNode.innerHTML =
        '<option value="">Destination</option>';


    pathSource.innerHTML =
        '<option value="">Select source</option>';


    pathDestination.innerHTML =
        '<option value="">Select destination</option>';


    nodes.forEach(node => {


        sourceNode.innerHTML +=
            `<option value="${node}">
                ${node}
            </option>`;


        destinationNode.innerHTML +=
            `<option value="${node}">
                ${node}
            </option>`;


        pathSource.innerHTML +=
            `<option value="${node}">
                ${node}
            </option>`;


        pathDestination.innerHTML +=
            `<option value="${node}">
                ${node}
            </option>`;

    });


    showNodes();

}


// =========================================================
// DISPLAY DATA CENTERS
// =========================================================

function showNodes() {

    const list =
        document.getElementById(
            "nodeList"
        );


    if (nodes.length === 0) {

        list.innerHTML =
            "<p>No data centers added yet.</p>";

        return;

    }


    list.innerHTML = "";


    nodes.forEach(node => {

        list.innerHTML +=

            `<div class="node-item">
                ${node}
            </div>`;

    });

}


// =========================================================
// ADD CONNECTION
// =========================================================

function addConnection() {

    const source =
        document.getElementById(
            "sourceNode"
        ).value;


    const destination =
        document.getElementById(
            "destinationNode"
        ).value;


    const cost =
        Number(
            document.getElementById(
                "connectionCost"
            ).value
        );


    if (!source || !destination) {

        alert(
            "Please select source and destination."
        );

        return;

    }


    if (source === destination) {

        alert(
            "Source and destination cannot be the same."
        );

        return;

    }


    if (!cost || cost <= 0) {

        alert(
            "Please enter a valid positive cost."
        );

        return;

    }


    // Check duplicate connection

    const duplicate =
        connections.some(
            edge =>

                (
                    edge[0] === source &&
                    edge[1] === destination
                )

                ||

                (
                    edge[0] === destination &&
                    edge[1] === source
                )
        );


    if (duplicate) {

        alert(
            "This connection already exists."
        );

        return;

    }


    connections.push(
        [
            source,
            destination,
            cost
        ]
    );


    document.getElementById(
        "connectionCost"
    ).value = "";


    showConnections();

    updateStatistics();

    drawGraph();

}


// =========================================================
// DISPLAY CONNECTIONS
// =========================================================

function showConnections() {

    const list =
        document.getElementById(
            "connectionList"
        );


    if (connections.length === 0) {

        list.innerHTML =
            "<p>No network connections added yet.</p>";

        return;

    }


    list.innerHTML = "";


    connections.forEach(
        ([source, destination, cost]) => {

            list.innerHTML +=

                `<div class="connection-item">

                    <span>
                        ${source} ↔ ${destination}
                    </span>

                    <strong>
                        ${cost}
                    </strong>

                </div>`;

        }
    );

}


// =========================================================
// UPDATE DASHBOARD STATISTICS
// =========================================================

function updateStatistics() {

    document.getElementById(
        "nodeCount"
    ).textContent =
        nodes.length;


    document.getElementById(
        "connectionCount"
    ).textContent =
        connections.length;

}


// =========================================================
// OPTIMIZE NETWORK
// =========================================================

async function optimizeNetwork() {

    if (nodes.length < 2) {

        alert(
            "Add at least two data centers."
        );

        return;

    }


    if (
        connections.length <
        nodes.length - 1
    ) {

        alert(
            "Not enough connections. Add at least " +
            (nodes.length - 1) +
            " connections."
        );

        return;

    }


    try {

        const response =
            await fetch(
                "/optimize",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        nodes:
                            nodes,

                        connections:
                            connections

                    })

                }
            );


        const result =
            await response.json();


        if (result.error) {

            alert(result.error);

            return;

        }


        // =================================================
        // PRIM
        // =================================================

        document.getElementById(
            "primCost"
        ).textContent =
            result.prim.cost;


        document.getElementById(
            "primTime"
        ).textContent =
            result.prim.time.toFixed(8)
            + " seconds";


        showMST(
            "primEdges",
            result.prim.edges
        );


        // =================================================
        // KRUSKAL
        // =================================================

        document.getElementById(
            "kruskalCost"
        ).textContent =
            result.kruskal.cost;


        document.getElementById(
            "kruskalTime"
        ).textContent =
            result.kruskal.time.toFixed(8)
            + " seconds";


        showMST(
            "kruskalEdges",
            result.kruskal.edges
        );


        // =================================================
        // DASHBOARD
        // =================================================

        document.getElementById(
            "dashboardCost"
        ).textContent =
            result.prim.cost;


        document.getElementById(
            "networkStatus"
        ).textContent =
            "Optimized";


        // =================================================
        // SUMMARY
        // =================================================

        let fasterAlgorithm = "Prim's";

        if (
            result.kruskal.time <
            result.prim.time
        ) {

            fasterAlgorithm =
                "Kruskal's";

        }


        document.getElementById(
            "optimizationSummary"
        ).textContent =

            "Both algorithms produced an MST with a " +
            "minimum network cost of " +
            result.prim.cost +
            ". In this execution, " +
            fasterAlgorithm +
            " completed faster. " +
            "Actual execution time can vary depending " +
            "on network size and structure.";


        document.getElementById(
            "results"
        ).classList.remove(
            "hidden"
        );


        // Draw MST

        drawGraph(
            result.prim.edges,
            []
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the Flask server."
        );

    }

}


// =========================================================
// FIND SHORTEST PATH
// =========================================================

async function findShortestPath() {

    const source =
        document.getElementById(
            "pathSource"
        ).value;


    const destination =
        document.getElementById(
            "pathDestination"
        ).value;


    if (!source || !destination) {

        alert(
            "Please select both source and destination."
        );

        return;

    }


    if (source === destination) {

        alert(
            "Source and destination must be different."
        );

        return;

    }


    if (nodes.length < 2) {

        alert(
            "Add at least two data centers first."
        );

        return;

    }


    if (connections.length === 0) {

        alert(
            "Add network connections first."
        );

        return;

    }


    try {

        const response =
            await fetch(
                "/optimize",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        nodes:
                            nodes,

                        connections:
                            connections,

                        pathSource:
                            source,

                        pathDestination:
                            destination

                    })

                }
            );


        const result =
            await response.json();


        if (result.error) {

            alert(result.error);

            return;

        }


        const shortest =
            result.shortestPath;


        if (
            !shortest.path ||
            shortest.path.length === 0
        ) {

            alert(
                "No path exists between the selected data centers."
            );

            return;

        }


        // =================================================
        // DISPLAY PATH
        // =================================================

        document.getElementById(
            "shortestPath"
        ).textContent =
            shortest.path.join(
                " → "
            );


        // =================================================
        // DISPLAY COST
        // =================================================

        document.getElementById(
            "shortestCost"
        ).textContent =
            shortest.cost;


        // =================================================
        // DISPLAY HOPS
        // =================================================

        document.getElementById(
            "shortestHops"
        ).textContent =
            shortest.hops;


        // =================================================
        // DISPLAY TIME
        // =================================================

        document.getElementById(
            "shortestTime"
        ).textContent =
            shortest.time.toFixed(8)
            + " seconds";


        // Show result

        document.getElementById(
            "shortestPathResult"
        ).classList.remove(
            "hidden"
        );


        // Highlight shortest path

        drawGraph(
            [],
            shortest.path
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to calculate shortest path."
        );

    }

}


// =========================================================
// SHOW MST EDGES
// =========================================================

function showMST(
    elementId,
    edges
) {

    const element =
        document.getElementById(
            elementId
        );


    element.innerHTML = "";


    edges.forEach(
        ([source, destination, cost]) => {

            element.innerHTML +=

                `<span class="mst-edge">
                    ${source}
                    →
                    ${destination}
                    (${cost})
                </span>`;

        }
    );

}


// =========================================================
// DRAW NETWORK GRAPH
// =========================================================

function drawGraph(
    mstEdges = [],
    shortestPath = []
) {

    const elements = [];


    // =====================================================
    // ADD NODES
    // =====================================================

    nodes.forEach(node => {

        elements.push({

            data: {

                id: node,

                label: node

            }

        });

    });


    // =====================================================
    // ADD EDGES
    // =====================================================

    connections.forEach(
        ([source, destination, cost], index) => {


            const isMST =
                mstEdges.some(
                    edge =>

                        (
                            edge[0] === source &&
                            edge[1] === destination
                        )

                        ||

                        (
                            edge[0] === destination &&
                            edge[1] === source
                        )
                );


            const isShortest =
                isEdgeInPath(
                    source,
                    destination,
                    shortestPath
                );


            elements.push({

                data: {

                    id:
                        "edge" + index,

                    source:
                        source,

                    target:
                        destination,

                    label:
                        String(cost),

                    mst:
                        isMST,

                    shortest:
                        isShortest

                }

            });

        }
    );


    // =====================================================
    // CYTOSCAPE
    // =====================================================

    cytoscape({

        container:
            document.getElementById(
                "networkGraph"
            ),


        elements:
            elements,


        style: [

            // ---------------------------------------------
            // NODES
            // ---------------------------------------------

            {

                selector: "node",

                style: {

                    "label":
                        "data(label)",

                    "background-color":
                        "#2563eb",

                    "color":
                        "#ffffff",

                    "text-valign":
                        "center",

                    "text-halign":
                        "center",

                    "width":
                        55,

                    "height":
                        55,

                    "font-size":
                        12,

                    "font-weight":
                        "bold",

                    "border-width":
                        3,

                    "border-color":
                        "#1e3a8a"

                }

            },


            // ---------------------------------------------
            // NORMAL EDGES
            // ---------------------------------------------

            {

                selector: "edge",

                style: {

                    "label":
                        "data(label)",

                    "line-color":
                        "#94a3b8",

                    "width":
                        2,

                    "curve-style":
                        "bezier",

                    "font-size":
                        12,

                    "color":
                        "#334155",

                    "text-background-color":
                        "#ffffff",

                    "text-background-opacity":
                        1,

                    "text-background-padding":
                        3

                }

            },


            // ---------------------------------------------
            // MST
            // ---------------------------------------------

            {

                selector:
                    'edge[mst = "true"]',

                style: {

                    "line-color":
                        "#16a34a",

                    "width":
                        6,

                    "color":
                        "#166534"

                }

            },


            // ---------------------------------------------
            // SHORTEST PATH
            // ---------------------------------------------

            {

                selector:
                    'edge[shortest = "true"]',

                style: {

                    "line-color":
                        "#dc2626",

                    "width":
                        7,

                    "color":
                        "#991b1b"

                }

            }

        ],


        layout: {

            name:
                "cose",

            animate:
                true,

            padding:
                50

        }

    });

}


// =========================================================
// CHECK WHETHER EDGE BELONGS TO SHORTEST PATH
// =========================================================

function isEdgeInPath(
    source,
    destination,
    path
) {

    for (
        let i = 0;
        i < path.length - 1;
        i++
    ) {

        if (

            (
                path[i] === source &&
                path[i + 1] === destination
            )

            ||

            (
                path[i] === destination &&
                path[i + 1] === source
            )

        ) {

            return true;

        }

    }


    return false;

}


// =========================================================
// RESET NETWORK
// =========================================================

function resetNetwork() {

    nodes = [];

    connections = [];


    // Clear inputs

    document.getElementById(
        "nodeName"
    ).value = "";


    document.getElementById(
        "connectionCost"
    ).value = "";


    // Reset dropdowns

    updateNodeLists();


    // Clear connection list

    showConnections();


    // Update statistics

    updateStatistics();


    document.getElementById(
        "dashboardCost"
    ).textContent = "-";


    document.getElementById(
        "networkStatus"
    ).textContent =
        "Not Optimized";


    // Hide results

    document.getElementById(
        "results"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "shortestPathResult"
    ).classList.add(
        "hidden"
    );


    // Clear graph

    drawGraph();

}


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNodeLists();

        updateStatistics();

        drawGraph();

    }
);