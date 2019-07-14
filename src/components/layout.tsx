import React from "react"
import { Container, createMuiTheme } from "@material-ui/core"
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
    allVariants: {
      marginBottom: "1rem",
    },
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

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="lg" component="main" style={{ marginTop: "3rem" }}>
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
