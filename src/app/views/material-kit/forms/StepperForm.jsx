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
        <ValidatorForm  onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="nom"
              id="standard-basic"
              value={""}
              errorMessages={["Le nom est requis"]}
              label="Entrez l'examen (BEPC,BAC,...)"
              validators={["required", "minStringLength: 4"]}
            />

            <TextField
              type="email"
              name="email"
              label="Le type (Blanc,national)"
              value={""}
              validators={["required", "isEmail"]}
              errorMessages={["Veuillez préciser"]}
            />

            <TextField
              type="text"
              name="Choix des centres de compositions"
              label="Adresse physique"
              value={""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />
            <TextField
              type="text"
              name="contact"
              label="Contact"
              value={""}
              validators={["required"]}
              errorMessages={["Champ obligatoire"]}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider> */}
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
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

        {/* <Button sx={{float: 'right'}} color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button> */}
      </ValidatorForm>
      );

    case 1:
      return (
        <div>
          <ValidatorForm onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <Button color="primary"
                    sx={{ display:'inline-block', mr:5 }}
                     variant="outlined" type="submit">
                Blanc
                
              </Button>
              <Button color="secondary"

sx={{ display:'inline-block', mr:5 }}
              
              variant="outlined" type="submit">

                National
                
              </Button>
    
                <TextField
                  sx={{ mb: 4, display: 'none' }}
                  type="text"
                  name="creditCard"
                  label="Credit Card"
                  value={""}
                  errorMessages={["this field is required"]}
                  validators={["required", "minStringLength:16", "maxStringLength: 16"]}
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      );

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
