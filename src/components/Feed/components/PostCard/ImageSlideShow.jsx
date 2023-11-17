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
            width={imageData?.length > 5 ? 50 : 100}
            height={imageData?.length > 5 ? 50 : 100}
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
            width={"100%"}
            style={{ objectFit: "contain", maxHeight: 500 }}
            alt="imageSelect"
          />
        </Box>
      )}
    </Box>
  );
};
