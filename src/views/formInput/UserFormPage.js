import React from "react";

import { Grid } from "@mui/material";
import UserForm from "./element/UserForm";


const UserFormPage = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <UserForm />
      </Grid>
    </Grid>
  );
};

export default UserFormPage;
