import React from "react";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Projects from '../components/projects'

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
  color,
  publishedAt,
  body
}[0...3]
`;

const Movies = ({ authors, projects }) => {
  return (
    <Layout author={authors[0]}>
      <div className="movies">
        <ul className="list">
          {authors.map(author => (
            <li key={author._id} className="list__item">
              {author.image && (
                <img
                  src={imageUrlFor(author.image)
                    .ignoreImageParams()
                    .width(300)}
                  width="100"
                  height={100 / author.posterAspect}
                />
              )}
              <div>
                <h1>{author.name}</h1>
                <h3>{author.title}</h3>
                {author.bio.map(b => (
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

      <Projects projects={projects} author={authors[0]}/>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const authors = await sanity.fetch(query);
  const projects = await sanity.fetch(query2);
  return {
    props: { authors, projects } // will be passed to the page component as props
  };
};

export default Movies;
