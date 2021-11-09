import Head from "next/head";
import Link from "next/link";
import React from "react";
import Avatar from "./avatar";

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
        <Link href="mailto:lewis@ljsherlock.com">
          <a>Email me</a>
        </Link>
        <a href="https://twitter.com/LifeofSherlock" target="_blank">DM me</a>
        <Link href="/projects">
          <a>View more projects</a>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          padding: 5rem 1rem;
          text-align: center;
          font-size: 2rem;
          display: flex;
          flex-direction: row;
          align-items: space-between;
          justify-content: space-evenly;
        }

        footer img {
          display: inline-block;
          height: 1em;
          width: auto;
          padding: 0 0.4em;
        }
        
        a {
          color: grey
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
