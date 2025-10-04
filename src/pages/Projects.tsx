import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Planit",
      description: "Have you ever thought, “That trip looks amazing—how did they plan it, and can I follow their exact steps?” That’s the spark that led me to create Planit. I wanted a way to not only share my own itineraries through something as simple as a link or QR code, but also help others discover trips similar to ones they’ve already enjoyed. To get started, I used generative AI tools to scaffold the project, but built the itinerary-generation engine myself. I designed a retrieval-augmented generation pipeline that blends semantic search of real travel data with large language model planning, so itineraries feel both realistic and personalized. Right now, I have a working MVP, and I’m continuing to refine it—improving the quality of recommendations, smoothing the user experience, and expanding the range of destinations.",
      image: "./images/planit.png",
      github: "https://github.com/ranapranav00/Planit",
      alignLeft: true,
    },
    {
      title: "Geolocation Convolution",
      description: "This Geolocation Convolution is a Convolutional Neural Network that predicts the coordinates a streetview image was taken at. The data for the model was retrieved from the CVUSA dataset, which contained ~2MM geotagged images. From there, I designed a script to restructure the directory into 928 classes representing unique longitude/latitude pairs. The model uses 2D-CNNs to identify differentiating features in the various streetview images and achieved a training and testing error of ~2 degrees of latitude and longitude. Finally, plotted results with Matplotlib to visualize distance between Actual vs Expected Coordinates.",
      image: "./images/cnnvis.png",
      github: "https://github.com/ranapranav00/GeoguesserCNN",
      alignLeft: false,
    },
    {
      title: "MyWorld",
      description: "MyWorld is a small project I created to document my various travels around the world. Leveraged a globe.gl render to visualize and pinpoint all my personal travel destinations on a globe. Stored personal photography in an AWS S3 bucket to be retrieved upon the click of a country's pin. Created using a React frontend and a Node.js server.",
      image: "./images/myglobe.png",
      github: ["https://github.com/ranapranav00/travels-globe", "https://github.com/ranapranav00/image-microservice"],
      alignLeft: true,
    },
    {
      title: "MySpotifyWrapped",
      description: "Want a break from the year long wait? If you tap now to go to MySpotifyWrapped, you'll recieve unlimited access to your top listened to Artists and Tracks. Using Python Flask and the Spotify API, retrieves user's spotify authorization token to access listening data for tracks and artists. Using a React frontend, displays users top listened to artists or tracks no matter the time of year.",
      image: "./images/spotify-logo.png",
      github: "https://github.com/ranapranav00/My-Spotify-Wrapped",
      alignLeft: false,
    },
    {
      title: "Personal Portfolio",
      description: "This is my personal portfolio website. Utilized JavaScript, HTML, and React to create and connect components including navbar and pages. Styled website using CSS and ensured that it is reactive to mobile screens as well. Deployed final product using GitHub Pages.",
      image: "./images/portfolio.png",
      github: "https://github.com/ranapranav00/ranapranav00.github.io",
      alignLeft: true,
    },
    {
      title: "WeekPlan",
      description: "WeekPlan is a custom calendar application made using JavaFX. Using this calendar app, users are able to set a maximum amount of tasks and events per day. Users can create a new week during every use, or load an existing week which can even be locked with a password. WeekPlan also has several other features including a splash screen, customizable week starts, event/task categorization, event/task visual customizability, editing and deleting entries, and more.",
      image: "./images/WeekPlan.png",
      github: "https://github.com/ranapranav00/WeekPlan",
      alignLeft: false,
    },
    {
      title: "BattleShip",
      description: "This version of BattleShip is a game played in the terminal where players can shoot as many shots as ships they have alive per round. The game can be played between two players, a player and a bot, or two bots. It also supports gameplay on a custom server. The bot utilizes a shooting algorithm based on parity and search and destroy, which contributed to a semifinalist finish in a 300+ player tournament. The project also employs MVC and SOLID principles.",
      image: "./images/battleship.png",
      github: "https://github.com/ranapranav00/Battleship",
      alignLeft: true,
    },
    {
      title: "CourseHub",
      description: "CourseHub is a project ideating a platform connecting students and universities offering public courses. Students can view universities, professors, courses, sections, reviews, and much more. Professors can also view reviews left on classes/sections they have taught. Utilized Python Flask to create Rest API and SQL Queries, and deployed on Appsmith using Docker.",
      image: "./images/coursehub.jpg",
      github: "https://github.com/SpaceRage/CS3200ProjectRepo",
      alignLeft: false,
    },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Projects</span>
        </motion.h1>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: project.alignLeft ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-8 items-start ${
                project.alignLeft ? "md:grid-flow-dense" : ""
              }`}
            >
              <div className={project.alignLeft ? "md:col-start-2" : ""}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover rounded-xl border border-border shadow-lg"
                />
              </div>

              <div className={`${project.alignLeft ? "md:col-start-1 md:row-start-1" : ""} flex flex-col h-80`}>
                <h2 className="text-3xl font-bold mb-4 text-gradient">{project.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow overflow-hidden">{project.description}</p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {Array.isArray(project.github) ? (
                    project.github.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 border border-border rounded-lg transition-all hover:scale-105 hover:border-primary/50"
                      >
                        <Github className="w-5 h-5 text-primary" />
                        <span>Repo {i + 1}</span>
                      </a>
                    ))
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 border border-border rounded-lg transition-all hover:scale-105 hover:border-primary/50"
                    >
                      <Github className="w-5 h-5 text-primary" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
