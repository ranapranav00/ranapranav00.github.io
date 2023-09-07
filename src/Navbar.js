import { Component } from "react";
import "./styles/navbar.css";

class Navbar extends Component {
    state = {clicked: false};
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render() {
    return (
        <>
        <nav>
            <img src="favicon.ico" alt="" height={40}/> 
            <div>
                <ul id='navbar' className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/skills">Skills</a></li>
                    <li><a href="/projects">Projects</a></li>
                </ul>
            </div>
            <div id="mobile" onClick={this.handleClick}>
                <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
        </nav>
        </>
    )
}
}

export default Navbar;