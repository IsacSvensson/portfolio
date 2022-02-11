"""
Module containing all routes for the REST-API
"""

from flask import request, current_app as app, send_from_directory
from flask.globals import current_app
from flask.wrappers import Response
from .algorithms import Node, Dijkstra, NodeEncoder, aStar

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route('/dijkstra', methods=['POST'])
def dijkstras_algorithm():
    """
    
    """
    matrix = request.get_json()
    grid = []
    start = None
    for row in matrix:
        grid.append([])
        for node in row:
            grid[-1].append(Node(node))
            if node['isStart']:
                start = grid[-1][-1]
            elif node['isEnd']:
                end = grid[-1][-1]

    d = Dijkstra(grid)

    visitedNodes = d.dijkstra(start, end)
    backTracked = d.getNodesInShortestPathOrder(end) 

    response = {"visitedNodesInOrder": [], "shortestPath": []}
    
    for n in visitedNodes:
        response['visitedNodesInOrder'].append(NodeEncoder().encode(n.returnDict()))

    for n in backTracked:
        response['shortestPath'].append(NodeEncoder().encode(n.returnDict()))

    print(response)

    return response

@app.route('/a_star', methods=['POST'])
def a_star_algorithm():
    """
    
    """
    print("called")
    matrix = request.get_json()
    grid = []
    start = None
    for row in matrix:
        grid.append([])
        for node in row:
            grid[-1].append(Node(node))
            if node['isStart']:
                start = grid[-1][-1]
            elif node['isEnd']:
                end = grid[-1][-1]

    a = aStar(grid, start, end)
    visitedNodes = a.run()
    visitedNodes.append(end)
    backTracked = a.getNodesInShortestPathOrder()
    response = {"visitedNodesInOrder": [], "shortestPath": []}

    for n in visitedNodes:
        response['visitedNodesInOrder'].append(NodeEncoder().encode(n.returnDict()))

    for n in backTracked:
        response['shortestPath'].append(NodeEncoder().encode(n.returnDict()))

    return response
