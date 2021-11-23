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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import PortableText from '@sanity/block-content-to-react'

const TimelineList = ({ pages }) => {
  const colors = [
    'success',
    'primary',
    'secondary',
    'warning',
  ]
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '80vw',
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      boxShadow: '0px 5px 15px 0px rgba(0,0,0,0.3)',
      padding: '1.5em 2.5em',
    },

  }));

  const serializers = {
    marks: {
      internalLink: ({mark, children}) => {
        const {slug = {}} = mark
        const href = `/${slug.current}`
        return <a href={href}>{children}</a>
      },
      link: ({mark, children}) => {
        // Read https://css-tricks.com/use-target_blank/
        const { blank, href } = mark
        return blank ?
          <a href={href} target="_blank" rel="noopener">{children}</a>
          : <a href={href}>{children}</a>
      }
    }
  }
  
  const Body = page => (
    <PortableText 
      blocks={page} 
      serializers={serializers} 
    />
  )
  pages.push(pages.splice(2, 1)[0])
  return (
    <React.Fragment>

      <Timeline position="alternate">
        {pages && pages.map((page, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineDot color={colors[i]} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <BootstrapTooltip title={
                <React.Fragment>
                  <Typography variant="h6" component="span" style={{fontWeight: 'bold'}}>
                    {page.title}
                  </Typography>
                  <Typography component="ol" key={i}>
                    {page.bio && page.bio.map((page) => (
                      <React.Fragment>
                        {page.children.map(span => (
                          <Typography component="li">
                            {span.text}
                          </Typography>
                        ))}
                      </React.Fragment> 
                    ))}
                  </Typography>
                </React.Fragment>
              }>
                <Typography variant="h6" component="span" style={{color:"blue", cursor: 'pointer'}}>
                  {page.title}
                </Typography>
              </BootstrapTooltip>
              <Typography>
                {page.years}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
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
