import React from "react"
import { Container, createMuiTheme, Theme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"

import Header from "./header"
import "./layout.css"

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00ad9f",
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "1.75rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.35rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1.1rem",
    },
  },
})

export const typoTheme = (outerTheme: Theme): Theme => ({
  ...outerTheme,
  overrides: {
    MuiTypography: {
      h1: {
        marginBottom: "1.25rem",
      },
      h2: {
        marginTop: ".5rem",
        marginBottom: "1rem",
      },
      h3: {
        marginTop: ".5rem",
        marginBottom: "1rem",
      },
      h4: {
        marginTop: ".5rem",
        marginBottom: ".75rem",
      },
      h5: {
        marginBottom: ".75rem",
      },
      h6: {
        marginBottom: ".5rem",
      },
      body1: {
        marginBottom: ".5rem",
      },
      body2: {
        marginBottom: ".5rem",
      },
    },
  },
})

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="lg" component="main" style={{ marginTop: "3rem" }}>
        <ThemeProvider theme={typoTheme}>{children}</ThemeProvider>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
