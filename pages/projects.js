import React, { Component } from 'react';
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import Projects from '../components/projects'
import Link from "next/link";
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
  color,
  publishedAt,
  body
}[0...50]
`;

const query2 = `*[_type == "author" && name == "Lewis Sherlock"] {
  _id,
  name,
  title,
  bio,
  image,
  "imageAspect": image.asset->.metadata.dimensions.aspectRatio,
}[0...50]
`;

const ProjectsPage = ({ authors, projects }) => {  
  return (
    <Layout author={authors[0]}>
      <Projects projects={projects}/>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const projects = await sanity.fetch(query);
  const authors = await sanity.fetch(query2);
  return {
    props: { authors, projects } // will be passed to the page component as props
  };
};

export default ProjectsPage;
