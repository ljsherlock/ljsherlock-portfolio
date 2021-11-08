import React, { Component } from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const query = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  slug,
  title,
  link,
  client,
  "clientName": *[_type == "client" && _id == ^.client._ref].name[0], 
  mainImage,
  "imageAspect": image.asset->.metadata.dimensions.aspectRatio,
  publishedAt,
  body
}[0...50]
`;
const Projects = ({ projects }) => {  
  return (
    <Layout>
      <div className="projects">      

        <h1>Projects built by Lewis</h1>
        
        {projects.map(project =>  {
          return (
            <div className="project">
              <h2>{project.title}</h2>
              <h4>{`Client: ${project.clientName}`}</h4>
              {project.body && project.body.map(b => (
                <p key={b._key}>
                  {b.children.map(span => (
                    <span key={span._key}>
                      {span.text}
                    </span>
                  ))}
                </p>
              ))}
              
              { project && project.mainImage && <Carousel 
                key={project._id}
                showThumbs={false}
              >
                {
                  project && project.mainImage.map(image => (
                    <img src={imageUrlFor(image).width(1080)} />
                  ))
                }
              </Carousel>}
            </div>
            )
        })}

      </div>
      <style jsx>{`
        .projects {
          padding: 1rem;
          width: 90%;
          max-width: 1080px;
          margin: auto;
        }

        .project {
          margin-bottom: 3rem
        }

        .project li {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project img {
          max-height: 50vh;
          width: auto;
          max-width: 100%;
        }
      `}</style>
      <style jsx>{listStyles}</style>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const projects = await sanity.fetch(query);
  return {
    props: { projects } // will be passed to the page component as props
  };
}

export default Projects;
