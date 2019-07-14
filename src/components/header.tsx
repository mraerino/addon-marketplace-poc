import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  Link,
  OutlinedInput,
} from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

import netlifyLogo from "../images/netlify-logo.svg"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  inputRoot: {
    background: "#fff",
  },
})

const Header = () => {
  const classes = useStyles()
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
        <FormControl
          variant="outlined"
          style={{ marginLeft: "auto", minWidth: "10rem" }}
          margin="dense"
        >
          <Select
            value={site}
            onChange={event =>
              setSite((event.target as HTMLInputElement).value)
            }
            input={
              <OutlinedInput labelWidth={0} name="site" id="select-site" />
            }
            classes={{
              root: classes.inputRoot,
            }}
            autoWidth
            MenuProps={{ MenuListProps: { dense: true, disablePadding: true } }}
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
