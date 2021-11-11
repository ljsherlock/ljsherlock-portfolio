import React from "react";
import sanity from "../lib/sanity";
import imageUrlFor from "../utils/imageUrlFor";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

const TimelineList = ({ dates }) => {
  return (
    <React.Fragment>
     <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            Blockchain and Web3 Developer:
          </Typography>
          <Typography>1 year</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
        <Typography variant="h6" component="span">
            ReactJS Developer:  
        </Typography>
        <Typography>5 years</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='secondary'/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
        <Typography variant="h6" component="span">
            Designer
        </Typography>
        <Typography>6 years</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color='warning' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
        <Typography variant="h6" component="span">
            Full-Stack Web Design and Development : 
        </Typography>
        <Typography>10 years</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>

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
        }
      `}</style>
    </React.Fragment>
  );
};

export default TimelineList;
