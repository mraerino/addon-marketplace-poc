import React from "react"
import rehypeReact from "rehype-react"
import { Typography, Theme } from "@material-ui/core"
import { ThemeStyle } from "@material-ui/core/styles/createTypography"
import { ThemeProvider } from "@material-ui/styles"

const makeTypoVariant = (variant: ThemeStyle) => props => (
  <Typography variant={variant} {...props} />
)

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: makeTypoVariant("h1"),
    h2: makeTypoVariant("h2"),
    h3: makeTypoVariant("h3"),
    h4: makeTypoVariant("h4"),
    h5: makeTypoVariant("h5"),
    h6: makeTypoVariant("h6"),
    p: makeTypoVariant("body1"),
  },
}).Compiler

const MarkdownRender: React.FC<{ htmlAst: Object }> = ({ htmlAst }) =>
  renderAst(htmlAst)

export default MarkdownRender
