import React from "react";

import {
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PlanCard } from "../components/pricing/PlanCard";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  paper: {
    width: "80%",
    maxWidth: "100ch",
    padding: theme.spacing(3),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const tiers = [
  {
    title: "Free",
    price: 0,
    description: ["Limited to 5 lists", "Unlimited tasks"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Free Pro Trial has extended to December 2021",
    price: 5,
    description: [
      "Unlimited lists",
      "Unlimited tasks",
      "Unlimited events",
    ],
    buttonText: "Let's get started",
    buttonVariant: "contained",
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      {/* Hero unit */}
      <Container maxWidth="sm" component="div" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default Material-UI components
          with little customization.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6}>
              <PlanCard tier={tier}/> 
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
}
