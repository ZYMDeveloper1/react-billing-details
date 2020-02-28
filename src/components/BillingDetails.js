import React, { useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./stripe.css";

const Header = styled.div`
  margin-bottom: 30px;
`;

const Body = styled.div`
  border: 2px solid rgb(231 231 233);
  border-radius: 5px;
  padding: 22px;
  margin-bottom: 30px;
`;

const Footer = styled.div`
  border: 2px solid rgb(231 231 233);
  border-radius: 5px;
  padding: 22px;
  margin-bottom: 50px;
`;

const FullWidthInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const AutoWidthInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 249,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const SelectWidthInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const VatWidthInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 704,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  margin: {
    margin: theme.spacing(1)
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal_paper: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

export default function BillingDetails() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = event => {
    setAge(event.target.value);
  };
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleStripeChange = event => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  };

  return (
    <React.Fragment>
      <Header>
        <Typography variant="h4" gutterBottom>
          Billing
        </Typography>
        <Paper
          className={classes.paper}
          style={{
            padding: "12px 16px",
            backgroundColor: "rgb(242, 243, 255)",
            borderTop: "3px solid rgb(84, 104, 255)"
          }}
        >
          <Typography
            component="p"
            style={{ fontSize: 12, display: "flex", alignItems: "center" }}
          >
            <ErrorOutlineIcon color="primary" style={{ marginRight: 20 }}>
              add_circle
            </ErrorOutlineIcon>
            <span>You can add multiple cards expiration problems.</span>
          </Typography>
        </Paper>
      </Header>
      <Body>
        <Typography variant="h6" gutterBottom style={{ marginLeft: "8px" }}>
          Details
        </Typography>
        <form className={classes.root} noValidate>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Company *
            </InputLabel>
            <FullWidthInput placeholder="company" id="bootstrap-input" />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Name *
            </InputLabel>
            <FullWidthInput placeholder="name" id="bootstrap-input" />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Email(s) *
            </InputLabel>
            <FullWidthInput placeholder="email" id="bootstrap-input" />
            <Typography
              component="p"
              style={{
                margin: 0,
                color: "rgb(89, 93, 154)",
                fontSize: 12,
                marginTop: 3
              }}
            >
              Invoices will be sent to this email if specified. Use a
              comma-separated list of emails to send them to several people.
            </Typography>
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Address *
            </InputLabel>
            <FullWidthInput placeholder="address" id="bootstrap-input" />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Country *
            </InputLabel>
            <AutoWidthInput placeholder="country name" id="bootstrap-input" />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Zip Code *
            </InputLabel>
            <AutoWidthInput placeholder="zip code" id="bootstrap-input" />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              State *
            </InputLabel>
            <AutoWidthInput placeholder="state" id="bootstrap-input" />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              City *
            </InputLabel>
            <AutoWidthInput placeholder="city" id="bootstrap-input" />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Currency *
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={age}
              onChange={handleChange}
              input={<SelectWidthInput />}
            >
              <option value="" />
              <option value={10}>USD</option>
              <option value={20}>CAD</option>
              <option value={30}>AUD</option>
            </NativeSelect>
            <Typography
              component="p"
              style={{
                margin: 0,
                color: "rgb(89, 93, 154)",
                fontSize: 12,
                marginTop: 3
              }}
            >
              The invoice currency. 1.00€ =
              $1.20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              VAT Number *
            </InputLabel>
            <VatWidthInput placeholder="city" id="bootstrap-input" />
            <Typography
              component="p"
              style={{
                margin: 0,
                color: "rgb(89, 93, 154)",
                fontSize: 12,
                marginTop: 3
              }}
            >
              Required if you're incorporated in EU. Format: COUNTRY_CODE NUMBER
              .
            </Typography>
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "black", fontSize: "20px" }}
            >
              Purchase Order
            </InputLabel>
            <FullWidthInput placeholder="order" id="bootstrap-input" />
            <Typography
              component="p"
              style={{
                margin: 0,
                color: "rgb(89, 93, 154)",
                fontSize: 12,
                marginTop: 3
              }}
            >
              Used to display a Purchase Order number on your invoice.
            </Typography>
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{
                color: "black",
                fontSize: "20px"
              }}
            >
              Invoice notes
            </InputLabel>
            <br />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              style={{ marginTop: "5px" }}
            />
            <Typography
              component="p"
              style={{
                margin: 0,
                color: "rgb(89, 93, 154)",
                fontSize: 12,
                marginTop: 3
              }}
            >
              {" "}
              Extra comments which will be added to future invoices.
            </Typography>
          </FormControl>
        </form>
      </Body>
      <Footer>
        <Grid container style={{ position: "relative", height: 50 }}>
          <Typography variant="h6" gutterBottom style={{ marginLeft: "8px" }}>
            Credit Cards
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleOpen}
            style={{ position: "absolute", right: 0, bottom: 15 }}
          >
            Add credit card
          </Button>
        </Grid>
        <Paper
          className={classes.paper}
          style={{
            padding: "12px 16px",
            backgroundColor: "rgb(242, 243, 255)",
            borderTop: "3px solid rgb(84, 104, 255)"
          }}
        >
          <Typography
            component="p"
            style={{ fontSize: 12, display: "flex", alignItems: "center" }}
          >
            <ErrorOutlineIcon color="primary" style={{ marginRight: 20 }}>
              add_circle
            </ErrorOutlineIcon>
            <span>You can add multiple cards expiration problems.</span>
          </Typography>
        </Paper>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div
              className={classes.modal_paper}
              style={{ position: "relative" }}
            >
              <h2 id="transition-modal-title">Add credit card</h2>
              <span
                onClick={handleClose}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  color: "rgb(90, 95, 150)",
                  fontSize: 20,
                  right: 30,
                  top: 30
                }}
              >
                ×
              </span>
              <form onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  style={{ margin: 0, marginBottom: 30 }}
                >
                  <InputLabel
                    shrink
                    htmlFor="bootstrap-input"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Card owner *
                  </InputLabel>
                  <FullWidthInput
                    placeholder="e.g.John Doe"
                    id="bootstrap-input"
                  />
                </FormControl>
                <div class="form-row" style={{ marginBottom: 30 }}>
                  <label for="card-element">Card information</label>
                  <CardElement
                    id="card-element"
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleStripeChange}
                  />
                  <div className="card-errors" role="alert">
                    {error}
                  </div>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "rgb(176, 183, 234)",
                    color: "white"
                  }}
                >
                  Add
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </Footer>
    </React.Fragment>
  );
}

async function stripeTokenHandler(token) {
  const response = await fetch("/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: token.id })
  });

  return response.json();
}
