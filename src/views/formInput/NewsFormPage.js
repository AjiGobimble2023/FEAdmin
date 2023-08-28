import React from "react";

import { Grid } from "@mui/material";
import NewsForm from "./element/NewsForm";


const FormNews = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <NewsForm />
      </Grid>
    </Grid>
  );
};

export default FormNews;
