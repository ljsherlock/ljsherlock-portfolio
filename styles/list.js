/* styles.js */
import css from "styled-jsx/css";

export default css`
  .list {
    display: grid;
    margin: 0;
    padding: 0;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .list > li {
    display: block;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  .list a {
    text-decoration: none;
    display: block;
    flex-grow: 1;
    color: blue;
  }
  
  .list p { 
    max-width: 600px;
  }

  .list h3 {
    margin: 0;
    padding: 0;
    line-height: 1em;
  }

  .list img {
    border-radius: 100%;
    display: block;
    height: auto;
    min-width: 200px;
    width: 17.5%;
    max-width: 200px;
    margin-right: 0.5rem;
    border: 2px solid;
  }

  .list .noImage {
    border: 1px solid red;
  }

  .link {
    cursor: pointer;
  }
`;
