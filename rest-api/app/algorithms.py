"""
This module will store all implemented algorithms.
"""

from flask.json import jsonify
import json
from json import JSONEncoder

class NodeEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__

class Node:
    def __init__(self, node):
        self.id = node['id']
        self.col = node['col']
        self.row = node['row']
        self.isStart = node['isStart']
        self.isEnd = node['isEnd']
        self.distance = node['distance'] if node['distance'] else float('inf')
        self.isVisited = node['isVisited']
        self.isWall = node['isWall']
        self.previousNode = node['previousNode']
    def returnDict(self):
        return {
            "id":self.id,
            "col":self.col,
            "row":self.row,
            "isStart":self.isStart,
            "isEnd":self.isEnd,
            "distance":self.distance,
            "isVisited":self.isVisited,
            "isWall":self.isWall,
            "previousNode":self.previousNode.id if self.previousNode else None,
        }
    def __lt__(self, other):
        return self.distance < other.distance


class Dijkstra:
    """
    Performs Dijkstra's algorithm; returns *all* nodes in the order
    in which they were visited. Also makes nodes point back to their
    previous node, effectively allowing us to compute the shortest path
    by backtracking from the finish node.
    """
    def __init__(self, grid):
        self.grid = grid

    def getAllNodes(self):
        nodes = []
        for row in self.grid:
            for node in row:
                nodes.append(node)

        return nodes

    def sortNodesByDistance(self, unvisitedNodes):
        unvisitedNodes = sorted(unvisitedNodes)
        return unvisitedNodes

    def updateUnvisitedNeighbors(self, node):
        unvisitedNeighbors = self.getUnvisitedNeighbors(node)
        for neighbor in unvisitedNeighbors:
            if node.distance == float('inf'):
                neighbor.distance = 1
            else:
                neighbor.distance = node.distance + 1
            neighbor.previousNode = node

    def getUnvisitedNeighbors(self, node):
        neighbors = []
        col = node.col
        row = node.row

        if row > 0: 
            neighbors.append(self.grid[row - 1][col])
        if row < (len(self.grid) - 1): 
            neighbors.append(self.grid[row + 1][col])
        if col > 0:
            neighbors.append(self.grid[row][col - 1])
        if col < (len(self.grid[0]) - 1):
            neighbors.append(self.grid[row][col + 1])

        toReturn = []
        for neighbor in neighbors:
            if not neighbor.isVisited:
                toReturn.append(neighbor)
        return toReturn

    def getNodesInShortestPathOrder(self, finishNode):
        """
        Backtracks from the finishNode to find the shortest path.
        Only works when called *after* the dijkstra method above.
        """
        nodesInShortestPathOrder = []
        currentNode = finishNode
        while currentNode:
            nodesInShortestPathOrder.insert(0, currentNode)
            currentNode = currentNode.previousNode
        
        return nodesInShortestPathOrder

    def dijkstra(self, startNode, finishNode):
        visitedNodesInOrder = []
        startNode.distance = 0
        unvisitedNodes = self.getAllNodes()

        self.updateUnvisitedNeighbors(startNode)

        while (unvisitedNodes.__len__()):
            unvisitedNodes = self.sortNodesByDistance(unvisitedNodes)
            closestNode = unvisitedNodes[0]
            unvisitedNodes.remove(closestNode)

            # If we encounter a wall, we skip it.
            if closestNode.isWall:
                continue
            
            # If the closest node is at a distance of infinity,
            # we must be trapped and should therefore stop.
            if closestNode.distance == float('inf'):
                return visitedNodesInOrder
            
            closestNode.isVisited = True
            visitedNodesInOrder.append(closestNode)
            if closestNode == finishNode: 
                return visitedNodesInOrder
            self.updateUnvisitedNeighbors(closestNode)