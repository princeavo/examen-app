import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Checkbox, Grid, TextField, Box, styled, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';



import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex"
}));

const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },

  ".img-wrapper": {
    height: "100%",
    minWidth: 320,
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [sigle, setSigle] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [adresse, setAdresse] = useState('');
  const [capacite, setCapacite] = useState('');
  const [logo, setLogo] = useState('');

  const handleSubmit = (e) => {
    sendEmail(e)
  };

  const handleChange = (e, type) => {
    switch(type){
      case "nom":
        setNom(e.target.value)
        break;
      case "sigle":
        setSigle(e.target.value)
        break;
      case "email":
        setEmail(e.target.value)
        break;
      case "contact":
        setContact(e.target.value)
        break;
      case "adresse":
        setAdresse(e.target.value)
        break;
      case "logo":
        setLogo(e.target.value)
        break;
      case "capacite":
        setCapacite(e.target.value)
        break;
      default:

    }
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current)
    const formData = new FormData(form.current);
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson);

    emailjs
      .sendForm('service_6jdyjso', 'template_zf1zoph', form.current, {
        publicKey: 'AGKx2agxzEol7OyAt',
      })
      .then(
        () => {
          Swal.fire({
            title: 'Inscription réussie',
            text: 'Vos informations ont été transmises à l\'administrateur. Vous recevrez un email contenant vos informations de connexion. ',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        },
        (error) => {
          console.error(error)
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la soumission du formulaire. ',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        },
      );
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mot de passe"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0 }}
                        />

                        <Paragraph>Se rappeler de moi</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Mot de passe oublié ?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}>
                      Se Connecter
                    </LoadingButton>

                    <Paragraph>
                      Vous n'avez pas de compte ?
                      {/* <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Register
                      </NavLink> */}
                      <Button variant="text" onClick={handleClickOpen}>
                          Inscrivez-vous
                      </Button>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Entrez vos informations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour s'inscrire sur la plateforme, il vous faudra envoyer vos informations à l'administrateur.
          </DialogContentText>
          <form ref={form}>
          <div>
          <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="nom"
                      type="text"
                      label="Nom"
                      value={nom}
                      onChange={(e) => handleChange(e, "nom")}
                      variant="standard"
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="sigle"
                      type="text"
                      label="Sigle"
                      value={sigle}
                      onChange={(e) => handleChange(e, "sigle")}
                      variant="standard"
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="email"
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => handleChange(e, "email")}
                      variant="standard"
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="contact"
                      type="text"
                      value={contact}
                      onChange={(e) => handleChange(e, "contact")}
                      label="Contact téléphonique"
                      variant="standard"
                      sx={{ mb: 3}}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="adresse"
                      type="text"
                      label="Adresse Physique"
                      value={adresse}
                      onChange={(e) => handleChange(e, "adresse")}
                      variant="standard"
                      sx={{ mb: 3}}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="Capacité"
                      type="text"
                      label="Capacité"
                      value={capacite}
                      onChange={(e) => handleChange(e, "capacite")}
                      placeholder="Une approximation du nombre de vos élèves"
                      variant="standard"
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="medium"
                      autoFocus
                      required
                      name="logo"
                      type="file"
                      label="Logo"
                      value={logo}
                      onChange={(e) => handleChange(e, "logo")}
                      variant="standard"
                      sx={{ mb: 3 }}
                    />
                    </div>
                    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" onClick={(e) => handleSubmit(e)}>Envoyer</Button>
        </DialogActions>
      </Dialog>
   
  


    </StyledRoot>
  );
}
