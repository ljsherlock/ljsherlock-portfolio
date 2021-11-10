import Head from "next/head";
import Link from "next/link";
import React from "react";
import Avatar from "./avatar";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Layout(props) {
  console.log(props.author)
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lewis Sherlock</title>
      </Head>
      <nav style={{zIndex: '999', color: 'white'}}>
        <Link href="/">
          <a style={{display: 'flex', alignItems: 'center'}}>
            <Avatar image={props.author.image} /> Lewis Sherlock
          </a>
        </Link>
      </nav>
      <div id="main">{props.children}</div>
      <footer>
        <Grid container spacing={1} justifyContent='center' alignItems='space-between' marginTop='1rem'>
          <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={4}>
            <Link href="/projects">
              <a>
                <Typography>
                  View more projects
                </Typography>
              </a>
            </Link>
          </Grid>
          <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={2}>
            <a href="mailto:lewis@ljsherlock.com">
              <AlternateEmailIcon fontSize='small'/>
            </a>
          </Grid>
          <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={2}>
            <a href="linkedin.com/in/lewis-sherlock" target="_blank" rel="noopener">
              <LinkedInIcon fontSize='small'/>
            </a>
          </Grid>
          <Grid display='flex' flexDirection="column" justifyContent='center' alignItems='center' xs={2}>
            <a href="https://github.com/ljsherlock" target="_blank" rel="noopener">
              <GitHubIcon fontSize='small'/>
            </a>
          </Grid>
        </Grid>

        <Typography marginTop='2rem'>
          Designed and built by Lewis Sherlock using ReactJS, NextJS, Vercel, Material UI & Sanity CMS
        </Typography>
      </footer>
      <style jsx>{`
        footer {
          padding: 5rem 1rem 2rem;
          text-align: center;
          font-size: 2rem;
        }

        footer img {
          display: inline-block;
          height: 1em;
          width: auto;
          padding: 0 0.4em;
        }

        nav {
          position: fixed;
          display: flex;
          align-items: center;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #333;
          font-size: 1rem;
          height: 3.5rem;
        }

        nav a {
          flex-grow: 1;
          color: #fff;
          text-decoration: none;
          text-align: center;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: "Avenir", Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: #2c3e50;
          padding: 3.5rem 0 0;
        }
        p {
          font-size: 1rem;
          line-height: 1.7rem;
        }
      `}</style>
    </div>
  );
}
