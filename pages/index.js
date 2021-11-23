import React from "react";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import listStyles from "../styles/list";
import imageUrlFor from "../utils/imageUrlFor";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Projects from '../components/projects'
import TimelineList from "../components/timeline";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

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

const pagesQuery = `*[_type == "page"] {
  _id,
  title,
  years,
  bio,
}[0...50]
`;

const Movies = ({ authors, projects, pages }) => {
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
                <Grid container spacing={1} justifyContent='center' alignItems='space-between' marginTop='1rem'>
                  <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={1}>
                    <a href="linkedin.com/in/lewis-sherlock" target="_blank" rel="noopener">
                      <LinkedInIcon fontSize='small'/>
                    </a>
                  </Grid>
                  <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={1}>
                    <a href="https://github.com/ljsherlock" target="_blank" rel="noopener">
                      <GitHubIcon fontSize='small'/>
                    </a>
                  </Grid>
                  <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={1}>
                    <a href="mailto:lewis@ljsherlock.com">
                      <AlternateEmailIcon fontSize='small'/>
                    </a>
                  </Grid>
                </Grid>
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

      <TimelineList pages={pages}/>
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
  const pages =  await sanity.fetch(pagesQuery);
  return {
    props: { authors, projects, pages } // will be passed to the page component as props
  };
};

export default Movies;
