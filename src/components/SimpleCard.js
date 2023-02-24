import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function SimpleCard({ data }) {
  const handleOpenMedia = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Card>
      <CardActionArea onClick={() => handleOpenMedia(data.url)}>
        <CardMedia
          component="img"
          alt={data.title}
          height="200"
          image={data.thumbnail_url ?? data.url}
          title={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {data.title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {data.date} | {data.owner}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
