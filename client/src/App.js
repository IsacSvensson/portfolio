import { useState } from 'react';
import Container from './components/Container'
import InfoBar from './components/InfoBar'
import NavBar from './components/NavBar'
import OptionsRow from './components/OptionsRow'
import UseWindowDimensions from './components/UseWindowDimensions'


function App() {
  const [mousePressed, setMouse] = useState(false)
  
  const createNode = (id, col, row) => {
    const { height, width } = UseWindowDimensions()
    let START_NODE_ROW;
    let END_NODE_ROW;
    let START_NODE_COL;
    let END_NODE_COL;

    if (height/40 < 20){
      START_NODE_ROW = 0
      END_NODE_ROW = Math.floor(height/40)-1
    } else {
      START_NODE_ROW = Math.floor(height/40/2)
      END_NODE_ROW = Math.floor(height/40/2)
    }
    if (width/30 < 20){
      START_NODE_COL = 0
      END_NODE_COL = Math.floor(width/30) -1
    } else {
      START_NODE_COL = 4
      END_NODE_COL = Math.floor(width/30)-5
    }
    
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
      isWeight: false,
    };
  };
  const populateGrid = () => {
    const { height, width } = UseWindowDimensions()

    var grid = []
    var id = 0;
    for (let row = 0; row < Math.floor(height/40); row++) {
      grid[row] = []
      for (let col = 0; col < Math.floor(width/30); col++) {
        grid[row].push(createNode(id++, col, row))   
      }
    }
    return grid
  }
  
  const [matrix, setMatrix] = useState(populateGrid());
  const [animationSpeed, setAnimationSpeed] = useState(50)

  const animate = (visitedNodes, shortestPath) => {
    animateVisitedNodes(visitedNodes, shortestPath)
  }

  function animateVisitedNodes (visitedNodes, shortestPath) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length){
          setTimeout(() => {
            animateShortestPath(shortestPath)
          }, (101-animationSpeed)*i);
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
        }, (101-animationSpeed)*i);
    }
    resolve(shortestPath);
    })
  }

  const animateShortestPath = (shortestPath) => {
    let node;
    for (let j = 0; j < shortestPath.length; j++){
      // eslint-disable-next-line
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
          }, j*(101-animationSpeed));
      }
  }
  


  const toggleWall = (rowIdx, colIdx) => {
    resetGrid()
    const node = matrix[rowIdx][colIdx]
    if (!(node.isStart | node.isEnd)){
      setMatrix(matrix.map((row) => 
        row.map((node) => 
        (node.row === rowIdx) & (node.col === colIdx) ? 
        {...node, isWeight: false, isWall: !node.isWall } : node)))
      }
  }

  const setAttribute = (rowIdx, colIdx, value) => {
    resetGrid()
    const node = matrix[rowIdx][colIdx]

    if (node.isStart | node.isStart)
      return
    
      if (value === 'start')
        setMatrix(matrix.map((row) => 
          row.map((node) => 
          (node.row === rowIdx) & (node.col === colIdx) ? 
          {...node, isWall: false, isStart: true } : node.isStart ? {...node, isStart:false} : node)))
      else if (value === 'end')
        setMatrix(matrix.map((row) => 
          row.map((node) => 
          (node.row === rowIdx) & (node.col === colIdx) ? 
          {...node, isWall: false, isEnd: true } : node.isEnd ? {...node, isEnd:false} : node)))
      else if (value === 'weight')
        setMatrix(matrix.map((row) => 
          row.map((node) => 
          (node.row === rowIdx) & (node.col === colIdx) ? 
          {...node, isWall: false, isWeight: true } : node)))
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
    resetGrid()
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
      <OptionsRow reset={resetGrid} visualize={visualize} clear={clearGrid} animationSpeed={animationSpeed} setAnimationSpeed={setAnimationSpeed}/>
      <InfoBar/>
      <Container 
        grid={matrix} 
        mouseDown={handleMouseDown} 
        mouseUp={handleMouseUp}
        mouseEnter={handleMouseEnter}
        setAttribute={setAttribute}
      />
    </div>
  );
}

export default App;
