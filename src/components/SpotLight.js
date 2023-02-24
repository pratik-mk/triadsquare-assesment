import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const SpotLight = ({ data }) => {
  const handleOpenMedia = (url) => {
    window.open(url, "_blank");
  };
  return (
    <Card>
      <CardActionArea onClick={() => handleOpenMedia(data?.url)}>
        <CardMedia
          component="img"
          alt={data?.title}
          height="400"
          image={data?.url}
          title={data?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data?.explanation}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {data?.date} | {data?.copyright}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SpotLight;
