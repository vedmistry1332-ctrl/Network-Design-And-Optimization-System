# ☁️ Cloud Data Center Network Optimizer

A graph-based network optimization system developed using **Python, Flask, and JavaScript** for designing and analyzing efficient cloud data center networks.

The project applies important **Design and Analysis of Algorithms (DAA)** concepts including:

- Minimum Spanning Tree (MST)
- Prim's Algorithm
- Kruskal's Algorithm
- Dijkstra's Shortest Path Algorithm
- Graph Representation
- Time Complexity Analysis
- Space Complexity Analysis
- Network Cost Optimization
- Algorithm Execution Time Measurement
- Interactive Graph Visualization

---

## 📌 Project Overview

Modern cloud data centers contain multiple locations connected through network links. Designing these connections efficiently is important for reducing infrastructure cost while maintaining connectivity.

This project represents data centers as **vertices (nodes)** and network connections as **weighted edges**.

The system provides two major types of analysis:

### 1. Network Optimization

Prim's and Kruskal's algorithms are used to find a **Minimum Spanning Tree (MST)**.

The MST connects all data centers with:

- Minimum possible total network cost
- No unnecessary cycles
- Exactly `V - 1` connections for a connected graph

### 2. Shortest Path Analysis

Dijkstra's algorithm is used to find the **minimum-cost path between a user-selected source and destination data center**.

The system displays:

- Selected source
- Selected destination
- Shortest route
- Total path cost
- Number of hops
- Algorithm execution time

---

# 🎯 Objectives

The main objectives of this project are:

1. Represent a cloud network using a weighted graph.
2. Find the Minimum Spanning Tree using Prim's algorithm.
3. Find the Minimum Spanning Tree using Kruskal's algorithm.
4. Calculate the minimum network infrastructure cost.
5. Find the shortest path between two selected data centers.
6. Compare algorithm execution times.
7. Visualize the network graph interactively.
8. Demonstrate practical applications of graph algorithms.
9. Analyze time and space complexity.
10. Provide a simple web-based interface for users.

---

# 🧠 Algorithms Used

## 1. Prim's Algorithm

Prim's algorithm constructs a Minimum Spanning Tree by starting from a selected vertex and repeatedly adding the minimum-cost edge that connects a visited vertex to an unvisited vertex.

### Purpose

Used for:

> Designing the minimum-cost network connecting all data centers.

### Time Complexity

Using a priority queue:

