import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const query = `*[_type == "author" && name == "Lewis Sherlock"] {
  _id,
  name,
  title,
  bio,
  image,
  "imageAspect": image.asset->.metadata.dimensions.aspectRatio,
}[0...50]
`;
const query2 = `*[_type == "project"] | order(publishedAt desc) {
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
}[0...3]
`;

const Movies = ({ movies, projects }) => {
  return (
    <Layout>
      <div className="movies">
        <ul className="list">
          {movies.map(movie => (
            <li key={movie._id} className="list__item">
              {movie.image && (
                <img
                  src={imageUrlFor(movie.image)
                    .ignoreImageParams()
                    .width(300)}
                  width="100"
                  height={100 / movie.posterAspect}
                />
              )}
              <div>
                <h1>{movie.name}</h1>
                <h3>{movie.title}</h3>
                {movie.bio.map(b => (
                  <p key={b._key}>
                    {b.children.map(span => (
                      <span key={span._key}>
                        {span.text}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .movies {
          padding: 1rem;
          margin-top: 2rem;
        }
        .movies-list__directed-by {
          display: block;
          font-size: 1rem;
        }
      `}</style>
      <style jsx>{listStyles}</style>

      <div className="projects">      

        <h1>Portfolio</h1>

        {projects && projects.map(project =>  {
          return (
            <div className="project">
              <div className="project-meta"> 
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
              </div>
              
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
          margin-top: 1.5rem;
        }

        .project {
          margin-bottom: 3rem
        }

        .project-meta {
          max-width: 600px;
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
    </Layout>
  );
};

export const getStaticProps = async () => {
  const movies = await sanity.fetch(query);
  const projects = await sanity.fetch(query2);
  console.log(projects)
  return {
    props: { movies, projects } // will be passed to the page component as props
  };
};

export default Movies;
