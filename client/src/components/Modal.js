import { useState } from 'react'
import Button from './Button'

function Modal() {
    const [showModal, setVisability] = useState({visability: true, slide:0})

    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    
    const myAge = calculateAge(new Date('1991-09-18'))

    const guideContent = [
            [
                <h1 className="guide-txt">Welcome to Isac Svenssons Portfolio</h1>,
                <h3 className="guide-txt">I am a {myAge} year old student at Blekinge Institution of Technology studying Software Engineering.</h3>,
                <p className="guide-txt">When I'm not studying I'm building new stuff, like <a href="https://github.com/IsacSvensson/portfolio">this webapp</a> visualizing shortest path algorithms, a <a target="_blank" rel="noopener noreferrer" href="https://github.com/IsacSvensson/Ascii-cam">webcam to ascii-art converter</a> or my own programming language, <a target="_blank" rel="noopener noreferrer" href="https://github.com/IsacSvensson/six10">Six10</a>.</p>,
                <p className="guide-txt">My passion lies in problem solving and backend development, even though frontend development has grown on me recently. 
                Before starting BTH I worked at Telenor at the Professional Services department and before Telenor I worked in sales.
                This experience has made me fully comfortable to have direct contact with customers, handling problems and taking responsibilty.</p>,
                <h4 className="guide-txt">In this project I built a GUI in ReactJS that visualize the process of finding the shortest path in a grid of nodes with different algorithms.</h4>,
                <p className="guide-txt">Click the Next-button to get started with the tutorial for the project</p>,
                <img src="pin.png" alt="two pins and a path drawn between them" className="guide-img"></img>
            ],
            [
                <h1 className="guide-txt">What is a shortest path algorithm?</h1>,
                <br/>,
                <p className="guide-txt">In graph theory, the shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the weights of its constituent edges is minimized.<a href="https://en.wikipedia.org/wiki/Shortest_path_problem" className="reference">[Wikipedia]</a></p>,
                <p className="guide-txt">Applications for the shortest path algorithms are route planning in apps like <a target="_blank" rel="noreferrer" href="https://maps.google.se">Google Maps</a>, finding relevant contact suggestions in Social Networks and IP-routing to mention some.</p>,
                <p className="guide-txt">In my implementation of the algorithm, the nodes are weighted and no explicit edges exist. Instead, entering a new node adds the weight, simulating directed edges. A standard node has the weight 1 while the weighted node has a weight of 5.</p>,
                <img src="graph.png" alt="a directed weighted graph" className="guide-img"></img>
            ],
            [
                <h1 className="guide-txt">Adding walls and weights</h1>,
                <br/>,
                <p className="guide-txt">Click on the grid to add walls. Click on the grid while pressing '<b>w</b>' on your keyboard to add weights.</p>,
                <p className="guide-txt">Walls are impenetrable, i.e. a path can not pass through them. Weights however, are not impenetrable. They are simply more 'expensive' to pass through. In this implementation a weigthed node has the same cost as passing five regular nodes.</p>,
                <br/>,
                <img src="draw-animation.gif" alt="animation showing how to add walls" className="guide-img"></img>
            ],
        ]

    const close = () => setVisability({visability: false, slide:0})
    const nextSlide = () => setVisability({visability: true, slide:showModal.slide+1})
    const previousSlide = () => setVisability({visability: true, slide:showModal.slide-1})

    let buttons = [<Button onClick={close} text="Close"/>]

    if (showModal.slide !== guideContent.length-1){
        buttons.push(<Button onClick={nextSlide} text="Next" align="right"/>)
    } else {
        buttons.push(<Button onClick={close} text="Finish" align="right"/>)
    }
    if (showModal.slide !== 0){
        buttons.push(<Button onClick={previousSlide} text="Previous" align="right"/>)
    }

    const style = showModal.visability ? {visibility: "visible",} : {visibility: 'hidden'}
    return (
        <div className="modal" style={style}>
            <div className="modal-content">
                {guideContent[showModal.slide]}
            </div>
            {buttons}
        </div>
    )
}

export default Modal
