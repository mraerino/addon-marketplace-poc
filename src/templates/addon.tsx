import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"
import {
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import Layout from "../components/layout"
import MarkdownRender from "../components/markdown"
import AddonMeta from "../components/addonMeta"

export interface PlanDetails {
  interval: string | null
  name: string
  description: string
  price: number
}

interface AddonDetails {
  name: string
  title: string
  plans: PlanDetails[]
  banner: {
    publicURL: string
  }
}

interface AddonPageData {
  markdownRemark: {
    frontmatter: AddonDetails
    htmlAst: Object
  }
}

const makePrice = (plan: PlanDetails) => {
  if (plan.price <= 0) {
    return "Free"
  }
  return `$${plan.price}`
}

const AddonPlans: React.FC<
  AddonDetails & { handlePlanClick: (plan: string) => void }
> = ({ handlePlanClick, ...details }) => (
  <>
    <Typography variant="h3">Plans</Typography>
    <Grid container alignItems="stretch" spacing={3}>
      {details.plans.map(plan => (
        <React.Fragment key={plan.name}>
          <Grid item md={3} container>
            <Grid container component={Paper} style={{ padding: "1rem" }}>
              <Typography variant="h4">{plan.name}</Typography>
              <Typography variant="body2">{plan.description}</Typography>
              <Typography variant="h3" component="span">
                {makePrice(plan)}
              </Typography>
              <Button
                color="primary"
                fullWidth
                style={{ marginBottom: "0", marginTop: "auto" }}
                onClick={() => handlePlanClick(plan.name)}
              >
                <AddIcon /> Install
              </Button>
            </Grid>
          </Grid>
          <AddonMeta title={details.title} name={details.name} plan={plan} />
        </React.Fragment>
      ))}
    </Grid>
  </>
)

interface AddonDialogProps {
  open: boolean
  plans: PlanDetails[]
  currentPlan: string
  handlePlanChanged: (plan: string) => void
  handleClose: () => void
  handleSubscribe: () => void
}

const AddonDialog: React.FC<AddonDialogProps> = ({
  open,
  plans,
  currentPlan,
  handlePlanChanged,
  handleClose,
  handleSubscribe,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title" disableTypography>
      <Typography variant="h3">Install the Addon</Typography>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please choose the plan you want to use for this addon.
      </DialogContentText>
      <Select
        fullWidth
        value={currentPlan}
        onChange={event =>
          handlePlanChanged((event.target as HTMLInputElement).value)
        }
      >
        {plans.map(plan => (
          <MenuItem value={plan.name} key={plan.name}>
            {plan.name} - {makePrice(plan)}
          </MenuItem>
        ))}
      </Select>
    </DialogContent>
    <DialogActions>
      <Button
        style={{ marginBottom: "0" }}
        color="primary"
        onClick={handleSubscribe}
      >
        Subscribe
      </Button>
    </DialogActions>
  </Dialog>
)

const AddonPage: React.FC<{ data: AddonPageData }> = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(
    data.markdownRemark.frontmatter.plans.length > 0
      ? data.markdownRemark.frontmatter.plans[0].name
      : "",
  )

  const handlePlanClick = useCallback(
    (plan: string) => {
      setCurrentPlan(plan)
      setDialogOpen(true)
    },
    [setCurrentPlan, setDialogOpen],
  )

  const handleSubscribe = useCallback(() => {
    setDialogOpen(false)
    console.log(currentPlan)
  }, [currentPlan, data.markdownRemark.frontmatter])

  return (
    <Layout>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h1">
            {data.markdownRemark.frontmatter.title}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setDialogOpen(true)}
          >
            <AddIcon /> Add to my Site
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-start" spacing={3}>
        <Grid item md={4}>
          <Paper style={{ overflow: "hidden" }}>
            <img
              src={data.markdownRemark.frontmatter.banner.publicURL}
              style={{ maxWidth: "100%", display: "block" }}
            />
          </Paper>
        </Grid>
        <Grid item md={8}>
          <article>
            <MarkdownRender htmlAst={data.markdownRemark.htmlAst} />
          </article>
        </Grid>
      </Grid>
      <AddonPlans
        {...data.markdownRemark.frontmatter}
        handlePlanClick={handlePlanClick}
      />
      <AddonDialog
        open={dialogOpen}
        plans={data.markdownRemark.frontmatter.plans}
        currentPlan={currentPlan}
        handlePlanChanged={setCurrentPlan}
        handleClose={() => setDialogOpen(false)}
        handleSubscribe={handleSubscribe}
      />
    </Layout>
  )
}

export const query = graphql`
  query AddonPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        name
        title
        plans {
          interval
          name
          description
          price
        }
        banner {
          publicURL
        }
      }
      htmlAst
    }
  }
`

export default AddonPage
