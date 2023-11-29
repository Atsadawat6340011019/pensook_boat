import {
  NavigateBeforeRounded,
  NavigateNextRounded,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

export const ImageSlideShow = ({
  imageData,
  imageSelectData,
  setImageSelect,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const selectedIndex = imageData.findIndex(
      (item) => item === imageSelectData
    );

    if (selectedIndex !== -1) {
      setSelectedImageIndex(selectedIndex);
    }
  }, [imageData, imageSelectData]);

  const handleSelectImage = () => {
    setImageSelect();
  };

  const handleSelectImages = (image) => {
    if (image === imageSelectData) {
      setImageSelect();
    } else {
      setImageSelect(image);
    }
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    setImageSelect(imageData[(selectedImageIndex + 1) % imageData.length]);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
    setImageSelect(
      imageData[(selectedImageIndex - 1 + imageData.length) % imageData.length]
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: 600,
          width: "100%",
          overflow: "auto",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {imageData.map((item, index) => (
            <img
              key={index}
              src={item}
              width={imageData?.length > 6 ? 50 : 100}
              height={imageData?.length > 6 ? 50 : 100}
              style={{
                objectFit: "cover",
                cursor: "pointer",
                paddingRight: "3px",
                paddingLeft: "3px",
              }}
              alt="imageContent"
              onClick={() => handleSelectImages(item)}
            />
          ))}
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {imageData.length < 4 &&
            imageData.map((item, index) => (
              <img
                key={index}
                src={item}
                width={imageData?.length > 6 ? 50 : 100}
                height={imageData?.length > 6 ? 50 : 100}
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  paddingRight: "3px",
                  paddingLeft: "3px",
                }}
                alt="imageContent"
                onClick={() => handleSelectImages(item)}
              />
            ))}
        </Box>

        {imageData.length > 3 && (
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton
              sx={{ width: 60, height: 60 }}
              onClick={handlePrevImage}
            >
              <NavigateBeforeRounded
                sx={{ width: 60, height: 60, color: "#000" }}
              />
            </IconButton>
            <img
              src={
                imageSelectData
                  ? imageSelectData
                  : imageData[selectedImageIndex]
              }
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                cursor: "pointer",
                paddingRight: "3px",
                paddingLeft: "3px",
              }}
              alt="imageContent"
              onClick={() => handleSelectImage()}
            />

            <IconButton
              sx={{ width: 60, height: 60 }}
              onClick={handleNextImage}
            >
              <NavigateNextRounded
                sx={{ width: 60, height: 60, color: "#000" }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
      {imageSelectData && (
        <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={imageSelectData}
            width={"100%"}
            style={{ objectFit: "contain", maxHeight: 500 }}
            alt="imageSelect"
          />
        </Box>
      )}
    </Box>
  );
};
