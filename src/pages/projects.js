import React from "react";
import "../styles/projects.css";
import { GitHub } from "@mui/icons-material";
import { Button } from "@mui/material";

function Projects() {
    return(
        <div id="projects">
                <h1 id="proj-header">Projects</h1>
            <div id="grid">
                <div id="img-container">
                    <img id="images" src="./images/spotify-logo.png" alt="msw-img" xmlns="https://github.com/ranapranav00/My-Spotify-Wrapped"/>
                </div>           
                <div id="desc-container">
                    <h2 id="title">MySpotifyWrapped [WIP]</h2>
                    <p id="about">Want a break from the year long wait? If you tap now to go to MySpotifyWrapped,
                    you'll recieve unlimited access to your top listened to Artists and Tracks.
                    Using Python Flask and the Spotify API, retrieves user's spotify authorization token to access listening data for 
                    tracks and artists. Using a React frontend, displays users top listened to artists or tracks no matter the time of year.</p>
                    <Button id="gh-link" href="https://github.com/ranapranav00/My-Spotify-Wrapped"><GitHub id="gh-logo" className="icon"/></Button>
                </div>
                <div id="desc-container">
                    <h2 id="left-title">Personal Portfolio</h2>
                    <p id="left-about">This is my personal portfolio website. Utilized JavaScript, HTML, and React to create and connect
                    components including navbar and pages. Styled website using CSS and ensured that it is reactive to mobile screens as 
                    well. Deployed final product using GitHub Pages.</p>
                    <Button id="left-gh-link" href="https://github.com/ranapranav00/ranapranav00.github.io"><GitHub id="gh-logo" className="icon"/></Button>
                </div>
                <div id="right-img-container">
                    <img id="images" src="./images/portfolio-ss.png" alt="portfolio-img"/>
                </div>
                <div id="img-container">
                    <img id="images" src="./images/WeekPlan.png" alt="weekplan-img"/>
                </div>
                <div id="desc-container">
                    <h2 id="title">WeekPlan</h2>
                    <p id="about">WeekPlan is a custom calendar application made using JavaFX. Using this calendar app, 
                    users are able to set a maximum amount of tasks and events per day. Users can create a new week during
                    every use, or load an existing week which can even be locked with a password. WeekPlan also has several 
                    other features including a splash screen, customizable week starts, event/task categorization, event/task
                    visual customizability, editing and deleting entries, and more.</p>
                    <Button id="gh-link" href="https://github.com/ranapranav00/WeekPlan"><GitHub id="gh-logo" className="icon"/></Button>
                </div>
                <div id="desc-container">
                    <h2 id="left-title">BattleShip</h2>
                    <p id="left-about">This version of BattleShip is a game played in the terminal where players can shoot as many shots as ships they have alive per round.
                    The game can be played between two players, a player and a bot, or two bots. It also supports gameplay on a custom server. The bot utilizes a
                    shooting algorithm based on parity and search and destroy, which contributed to a semifinalist finish in a 300+ player tournament. The project
                    also employs MVC and SOLID principles.
                    </p>
                    <Button id="left-gh-link" href="https://github.com/ranapranav00/Battleship"><GitHub id="gh-logo" className="icon"/></Button>
                </div>
                <div id="right-img-container">
                    <img id="battleship-img" src="./images/battleship.png" alt="msw-img"/>
                </div>
                <div id="img-container">
                    <img id="images" src="./images/coursehub.jpg" alt="msw-img"/>
                </div>
                <div id="desc-container">
                    <h2 id="title">CourseHub</h2>
                    <p id="about">CourseHub is a project ideating a platform connecting students and universities offering public courses.
                    Students can view universities, professors, courses, sections, reviews, and much more. Professors can also view reviews
                    left on classes/sections they have taught. Utilized Python Flask to create Rest API and SQL Queries, and deployed on
                    Appsmith using Docker.</p>
                    <Button id="gh-link" href="https://github.com/SpaceRage/CS3200ProjectRepo"><GitHub id="gh-logo" className="icon"/></Button>
                </div>
            </div>
        </div>
    )
}

export default Projects;

/**
                    <div>
                        <img id="images" src="./images/spotify-logo.png" alt="msw-img"/>
                    </div>
                    <div id="bio">
                        <h2 id="title">MySpotifyWrapped</h2>
                        <p id="about">This is msw</p>
                    </div>
                    <div id="containers">
                    <div>
                        <img id="images" src="./images/portfolio-ss.png" alt="website-img"/>
                    </div>
                    <div id="bio">
                        <h2 id="title">Personal Website</h2>
                        <p id="about">This is my website</p>
                    </div>
                </div>
                <div id="containers">
                    <div>
                        <img id="images" src="./images/spotify-logo.png" alt="website-img"/>
                    </div>
                    <div id="bio">
                        <h2 id="title">WeekPlan</h2>
                        <p id="about">This is Weekplan</p>
                    </div>
                </div>
                <div id="containers">
                    <div>
                        <img id="images" src="./images/spotify-logo.png" alt="battleship-img"/>
                    </div>
                    <div id="bio">
                        <h2 id="title">Battleship</h2>
                        <p id="about">This is battleship</p>
                    </div>
                </div>
                <div id="containers">
                    <div>
                        <img id="images" src="./images/spotify-logo.png" alt="coursehub-img"/>
                    </div>
                    <div id="bio">
                        <h2 id="title">CourseHub</h2>
                        <p id="about">This is CourseHub</p>
                    </div>
                </div>
 */