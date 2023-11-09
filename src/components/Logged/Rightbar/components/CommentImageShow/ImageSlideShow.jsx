import { Box } from "@mui/material";
import React from "react";

export const ImageSlideShow = ({
  imageData,
  imageSelectData,
  setImageSelect,
}) => {
  const handleSelectImage = (image) => {
    if (image === imageSelectData) {
      setImageSelect();
    } else {
      setImageSelect(image);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {imageData.map((item, index) => (
          <img
            key={index}
            src={item}
            width={imageData?.length > 6 ? 50 : 80}
            height={imageData?.length > 6 ? 50 : 80}
            style={{
              objectFit: "cover",
              cursor: "pointer",
              paddingRight: "3px",
              paddingLeft: "3px",
            }}
            alt="imageContent"
            onClick={() => handleSelectImage(item)}
          />
        ))}
      </Box>
      {imageSelectData && (
        <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={imageSelectData}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            alt="imageSelect"
          />
        </Box>
      )}
    </Box>
  );
};
