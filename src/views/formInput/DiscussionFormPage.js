import React from "react";

import { Grid } from "@mui/material";
import DiscussionForm from "./element/DiscussionForm";


const DiscussionFormPage = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <DiscussionForm />
      </Grid>
    </Grid>
  );
};

export default DiscussionFormPage;