```text
O(E log V)
Space Complexity
O(V + E)
2. Kruskal's Algorithm

Kruskal's algorithm creates a Minimum Spanning Tree by sorting all network connections according to their cost and adding the cheapest edge that does not create a cycle.

The project uses the Union-Find / Disjoint Set data structure to detect cycles efficiently.

Purpose

Used for:

Finding an alternative MST solution and comparing it with Prim's algorithm.

Time Complexity
O(E log E)
Space Complexity
O(V + E)
3. Dijkstra's Algorithm

Dijkstra's algorithm finds the minimum-cost path between a selected source and destination.

The project uses a priority queue to efficiently select the next closest data center.

Purpose

Used for:

Finding the cheapest route between two selected data centers.

Time Complexity

Using a priority queue:

O((V + E) log V)
Space Complexity
O(V + E)
Important Note

Dijkstra's algorithm requires non-negative edge weights.

Therefore, this application only allows positive network costs.

🏗️ System Architecture
                 ┌─────────────────────────┐
                 │       Web Browser       │
                 │                         │
                 │ HTML + CSS + JavaScript │
                 └────────────┬────────────┘
                              │
                              │ HTTP Request
                              ▼
                 ┌─────────────────────────┐
                 │      Flask Backend      │
                 │        app.py           │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │    Algorithm Module     │
                 │                         │
                 │  Prim                   │
                 │  Kruskal                │
                 │  Dijkstra               │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │       Results           │
                 │                         │
                 │ MST Cost                │
                 │ Shortest Path           │
                 │ Execution Time          │
                 │ Graph Visualization     │
                 └─────────────────────────┘
📂 Project Structure
Network_Design_Optimization/
│
├── app.py
├── algorithms.py
├── README.md
│
├── templates/
│   └── index.html
│
└── static/
    ├── script.js
    └── style.css
🛠️ Technologies Used
Backend
Python
Flask
Frontend
HTML5
CSS3
JavaScript
Graph Visualization
Cytoscape.js
Algorithms
Prim's Algorithm
Kruskal's Algorithm
Dijkstra's Algorithm
Union-Find / Disjoint Set
Performance Measurement

Python:

time.perf_counter()

is used to measure algorithm execution time.

💻 Requirements

Before running the project, make sure you have:

Python 3.9 or higher
pip
Web browser
Git
⚙️ Installation
Step 1: Clone the Repository
git clone https://github.com/YOUR_USERNAME/Network_Design_Optimization.git

Move into the project directory:

cd Network_Design_Optimization
Step 2: Create a Virtual Environment

Windows:

python -m venv venv

Activate it:

venv\Scripts\activate

Linux/macOS:

python3 -m venv venv
source venv/bin/activate
Step 3: Install Flask
pip install flask
▶️ Running the Project

Run:

python app.py

The Flask server will start at:

http://127.0.0.1:5000

Open the URL in your browser.

🖥️ How to Use
Step 1: Add Data Centers

Enter data center names such as:

SURAT
MUMBAI
DELHI

Click:

+ Add Center
Step 2: Add Network Connections

Select:

Source
Destination
Cost

Example:

SURAT → MUMBAI = 15
SURAT → DELHI = 20
DELHI → MUMBAI = 25

The network is represented as an undirected weighted graph.

📊 Example Network
              20
        SURAT ───────── DELHI
          │               │
          │               │
        15│               │25
          │               │
          └──── MUMBAI ───┘

Connections:

SURAT ↔ MUMBAI = 15
SURAT ↔ DELHI  = 20
DELHI ↔ MUMBAI = 25
🌳 Minimum Spanning Tree

For the example above, the MST selects:

SURAT ── MUMBAI = 15

SURAT ── DELHI = 20

Therefore:

Minimum Network Cost = 15 + 20

Minimum Network Cost = 35

Both Prim's and Kruskal's algorithms should produce the same minimum cost:

35
🧭 Shortest Path Analysis

The user can select:

Source Data Center
Destination Data Center

For example:

Source      : MUMBAI
Destination : DELHI

The system uses Dijkstra's algorithm.

Possible route:

MUMBAI → DELHI

Cost:

25

Another example:

MUMBAI → SURAT → DELHI

Cost:

15 + 20 = 35

Since:

25 < 35

Dijkstra selects:

MUMBAI → DELHI
📈 Dashboard Features

The web interface provides:

Data Center Statistics

Displays:

Number of Data Centers
Number of Connections
Minimum Network Cost
Network Status
Network Visualization

The graph displays:

Data centers
Network connections
Connection costs
MST edges
Shortest path
Color Legend
Gray  → Normal Connection

Green → Minimum Spanning Tree

Red   → Shortest Path
📋 Algorithm Comparison
Algorithm	Purpose	Time Complexity	Space Complexity
Prim	Minimum Spanning Tree	O(E log V)	O(V + E)
Kruskal	Minimum Spanning Tree	O(E log E)	O(V + E)
Dijkstra	Shortest Path	O((V + E) log V)	O(V + E)
🔬 DAA Concepts Demonstrated

This project demonstrates several important DAA concepts.

Graph
G = (V, E)

Where:

V = Data Centers

E = Network Connections

Each edge contains a weight representing network cost.

Weighted Graph

Example:

SURAT ──15── MUMBAI

Here:

SURAT = Vertex
MUMBAI = Vertex
15 = Edge Weight
Minimum Spanning Tree

For a connected graph with V vertices:

MST contains V - 1 edges

The objective is:

Minimize Total Edge Weight
Shortest Path

Dijkstra minimizes the total cost between:

Source → Destination
📊 Performance Measurement

The application measures algorithm execution time using:

time.perf_counter()

Example:

Prim Execution Time      : 0.00001234 seconds

Kruskal Execution Time  : 0.00000987 seconds

Dijkstra Execution Time : 0.00000621 seconds

Actual execution times depend on the computer, Python version, graph size, and network structure. The application measures the values during execution rather than using fixed benchmark values.

🎓 Project Relevance to DAA

This project is designed to demonstrate practical applications of Design and Analysis of Algorithms.

Problem

Cloud data centers require efficient network connections while minimizing infrastructure cost.

Algorithmic Solution

Graph algorithms can optimize the network.

Network
   ↓
Weighted Graph
   ↓
MST Algorithms
   ↓
Minimum Network Cost

For point-to-point communication:

Source
   ↓
Dijkstra
   ↓
Shortest Path
   ↓
Minimum Route Cost
🌐 Real-World Applications

The concepts implemented in this project can be applied to:

Cloud data center networking
Internet infrastructure
Telecom networks
Computer networks
Road network optimization
Fiber-optic network design
Electrical power networks
Transportation systems
Distributed systems
Infrastructure planning
🔮 Future Enhancements

The project can be extended with:

1. Large-Scale Network Generation

Automatically generate networks containing:

10 nodes
50 nodes
100 nodes
500 nodes
1000 nodes
2. Algorithm Performance Graph

Generate graphs comparing:

Network Size vs Execution Time

for:

Prim
Kruskal
Dijkstra
3. CSV Dataset Support

Allow users to upload network data through CSV files.

Example:

Source,Destination,Cost
SURAT,MUMBAI,15
SURAT,DELHI,20
DELHI,MUMBAI,25
4. Multiple Network Scenarios

Support different network types:

Small network
Medium network
Large network
Random network
Custom network
5. Advanced Visualization

Add:

Node status
Network failures
Connection failures
Cost heatmaps
Algorithm animation
Interactive edge editing
6. Database Integration

Store:

Network configurations
Algorithm results
Performance data
Previous optimization reports
🚀 Future Scope

The system can eventually become a complete Cloud Network Planning and Optimization Platform.

Possible advanced features include:

Cloud Network
      ↓
Real-Time Monitoring
      ↓
Network Optimization
      ↓
Failure Detection
      ↓
Automatic Route Optimization
      ↓
Cost Optimization
📌 Limitations

The current version has some limitations:

Network connections use manually entered costs.
Dijkstra supports only non-negative edge costs.
The network must be connected for a complete MST.
Performance measurements on very small graphs can be affected by system overhead.
The current application stores network data temporarily in browser memory.
No database is currently connected.
🧪 Example Test Case
Input
Data Centers:

SURAT
MUMBAI
DELHI

Connections:

SURAT → MUMBAI = 15
SURAT → DELHI = 20
DELHI → MUMBAI = 25
Expected MST
SURAT → MUMBAI = 15
SURAT → DELHI = 20
Expected Minimum Cost
35
Shortest Path

For:

Source      = MUMBAI
Destination = DELHI

Expected:

Path = MUMBAI → DELHI
Cost = 25
Hops = 1
📸 Project Screenshots

Add screenshots of your application here after uploading them to GitHub.

Example:

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Network Visualization

![Network Graph](screenshots/network.png)

## Shortest Path Analysis

![Shortest Path](screenshots/shortest-path.png)
👨‍💻 Author

Mistry Ved jignesh

DAA Project
Cloud Data Center Network Optimizer

📄 License

This project is created for educational and academic purposes.

You are free to modify and extend the project for learning and academic use.

⭐ Conclusion

The Cloud Data Center Network Optimizer demonstrates how graph algorithms can solve practical network optimization problems.

The project combines:

Graph Theory
      +
Prim's Algorithm
      +
Kruskal's Algorithm
      +
Dijkstra's Algorithm
      +
Python
      +
Flask
      +
JavaScript
      +
Interactive Visualization

The system can determine the minimum-cost network infrastructure using MST algorithms and find the minimum-cost route between two data centers using Dijkstra's algorithm.

It provides a practical demonstration of how Design and Analysis of Algorithms can be applied to real-world cloud networking problems.


### Recommended GitHub structure

I recommend keeping your repository like this:

```text
Network_Design_Optimization/
│
├── README.md
├── app.py
├── algorithms.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── script.js
│   └── style.css
│
├── screenshots/
│   ├── dashboard.png
│   ├── network.png
│   └── shortest-path.png
│
└── .gitignore
