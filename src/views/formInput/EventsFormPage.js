import React from "react";

import { Grid } from "@mui/material";
import EventForm from "./element/EventsForm";


const EventFormPage = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <EventForm />
      </Grid>
    </Grid>
  );
};

export default EventFormPage;
