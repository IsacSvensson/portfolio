import { useState } from 'react';
import Container from './components/Container'
import InfoBar from './components/InfoBar'
import NavBar from './components/NavBar'
import OptionsRow from './components/OptionsRow'

const START_NODE_ROW = 15
const START_NODE_COL = 9
const END_NODE_ROW =15
const END_NODE_COL = 65

function App() {
  const [mousePressed, setMouse] = useState(false)
  
  const createNode = (id, col, row) => {
    return {
      id,
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  const populateGrid = () => {
    var grid = []
    var id = 0;
    for (let row = 0; row < 30; row++) {
      grid[row] = []
      for (let col = 0; col < 75; col++) {
        grid[row].push(createNode(id++, col, row))   
      }
    }
    return grid
  }
  
  const [matrix, setMatrix] = useState(populateGrid());

  const animate = (visitedNodes, shortestPath) => {
    animateVisitedNodes(visitedNodes, shortestPath)
  }

  function animateVisitedNodes (visitedNodes, shortestPath) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length){
          setTimeout(() => {
            animateShortestPath(shortestPath)
          }, i*10);
          return 
        }
        setTimeout(() => {
          if (i !== 0){
            const previousNode = JSON.parse(visitedNodes[i-1]);
            if (i === 1)
              document.getElementById(`node${previousNode.id}`).className = 'node start node-searched';
          }
          const node = JSON.parse(visitedNodes[i]);
          if (i === visitedNodes.length-1)
              document.getElementById(`node${node.id}`).className = 'node end node-searched';
          else
            document.getElementById(`node${node.id}`).className =
            'node node-searched';
        }, 10 * i);
    }
    resolve(shortestPath);
    })
  }

  const animateShortestPath = (shortestPath) => {
    let node;
    for (let j = 0; j < shortestPath.length; j++){
        setTimeout(() => {
          if (j !== 0){
            const previousNode = JSON.parse(shortestPath[j-1]);
            if (j === 1)
              document.getElementById(`node${previousNode.id}`).className = 'node start node-visited';
            else
              document.getElementById(`node${previousNode.id}`).className = 'node node-visited';
          }
          node = JSON.parse(shortestPath[j]);
          if (j === shortestPath.length-1)
              document.getElementById(`node${node.id}`).className = 'node end node-visited';
          else
            document.getElementById(`node${node.id}`).className =
            'node node-visited';
          }, j*10);
      }
  }
  


  const toggleWall = (rowIdx, colIdx) => {
    const node = matrix[rowIdx][colIdx]
    if (!(node.isStart | node.isEnd)){
      setMatrix(matrix.map((row) => 
        row.map((node) => 
          (node.row === rowIdx) & (node.col === colIdx) ? 
            {...node, isWall: !node.isWall } : node)))
      }
  }

  const handleMouseDown = (node) => {
    toggleWall(node.row, node.col)
    setMouse(true)
  }

  const handleMouseUp = (node) => {
    setMouse(false)
  }

  const handleMouseEnter = (node) => {
    if (!mousePressed)
      return
    toggleWall(node.row, node.col)    
  }

  const resetGrid = () => {
    for (let i = 0; i< matrix.length; i++){
      for (let j = 0; j<matrix[i].length ;j++){
        const node = matrix[i][j]
        var classVar = "node"
        if (node.isStart){
          classVar = "node start"
        } else if (node.isEnd){
          classVar = "node end"
        } else if (node.isWall){
          classVar = "node wall"
        }
        document.getElementById(`node${node.id}`).className = classVar;}
      }
  }

  const clearGrid = () => {
    for (let i = 0; i< matrix.length; i++){
      for (let j = 0; j<matrix[i].length ;j++){
        const node = matrix[i][j]
        var classVar = "node"
        if (node.isStart){
          classVar = "node start"
        } else if (node.isEnd){
          classVar = "node end"
        } else if (node.isWall){
          classVar = "node wall"
        }
        document.getElementById(`node${node.id}`).className = classVar;}
      }
      setMatrix(populateGrid())
  }

  async function visualize() {
    const url = process.env.PUBLIC_URL + "/dijkstra"
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(matrix) 
    });
    response.json().then(data => {
      animate(data.visitedNodesInOrder, data.shortestPath)
    })
  }

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <NavBar/>
      <OptionsRow reset={resetGrid} visualize={visualize} clear={clearGrid}/>
      <InfoBar/>
      <Container 
        grid={matrix} 
        mouseDown={handleMouseDown} 
        mouseUp={handleMouseUp}
        mouseEnter={handleMouseEnter}
      />
    </div>
  );
}

export default App;
