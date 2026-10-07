from flask import Flask, render_template, request, jsonify

from algorithms import (
    prim,
    kruskal,
    dijkstra
)


app = Flask(__name__)


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return render_template(
        "index.html"
    )


# =========================================================
# NETWORK OPTIMIZATION
# =========================================================

@app.route(
    "/optimize",
    methods=["POST"]
)
def optimize():

    data = request.get_json()

    nodes = data.get(
        "nodes",
        []
    )

    connections = data.get(
        "connections",
        []
    )

    path_source = data.get(
        "pathSource"
    )

    path_destination = data.get(
        "pathDestination"
    )


    # =====================================================
    # VALIDATION
    # =====================================================

    if len(nodes) < 2:

        return jsonify({

            "error":
                "At least two data centers are required."

        }), 400


    # =====================================================
    # CREATE GRAPH
    # =====================================================

    graph = {}

    for node in nodes:

        graph[node] = []


    for connection in connections:

        source = connection[0]

        destination = connection[1]

        cost = int(connection[2])


        # Validate nodes
        if (
            source not in graph
            or destination not in graph
        ):

            return jsonify({

                "error":
                    "Invalid data center in connection."

            }), 400


        graph[source].append(
            (
                destination,
                cost
            )
        )

        graph[destination].append(
            (
                source,
                cost
            )
        )


    # =====================================================
    # PRIM
    # =====================================================

    prim_mst, prim_cost, prim_time = prim(
        graph,
        nodes[0]
    )


    # =====================================================
    # KRUSKAL
    # =====================================================

    kruskal_mst, kruskal_cost, kruskal_time = kruskal(
        nodes,
        connections
    )


    # =====================================================
    # DIJKSTRA
    # =====================================================

    shortest_path = []

    shortest_cost = None

    shortest_time = None


    if (
        path_source
        and path_destination
    ):

        if (
            path_source in graph
            and path_destination in graph
        ):

            (
                shortest_path,
                shortest_cost,
                shortest_time
            ) = dijkstra(
                graph,
                path_source,
                path_destination
            )


    # =====================================================
    # SHORTEST PATH HOPS
    # =====================================================

    shortest_hops = 0

    if shortest_path:

        shortest_hops = (
            len(shortest_path) - 1
        )


    # =====================================================
    # RETURN RESULTS
    # =====================================================

    return jsonify({

        "nodes": nodes,

        "connections": connections,


        "prim": {

            "edges": prim_mst,

            "cost": prim_cost,

            "time": prim_time

        },


        "kruskal": {

            "edges": kruskal_mst,

            "cost": kruskal_cost,

            "time": kruskal_time

        },


        "shortestPath": {

            "path": shortest_path,

            "cost": shortest_cost,

            "time": shortest_time,

            "hops": shortest_hops,

            "source": path_source,

            "destination": path_destination

        }

    })


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )