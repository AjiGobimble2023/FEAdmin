import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Grid } from "@mui/material";
import NewsEditForm from "./element/NewsFormEdit";

const EditNewsFormPage = () => {
  const { newsId } = useParams(); 
  console.log(newsId);
  const [newsdata, setNewsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/news/${newsId}`);
        const data = await response.json();

        if (response.ok) {
          setNewsData(data);
          console.log(data);
        } else {
          console.error("Error fetching data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newsId]);

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        {newsdata !== null && <NewsEditForm News={newsdata} />}
      </Grid>
    </Grid>
  );
};

export default EditNewsFormPage;
