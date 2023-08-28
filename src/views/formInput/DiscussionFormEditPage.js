import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Grid } from "@mui/material";
import DiscussionEditForm from "./element/DiscussionFormEdit";

const EditDiscussionFormPage = () => {
  const { discussionId } = useParams();
  const [Discussiondata, setDiscussionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/discussionTopic/${discussionId}`);
        const data = await response.json();

        if (response.ok) {
          setDiscussionData(data);
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [discussionId]);

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        {Discussiondata !== null && <DiscussionEditForm Discus={Discussiondata} />}
      </Grid>
    </Grid>
  );
};

export default EditDiscussionFormPage;
