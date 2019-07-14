import React from "react"

import Layout, { theme } from "../components/layout"
import { Typography, Paper, Grid } from "@material-ui/core"
import { graphql } from "gatsby"
import GatsbyLink from "gatsby-link"
import { styled, useTheme, Theme, lighten } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/styles"

interface IndexData {
  allFile: {
    edges: {
      node: {
        childMarkdownRemark: {
          frontmatter: {
            title: string
            logo: {
              publicURL: string
            }
          }
          fields: {
            slug: string
          }
        }
      }
    }[]
  }
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    linkedPaper: {
      display: "block",
      padding: "1rem",
      textDecoration: "none",
      textAlign: "center",
      flex: "1",
      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.main, 0.3),
        color: "#fff",
      },
    },
    logoImage: {
      height: "8rem",
      width: "auto",
      margin: "0 auto 2rem auto",
      display: "block",
    },
  }),
  { defaultTheme: theme },
)

const IndexPage: React.FC<{ data: IndexData }> = ({ data }) => {
  const classes = useStyles({})
  return (
    <Layout>
      <Typography variant="h1">Marketplace</Typography>
      <Grid container spacing={2}>
        {data.allFile.edges.map(({ node }) => {
          const {
            childMarkdownRemark: {
              frontmatter,
              fields: { slug },
            },
          } = node
          return (
            <Grid item md={3} container>
              <Paper
                component={({ onClick, ...props }) => (
                  <GatsbyLink to={slug} {...props as any} />
                )}
                className={classes.linkedPaper}
              >
                <img
                  src={frontmatter.logo.publicURL}
                  className={classes.logoImage}
                />
                <Typography variant="h4">{frontmatter.title}</Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query AddonsQuery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "addons" }
        internal: { mediaType: { eq: "text/markdown" } }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              name
              title
              logo {
                publicURL
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`

export default IndexPage
