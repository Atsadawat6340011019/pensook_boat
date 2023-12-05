import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LogoPensook from "../../assets/LogoPensook.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Button from "@mui/material/Button";

export default function Interest({ interestContactCategory, interestArray }) {
  const [selectType, setSelectType] = React.useState("");

  const [HoverCard, setHoverCard] = React.useState(null);

  const handleChange = (event) => {
    setSelectType(event.target.value);
  };

  const [selectedTitle, setSelectedTitle] = React.useState([]);

  const handleTitleClick = (index) => {
    const isSelected = selectedTitle.includes(index);

    if (isSelected) {
      setSelectedTitle((prevSelectedTitle) =>
        prevSelectedTitle.filter((cardIndex) => cardIndex !== index)
      );
    } else {
      if (selectedTitle.length < 3) {
        setSelectedTitle((prevSelectedTitle) => [...prevSelectedTitle, index]);
      }
    }
  };

  const isTitleSelected = (index) => {
    return selectedTitle.includes(index);
  };

  const Checkmark = (index) => {
    if (isTitleSelected(index)) {
      return (
        <Box
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            color: "#007DFC",
          }}
        >
          <CheckCircleIcon fontSize="27" />
        </Box>
      );
    }
    return null;
  };

  const cardTitle = [
    { text: "โรคซึมเศร้า" },
    { text: "โรคหัวใจ" },
    { text: "โรคมะเร็ง" },
    { text: "โรคไต" },
    { text: "โรคภูมิแพ้" },
    { text: "โรคในเด็ก" },
    { text: "เทคโนโลยีการแพทย์" },
    { text: "โรคระบาด" },
  ];

  const handleInterestClick = () => {
    if (selectedTitle.length === 3 && selectType) {
      const userData = {
        contactCategory: selectType,
        interestArray: selectedTitle.map((index) => interestArray[index].text),
      };

      console.log(userData);
    } else {
      console.log("กรุณาเลือกทุกข้อ");
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: "15px",
          paddingTop: "0px",
          maxWidth: "650px",
          margin: "0px",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          <img
            src={LogoPensook}
            style={{ width: 229, height: 55, objectFit: "cover" }}
            alt="logoPensook"
          />
        </Typography>
        <Typography variant="h5" sx={{ pt: 3 }}>
          วันนี้คุณอยากค้นหาข้อมูลเกี่ยวกับอะไร ?
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", pt: 1, pb: 5 }}>
          บอกเราเพื่อเราแนะนำสิ่งที่คุณต้องการได้ถูกต้อง
        </Typography>
        <Typography sx={{ pb: 1 }}>คุณคือบุคคลใด</Typography>
        <FormControl sx={{ width: "23vw", pb: 5 }}>
          <InputLabel id="demo-simple-select-label">เลือก</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="selectType"
            value={selectType}
            label="เลือก"
            onChange={handleChange}
          >
            {interestContactCategory.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", pb: 1, pt: 1 }}>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            เลือกสิ่งที่คุณสนใจ
            <Typography
              variant="caption"
              sx={{ marginLeft: 1 }}
              color="#007DFC"
            >
              (อย่างน้อย 3)
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            {interestArray.map((interest, index) => (
              <Grid item xs={3} key={index} sx={{ p: 1, mb: 8 }}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "200%",
                    position: "relative",
                    backgroundImage: `url(${interest.image})`,
                    backgroundSize: "cover",
                    transition: "transform 0.2s",

                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => handleTitleClick(index)}
                  onMouseEnter={() => setHoverCard(index)}
                  onMouseLeave={() => setHoverCard(null)}
                >
                  {HoverCard === index && (
                    <Box
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        color: "#007DFC",
                      }}
                    >
                      <CircleOutlinedIcon fontSize="27" />
                    </Box>
                  )}
                  {Checkmark(index)}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      textAlign: "center",
                      height: "100%",
                    }}
                  >
                    <CardContent></CardContent>
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "rgba(211, 211, 211, 0.8)",
                        width: "100%",
                        color: "#007DFC",
                        fontWeight: "bold",
                      }}
                    >
                      {interest.name}
                    </Typography>
                  </Box>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", pb: 4, pt: 7, width: "60%" }}>
        <Button
          variant="contained"
          disabled={selectedTitle.length !== 3}
          onClick={handleInterestClick}
          sx={{ width: "60%" }}
        >
          ถัดไป
        </Button>
      </Box>
    </React.Fragment>
  );
}
