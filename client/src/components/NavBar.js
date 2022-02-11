function NavBar({algo , setAlgo}) {
    let d_class = "link active", a_class = "link";
    if (algo === "/dijkstra"){
        d_class = "link active"
        a_class = "link"
    }
    else if (algo === "/a_star"){
        a_class = "link active"
        d_class = "link"
    }
    return (
        <nav className="navbar">
            <h2 className="title">Isac Svensson</h2>
            <p className={d_class} onClick={() => {setAlgo("/dijkstra")}}>Dijkstras Algorithm</p>
            <p className={a_class} onClick={() => {setAlgo("/a_star")}}>A* Search</p>
        </nav>
    )
}

export default NavBar
