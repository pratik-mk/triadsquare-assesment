import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";

const SpotLight = ({ data }) => {
  const [currentImage, setCurrentImage] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const handleOpenMedia = (url) => {
    setCurrentImage([url]);
    setIsViewerOpen(true);
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
      {isViewerOpen && (
        <ImageViewer
          src={currentImage}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </Card>
  );
};

export default SpotLight;
