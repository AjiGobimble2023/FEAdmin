import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Grid } from "@mui/material";
import EventEditForm from "./element/EventsFormEdit";

const EditEventFormPage = () => {
  const { eventId } = useParams(); 
  const [eventdata, seteventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${eventId}`);
        console.log(response);
        const data = await response.json();

        if (response.ok) {
          seteventData(data);
          console.log(data);
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        {eventdata !== null && < EventEditForm event={eventdata} />}
      </Grid>
    </Grid>
  );
};

export default EditEventFormPage;
