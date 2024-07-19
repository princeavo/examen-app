import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import SimpleForm from "./step1";


import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import
{
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


function getSteps() {
  return ["Examen", "Type de l'examen", "Les centres"];
}

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <ValidatorForm onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="username"
                  id="standard-basic"
                  value={ ""}
                  errorMessages={["this field is required"]}
                  label="Username (Min length 4, Max length 9)"
                  validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                />
    
                <TextField
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
    
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={""}
                  validators={["required", "isEmail"]}
                  errorMessages={["this field is required", "email is not valid"]}
                />
    
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
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
    
                <TextField
                  sx={{ mb: 4 }}
                  type="number"
                  name="creditCard"
                  label="Credit Card"
                  value={""}
                  errorMessages={["this field is required"]}
                  validators={["required", "minStringLength:16", "maxStringLength: 16"]}
                />
              </Grid>
    
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="mobile"
                  value={""}
                  label="Mobile Nubmer"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  value={""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={""}
                  validators={["required", "isPasswordMatch"]}
                  errorMessages={["this field is required", "password didn't match"]}
                />
                <RadioGroup
                  row
                  name="gender"
                  sx={{ mb: 2 }}
                  value={""}
                  >
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
                </RadioGroup>
    
                <FormControlLabel
                  control={<Checkbox />}
                  label="I have read and agree to the terms of service."
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      );

    case 1:
      return `Integer euismod dapibus sapien, a interdum augue blandit eget. Donec pellentesque, sapien iaculis dignissim sagittis, risus nulla auctor eros, sed suscipit eros mauris id lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer porttitor mauris egestas consequat molestie. Nam egestas iaculis malesuada. Praesent sagittis venenatis finibus. Praesent porttitor ipsum et sapien cursus, eu mattis augue ornare.`;

    case 2:
      return `In laoreet, dui vel tristique facilisis, velit dui dictum diam, nec feugiat mi mauris eu nunc. Nullam auctor eget ante ac laoreet. Aliquam et ante ligula. Nam imperdiet augue magna, ac tincidunt neque mollis nec. Sed eu nunc sit amet tellus commodo elementum non sit amet sem. Etiam ipsum nibh, rutrum vel ultrices in, vulputate ac dolor. Morbi dictum lectus id orci dapibus, et faucibus nulla viverra. Nulla consectetur ex vitae pretium vehicula. Quisque varius tempor erat et semper. Vivamus consectetur, eros sit amet ornare facilisis, nulla felis laoreet tortor, sit amet egestas risus ipsum sed eros.`;

    default:
      return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed</Typography>

            <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>

            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Valider" : "Suivant"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
