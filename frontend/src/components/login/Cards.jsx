import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import pic1 from "../../images/card-pic-1.svg";
import pic2 from "../../images/card-pic-2.jpg";
import pic3 from "../../images/card-pic-3.jpg";

export default function Cards() {
  return (
    <Grid container spacing={3} width={"100%"}>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic1} />
          <CardHeader title="Patient" subheader="Patient" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
              ab dolor amet reprehenderit aliquam? Totam repudiandae tenetur,
              sunt ex molestias sit nihil reprehenderit quos quae nesciunt quam
              magnam. Praesentium, unde!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic2} />
          <CardHeader title="Patient" subheader="Patient" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              culpa molestiae. Cum voluptatem veritatis, iste fuga id
              necessitatibus harum reprehenderit sapiente ea sint, tenetur eius
              et quas nihil, hic explicabo!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={3}>
          <CardMedia sx={{ height: "28vh" }} image={pic3} />
          <CardHeader title="Patient" subheader="Patient" />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              consequatur harum minus blanditiis libero maiores eius ullam totam
              quis iure esse impedit reprehenderit, nesciunt eaque alias rem
              doloribus architecto magnam?
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
