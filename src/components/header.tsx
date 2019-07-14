import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  Link,
} from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

import netlifyLogo from "../images/netlify-logo.svg"

const Header = () => {
  const [site, setSite] = useState("1")
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <Link
          variant="h3"
          style={{ marginBottom: "0" }}
          color="inherit"
          noWrap
          component={GatsbyLink}
          to="/"
        >
          <img
            src={netlifyLogo}
            alt="Netlify Logo"
            style={{
              height: "1.2em",
              verticalAlign: "text-bottom",
              marginRight: ".5em",
            }}
          />
          Addon Marketplace
        </Link>
        <FormControl style={{ marginLeft: "auto", minWidth: "10rem" }}>
          <Select
            value={site}
            onChange={event =>
              setSite((event.target as HTMLInputElement).value)
            }
          >
            <MenuItem value="1">jamstack.org</MenuItem>
            <MenuItem value="2">netlifycms.org</MenuItem>
            <MenuItem value="3">staticgen.com</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

export default Header
