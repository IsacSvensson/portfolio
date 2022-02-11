"""
This module will store all implemented algorithms.
"""

from math import sqrt
from os import close, curdir, stat_result
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
        self.isWeight = node['isWeight']
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

    def distanceTo(self, node): 
        dx = abs(node.row - self.row)
        dy = abs(node.col - self.col)
        return (dx + dy) + (sqrt(2) - 2) * min(dx, dy)
        return sqrt((node.row - self.row)**2 + (node.col - self.col)**2)


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
            weight = 10 if neighbor.isWeight else 1
            if node.distance + weight < neighbor.distance:
                dx = node.row - neighbor.row
                dy = node.col - neighbor.col
                neighbor.distance = node.distance + weight*sqrt(dx**2+dy**2)
                neighbor.previousNode = node

    def getUnvisitedNeighbors(self, node):
        neighbors = []
        col = node.col
        row = node.row

        if node.row > 0:
            if not self.grid[node.row-1][node.col].isWall:
                neighbors.append(self.grid[node.row-1][node.col])
            if node.col < len(self.grid[0])-1:
                if not self.grid[node.row-1][node.col+1].isWall:
                    neighbors.append(self.grid[node.row-1][node.col+1])
            if node.col > 0:
                if not self.grid[node.row-1][node.col-1].isWall:
                    neighbors.append(self.grid[node.row-1][node.col-1])
        if node.row < len(self.grid)-1:
            if not self.grid[node.row+1][node.col].isWall:
                neighbors.append(self.grid[node.row+1][node.col])
            if node.col < len(self.grid[0])-1:
                if not self.grid[node.row+1][node.col+1].isWall:
                    neighbors.append(self.grid[node.row+1][node.col+1])
            if node.col > 0:
                if not self.grid[node.row+1][node.col-1].isWall:
                    neighbors.append(self.grid[node.row+1][node.col-1])
        if node.col > 0:
            if not self.grid[node.row][node.col-1].isWall:
                neighbors.append(self.grid[node.row][node.col-1])
        if node.col < len(self.grid[0])-1:
            if not self.grid[node.row][node.col+1].isWall:
                neighbors.append(self.grid[node.row][node.col+1])

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
            
            # If the closest node is at a distance'of inf'nity,
            # we must be trapped and should therefore stop.
            if closestNode.distance == float('inf'):
                return visitedNodesInOrder
            
            closestNode.isVisited = True
            visitedNodesInOrder.append(closestNode)
            if closestNode == finishNode: 
                return visitedNodesInOrder
            self.updateUnvisitedNeighbors(closestNode)
    
class aStar:
    def __init__(self, grid, start, end) -> None:
        self.grid = grid
        self.openList = [start]
        self.cameFrom = dict()
        self.gScore = dict()
        self.fScore = dict()
        self.closed = []
        self.start = start
        self.goal = end
        self.currentNode = None

        for row in self.grid:
            for cell in row:
                cell.distance = 0
                self.gScore[cell.id] = float('inf')
                self.fScore[cell.id] = float('inf')

    def findNextNode(self):
        result = None
        for node in self.openList:
            if result is None: 
                result = node
                continue
            if self.fScore[node.id] < self.fScore[result.id]:
                result = node
        
        self.currentNode = result

    def closeNode(self, node):
        node.isVisited = True
        self.closed.append(node)
        self.openList.remove(node)

    def getAdjaceNodes(self, node):
        adjacent = []
        if node.row > 0:
            if not self.grid[node.row-1][node.col].isWall:
                adjacent.append(self.grid[node.row-1][node.col])
            if node.col < len(self.grid[0])-1:
                if not self.grid[node.row-1][node.col+1].isWall:
                    adjacent.append(self.grid[node.row-1][node.col+1])
            if node.col > 0:
                if not self.grid[node.row-1][node.col-1].isWall:
                    adjacent.append(self.grid[node.row-1][node.col-1])
        if node.row < len(self.grid)-1:
            if not self.grid[node.row+1][node.col].isWall:
                adjacent.append(self.grid[node.row+1][node.col])
            if node.col < len(self.grid[0])-1:
                if not self.grid[node.row+1][node.col+1].isWall:
                    adjacent.append(self.grid[node.row+1][node.col+1])
            if node.col > 0:
                if not self.grid[node.row+1][node.col-1].isWall:
                    adjacent.append(self.grid[node.row+1][node.col-1])
        if node.col > 0:
            if not self.grid[node.row][node.col-1].isWall:
                adjacent.append(self.grid[node.row][node.col-1])
        if node.col < len(self.grid[0])-1:
            if not self.grid[node.row][node.col+1].isWall:
                adjacent.append(self.grid[node.row][node.col+1])
        
        return adjacent

    def getNodesInShortestPathOrder(self):
        """
        Backtracks from the finishNode to find the shortest path.
        Only works when called *after* the dijkstra method above.
        """
        current = self.goal
        total_path = [current]
        while current.id in self.cameFrom.keys():
            current = self.cameFrom[current.id]
            total_path.insert(0,current)
        return total_path
    
    def run(self):
        self.gScore[self.start.id] = 0
        self.fScore[self.start.id] = self.start.distanceTo(self.goal)

        while self.openList:
            self.findNextNode()
            if self.currentNode == self.goal:
                return self.closed
            self.closeNode(self.currentNode)

            for neighbor in self.getAdjaceNodes(self.currentNode):
                dx = self.currentNode.row - neighbor.row
                dy = self.currentNode.col - neighbor.col
                tentative_gScore = self.gScore[self.currentNode.id] + sqrt(dx**2+dy**2)*(10 if neighbor.isWeight else 1)
                if tentative_gScore < self.gScore[neighbor.id]:
                    self.cameFrom[neighbor.id] = self.currentNode
                    self.gScore[neighbor.id] = tentative_gScore
                    self.fScore[neighbor.id] = self.gScore[neighbor.id] + neighbor.distanceTo(self.goal)
                    if neighbor not in self.openList:
                        self.openList.insert(0, neighbor)
        return False

