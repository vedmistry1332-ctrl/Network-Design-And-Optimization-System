import heapq
import time


# =========================================================
# PRIM'S ALGORITHM
# =========================================================

def prim(graph, start):

    start_time = time.perf_counter()

    visited = set()
    mst = []
    total_cost = 0

    priority_queue = []

    visited.add(start)

    # Add all edges connected to starting node
    for destination, cost in graph[start]:

        heapq.heappush(
            priority_queue,
            (cost, start, destination)
        )

    while priority_queue and len(visited) < len(graph):

        cost, source, destination = heapq.heappop(
            priority_queue
        )

        # Ignore already visited nodes
        if destination in visited:
            continue

        # Add destination to visited
        visited.add(destination)

        # Add edge to MST
        mst.append(
            (source, destination, cost)
        )

        total_cost += cost

        # Add new edges
        for next_node, next_cost in graph[destination]:

            if next_node not in visited:

                heapq.heappush(
                    priority_queue,
                    (
                        next_cost,
                        destination,
                        next_node
                    )
                )

    end_time = time.perf_counter()

    execution_time = end_time - start_time

    return mst, total_cost, execution_time


# =========================================================
# UNION FIND
# =========================================================

class UnionFind:

    def __init__(self, nodes):

        self.parent = {}
        self.rank = {}

        for node in nodes:

            self.parent[node] = node
            self.rank[node] = 0


    def find(self, node):

        if self.parent[node] != node:

            self.parent[node] = self.find(
                self.parent[node]
            )

        return self.parent[node]


    def union(self, node1, node2):

        root1 = self.find(node1)
        root2 = self.find(node2)

        # Same root means cycle
        if root1 == root2:

            return False

        # Union by rank
        if self.rank[root1] < self.rank[root2]:

            self.parent[root1] = root2

        elif self.rank[root1] > self.rank[root2]:

            self.parent[root2] = root1

        else:

            self.parent[root2] = root1

            self.rank[root1] += 1

        return True


# =========================================================
# KRUSKAL'S ALGORITHM
# =========================================================

def kruskal(nodes, connections):

    start_time = time.perf_counter()

    # Sort connections by cost
    sorted_edges = sorted(
        connections,
        key=lambda edge: edge[2]
    )

    union_find = UnionFind(nodes)

    mst = []

    total_cost = 0

    for source, destination, cost in sorted_edges:

        # Add edge if it doesn't create a cycle
        if union_find.union(
            source,
            destination
        ):

            mst.append(
                (source, destination, cost)
            )

            total_cost += cost

        # MST requires V - 1 edges
        if len(mst) == len(nodes) - 1:

            break

    end_time = time.perf_counter()

    execution_time = end_time - start_time

    return mst, total_cost, execution_time


# =========================================================
# DIJKSTRA'S SHORTEST PATH ALGORITHM
# =========================================================

def dijkstra(graph, source, destination):

    start_time = time.perf_counter()

    # Distance from source to every node
    distances = {

        node: float("inf")

        for node in graph
    }

    # Previous node used to reconstruct path
    previous = {

        node: None

        for node in graph
    }

    # Source distance is zero
    distances[source] = 0

    # Priority queue
    priority_queue = [
        (0, source)
    ]

    while priority_queue:

        current_distance, current_node = heapq.heappop(
            priority_queue
        )

        # Ignore outdated entries
        if current_distance > distances[current_node]:

            continue

        # Destination reached
        if current_node == destination:

            break

        # Check all neighbours
        for neighbour, cost in graph[current_node]:

            new_distance = (
                current_distance + cost
            )

            # Found shorter route
            if new_distance < distances[neighbour]:

                distances[neighbour] = new_distance

                previous[neighbour] = current_node

                heapq.heappush(
                    priority_queue,
                    (
                        new_distance,
                        neighbour
                    )
                )

    # =====================================================
    # RECONSTRUCT PATH
    # =====================================================

    path = []

    current = destination

    while current is not None:

        path.append(current)

        current = previous[current]

    path.reverse()

    # No path exists
    if not path or path[0] != source:

        path = []

        total_cost = None

    else:

        total_cost = distances[destination]

    end_time = time.perf_counter()

    execution_time = (
        end_time - start_time
    )

    return (
        path,
        total_cost,
        execution_time
    )