import React from "react";
import Navbar from "../Components/Navbar";
import Canvas from "../Components/CanvasSnake"
import { BrowserRouter as Router } from "react-router-dom";

function Home() {
    return (
        <div>
            <Router>
                <Navbar />
            </Router>

            <Canvas />
        </div>
    );
}

export default Home;
