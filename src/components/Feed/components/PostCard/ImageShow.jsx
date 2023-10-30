import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export const ImageShow = ({ imageData }) => {
  return (
    <Box>
      {imageData.length === 1 && (
        <Grid container>
          <Grid item xs={12}>
            <img
              src={imageData[0]}
              style={{ objectFit: "cover" }}
              width={600}
              height={300}
              alt="contentImage"
            />
          </Grid>
        </Grid>
      )}
      {imageData.length === 2 && (
        <Grid container>
          <Grid item xs={6}>
            <img
              src={imageData[0]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[1]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
        </Grid>
      )}
      {imageData.length === 3 && (
        <Grid container>
          <Grid item xs={12}>
            <img
              src={imageData[0]}
              width={600}
              height={300}
              style={{ objectFit: "cover" }}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[1]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[2]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
        </Grid>
      )}
      {imageData.length === 4 && (
        <Grid container>
          <Grid item xs={6}>
            <img
              src={imageData[0]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[1]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[2]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[3]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
        </Grid>
      )}
      {imageData.length > 4 && (
        <Grid container>
          <Grid item xs={6}>
            <img
              src={imageData[0]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[1]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={imageData[2]}
              width={300}
              height={300}
              alt="contentImage"
            />
          </Grid>
          <Grid item xs={6} sx={{ position: "relative" }}>
            <img
              src={imageData[3]}
              width={300}
              height={300}
              style={{ opacity: "70%" }}
              alt="contentImage"
            />
            <Typography
              sx={{
                position: "absolute",
                top: "40%",
                left: "40%",
                fontSize: 48,
                fontWeight: "500",
              }}
            >
              + {imageData.length - 4}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
