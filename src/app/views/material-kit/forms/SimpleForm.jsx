import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    nom,
    password,
    confirmPassword,
    gender,
    date,
    email,
    contact,
    adresse_physique,
    sigle,
    logo,
    capacite
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="nom"
              id="standard-basic"
              value={nom || ""}
              onChange={handleChange}
              errorMessages={["Le nom est requis"]}
              label="Nom"
              validators={["required", "minStringLength: 4"]}
            />

            <TextField
              type="email"
              name="email"
              label="Adresse mail"
              value={email || ""}
              onChange={handleChange}
              validators={["required", "isEmail"]}
              errorMessages={["L'adresse mail est obligatoire", "L'adresse mail n'est pas valide"]}
            />

            <TextField
              type="text"
              name="adresse_physique"
              label="Adresse physique"
              onChange={handleChange}
              value={adresse_physique || ""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <TextField
              type="text"
              name="contact"
              label="Contact"
              onChange={handleChange}
              value={contact || ""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={password || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Date picker"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

          <TextField
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              value={confirmPassword || ""}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["this field is required", "password didn't match"]}
            />
          <TextField
              type="text"
              name="sigle"
              label="Sigle"
              onChange={handleChange}
              value={sigle || ""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <TextField
              type="file"
              name="logo"
              onChange={handleChange}
              value={logo || ""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <TextField
              type="number"
              name="capacite"
              value={capacite || ""}
              label="Capacité"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
           {/*  <RadioGroup
              row
              name="gender"
              sx={{ mb: 2 }}
              value={gender || ""}
              onChange={handleChange}>
              <FormControlLabel
                value="Male"
                label="Male"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup> */}

            <FormControlLabel
              control={<Checkbox />}
              label="Centre de composition."
            />
          </Grid>
        </Grid>

        <Button sx={{float: 'right'}} color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
