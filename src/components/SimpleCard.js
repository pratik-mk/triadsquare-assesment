import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";

export default function SimpleCard({ data }) {
  const [currentImage, setCurrentImage] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleOpenMedia = (url) => {
    setCurrentImage([url]);
    setIsViewerOpen(true);
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
}
