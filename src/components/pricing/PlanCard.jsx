import React from 'react'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/StarBorder";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "20ch"
  },
  cardPricing: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

export const PlanCard = (props) => {
  const { tier } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={tier.title}
        subheader={tier.subheader}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        action={tier.title === "Pro" ? <StarIcon /> : null}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.cardPricing}>
          <Typography component="h2" variant="h3" color="textPrimary">
            ${tier.price}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            /mo
          </Typography>
        </div>
        <ul>
          {tier.description.map((line) => (
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key={line}
            >
              {line}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={tier.buttonVariant}
          color="secondary"
          component={NavLink}
          to={tier.buttonText === "Sign up for free" ? "/signup" : "#"} 
        >
          {tier.buttonText}
        </Button>
      </CardActions>
    </Card>
  )
}
