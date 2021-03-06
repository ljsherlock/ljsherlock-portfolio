import React from "react";
import sanity from "../lib/sanity";
import imageUrlFor from "../utils/imageUrlFor";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from '@mui/material/Grid';

const Projects = ({ projects, author }) => {
  return (
    <React.Fragment>
      <div className="projects">      
      <h1>Projects</h1>
      <Grid container spacing={3}>
        {projects && projects.map(project =>  {
          return (
            <Grid item md={6} className="project">
              <div style={{background: `${project.color}`}}>
                {project && project.mainImage && <Carousel 
                  key={project._id}
                  showThumbs={false}
                  infiniteLoop={true}
                >
                  {
                    project && project.mainImage.map(image => (
                      <div className='slide-container'>
                        <img src={imageUrlFor(image).width(1920)} />
                      </div>
                    ))
                  }
                </Carousel>}
              </div>
              <div className="project-meta"> 
                <h2>{project.title}</h2>
                {project.link && 
                  
                  <h4>{`Client: `}<a href={project.link} target="_blank" rel="noopener">{`${project.clientName}`}</a></h4>
                } 
                {!project.link && 
                  <h4>{`Client: ${project.clientName}`}</h4>
                } 
                {project.body && project.body.map(b => (
                  <p key={b._key}>
                    {b.children.map(span => (
                      <span key={span._key}>
                        {span.text}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </Grid>
            )
        })}
      </Grid>
      </div>
      <style jsx>{`
        .projects {
          padding: 1rem;
          width: 90%;
          max-width: 1400px;
          margin: auto;
          margin-top: 1.5rem;
        }

        .project {
          margin-bottom: 3rem;
        }

        .project-meta {
          max-width: 600px;
        }

        .project .slide-container {
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: center;
        }

        .project img {
          max-height: 85vh;
          max-width: 100%;
          width: auto;
          margin: 2rem 0;
        }
      `}</style>
    </React.Fragment>
  );
};

export default Projects;
