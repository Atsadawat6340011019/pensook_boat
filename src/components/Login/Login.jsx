import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import shape from "../../assets/bgLogin/shape.png";
import shape1 from "../../assets/bgLogin/shape1.png";
import LogoPensook from "../../assets/LogoPensook.png";
import { FcGoogle } from "react-icons/fc";
import { Checkbox, Divider, IconButton, Modal } from "@mui/material";
import { ArrowBackIosNewRounded, Close } from "@mui/icons-material";
import { auth, googleAuthProvider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { handleCreateUser, handleLogin } from "../../services/authServices";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 858,
  height: 761,
  bgcolor: "background.paper",
  borderRadius: 10,
  p: 4,
};

export const Login = () => {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleLoginByGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        console.log(result);
        const { additionalUserInfo } = result;
        const { user } = result;
        const idToken = await user.getIdTokenResult();
        const nameParts = user.displayName.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");
        console.log("isNewUser", additionalUserInfo.isNewUser);
        if (additionalUserInfo.isNewUser) {
          console.log("isNewUser", additionalUserInfo.isNewUser);
          const googleImage = user.photoURL;
          const coverttobase64 = async (image) => {
            try {
              const response = await fetch(image);
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch the image. Status: ${response.status}`
                );
              }

              const blob = await response.blob();

              return new Promise((resolve) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                  resolve(reader.result);
                };

                reader.readAsDataURL(blob);
              });
            } catch (error) {
              throw new Error(`An error occurred: ${error.message}`);
            }
          };

          coverttobase64(googleImage)
            .then(async (base64) => {
              try {
                const createUser = await handleCreateUser(
                  user.email,
                  firstName,
                  lastName,
                  base64
                );
                console.log("สร้างโปรไฟล์", createUser);

                if (createUser.status === "success") {
                  const loginRespone = await handleLogin(
                    user.email,
                    idToken.token
                  );
                  console.log("เข้าสู่ระบบ", loginRespone);

                  if (loginRespone.status === "success") {
                    const googleToken = idToken.token;
                    localStorage.setItem("token", JSON.stringify(googleToken));
                    navigate("/feed");
                  }
                }
              } catch (error) {
                console.error(error);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          const loginRespone = await handleLogin(user.email, idToken.token);
          console.log(loginRespone);
          if (loginRespone.status === "success") {
            const googleToken = idToken.token;
            localStorage.setItem("token", JSON.stringify(googleToken));
            navigate("/feed");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", left: 0, width: 60, height: 60 }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNewRounded
              sx={{ width: 56, height: 56, color: "#000" }}
            />
          </IconButton>
          <img
            src={LogoPensook}
            style={{ width: 229, height: 55, objectFit: "cover" }}
            alt="LogoPensook"
          />

          <Typography
            align="center"
            sx={{ fontWeight: "500", fontSize: 18, pt: 15, pb: 10, width: 200 }}
          >
            เข้าสู่ระบบเพื่อถามคำถาม เกี่ยวกับสุขภาพที่คุณสงสัย
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              maxWidth: 466,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "600",
            }}
            startIcon={<FcGoogle />}
            disabled={!checked}
            onClick={handleLoginByGoogle}
          >
            Continue with Google
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 10,
            }}
          >
            <Checkbox checked={checked} onChange={handleChange} />
            <Typography sx={{ color: "#000" }}>
              ยอมรับ
              <Typography
                sx={{
                  color: "#007DFC",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                variant="span"
                component="span"
                onClick={() => setModalOpen(true)}
              >
                เงื่อนไข
              </Typography>
              ทุกอย่าง
            </Typography>
          </Box>
          <Typography align="center" sx={{ color: "#000", maxWidth: 500 }}>
            <Typography
              sx={{
                color: "#007DFC",
              }}
              variant="span"
              component="span"
            >
              Pensook health care technology Co.,Ltd
            </Typography>{" "}
            เป็นบริษัท health care startup ของประเทศไทย
            ที่มีความมุ่งหวังอยากจะทำให้ผู้คน มีคุณภาพชีวิตที่ดี
            เข้าถึงการรักษาพยาบาลได้ง่าย และมีอายุขัยที่ยืนยาวขึ้น
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        style={{
          background:
            "linear-gradient(232.86deg, #7CCAFE 40.91%, rgba(139, 146, 255, 0.83) 89.49%)",
        }}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            opacity: { xs: "0%", sm: "100%" },
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <img
            style={{ position: "absolute", right: 0, bottom: 0 }}
            src={shape}
            alt="shapeImage"
          />
        </Box>

        <Box
          sx={{
            opacity: { xs: "0%", sm: "100%" },
            position: "absolute",
            right: "60%",
            top: 0,
          }}
        >
          <img src={shape1} alt="shapeImage" />
        </Box>
        <Box
          sx={{
            width: 500,
            color: "#fff",
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: 60, lineHeight: 1 }}>
            Welcome to our community
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: 18, pt: 2, pl: 1 }}>
            ชีวิตดี ๆ เริ่มต้นที่ เป็นสุข
          </Typography>
        </Box>
      </Grid>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", right: 20, width: 56, height: 56 }}
            onClick={() => setModalOpen(false)}
          >
            <Close sx={{ width: 56, height: 56, color: "#000" }} />
          </IconButton>
          <Grid container>
            <Grid item>
              <DescriptionOutlinedIcon
                sx={{ width: 67, height: 67, color: "#007DFC" }}
              />
            </Grid>
            <Grid item>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "#4F4F4F" }}
              >
                ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์
              </Typography>
              <Typography sx={{ color: "#4F4F4F" }}>
                ปรับปรุง ณ วันที่ 13 พฤศจิกายน 2566
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box overflow={"auto"} height={600}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ข้อกำหนดและเงื่อนไขนี้ (“ข้อกำหนด”) ควบคุมการใช้งานเว็บไซต์
              PENSOOK ซึ่งรวมถึงหน้าทั้งหมดในเว็บไซต์นี้ รวมเรียกว่า “เว็บไซต์
              PENSOOK” ของท่าน ภายใต้การเป็นเจ้าของและดำเนินการโดยบริษัท เป็นสุข
              เฮลท์แคร์ เทคโนโลยี จำกัด ในข้อกำหนดนี้ คำว่า "บริษัท" "ของเรา"
              หรือ "เรา" อ้างถึง บริษัท เป็นสุข เฮลท์แคร์ เทคโนโลยี จำกัด และ
              "ท่าน" หรือ "ของท่าน" อ้างถึง ท่านผู้ใช้งานเว็บไซต์ PENSOOK
            </Typography>
            <Typography
              component="h3"
              sx={{ fontSize: 20, color: "#4F4F4F", mt: 2 }}
            >
              ข้อตกลงของข้อกำหนด
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              การเข้าถึงหรือการใช้เว็บไซต์ PENSOOK
              เป็นการยอมรับการผูกพันตามข้อกำหนดเหล่านี้
              หากท่านไม่ตกลงตามข้อกำหนดเหล่านี้
              ท่านจะไม่ได้รับอนุญาตอย่างชัดเจนในการใช้เว็บไซต์ PENSOOK
              และต้องหยุดการใช้งานโดยทันที
              บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงหรือแก้ไขข้อกำหนดเหล่านี้ได้ทุกเมื่อตามดุลพินิจของเราแต่เพียงผู้เดียว
              ข้อกำหนดใดที่มีการแก้ไขแล้วจะมีผลบังคับใช้ทันทีหลังจากการลงประกาศ
              ดังนั้นเป็นความรับผิดชอบของท่านที่ควรตรวจสอบข้อกำหนดเหล่านี้เป็นระยะเพื่อรับทราบการเปลี่ยนแปลงที่อาจเกิดขึ้น
              หากท่านยังคงใช้งานเว็บไซต์ PENSOOK หลังจากการลงประกาศ
              ถือว่าท่านยอมรับการเปลี่ยนแปลงหรือแก้ไขดังกล่าว
            </Typography>
            <Typography
              component="h3"
              sx={{ fontSize: 20, color: "#4F4F4F", mt: 2 }}
            >
              นโยบายสิทธิส่วนบุคคล
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ขอขอบพระคุณท่านผู้ใช้บริการทุกท่าน ที่เข้ามาเยี่ยมชมและใช้บริการ
              ทำธุรกรรมต่าง ๆ ผ่านเว็บไซต์ของบริษัท
              เพื่อเป็นการสร้างความเชื่อมั่น
              และทำความเข้าใจเกี่ยวกับการใช้บริการเว็บไซต์ของเรา
              เราขอเรียนว่าบริษัทมีนโยบาย
              ในการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้บริการทุกท่านโดยสังเขปดังนี้
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; ข้อมูลส่วนบุคคล (Privacy notes)
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              ข้อมูลส่วนบุคคลที่ท่านได้ให้
              หรือใช้ผ่านการประมวลผลของเครื่องคอมพิวเตอร์
              ที่ควบคุมการทำงานของเว็บไซต์ของบริษัททั้งหมดนั้น
              ท่านยอมรับและตกลงว่าเป็นสิทธิ และกรรมสิทธิ์ของบริษัท
              ซึ่งบริษัทจะให้ความคุ้มครองความลับดังกล่าวอย่างดีที่สุด
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; ความไม่เป็นตัวแทนข้อมูลข่าวสาร (Disclaimer policy)
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              ข้อมูลที่บริษัทได้รับจากท่าน บริษัทจะนำมาพัฒนาแก้ไข
              ปรับปรุงเพื่อให้บริการเว็บไซต์ของบริษัทมีประสิทธิภาพ
              และก่อให้เกิดประโยชน์สูงสุดแก่ผู้ใช้บริการ การนำเสนอข้อมูล ข่าวสาร
              บทความ หรือข้อความอื่นใดทั้งหมดในเว็บไซต์นี้เป็นเพียงการให้บริการ
              รวบรวมข้อมูล ความรู้ ฐานข้อมูลทางวิชาการ และความรู้ด้านต่าง ๆ
              รวมทั้งเป็นเวทีแสดงความคิดเห็น หรือแลกเปลี่ยน ข้อมูลข่าวสาร
              ระหว่างผู้ใช้บริการด้วยกันเท่านั้น ดังนั้น
              บริษัทจึงไม่รับรองความถูกต้องของบรรดาข้อมูล ข่าวสาร บทความ ภาพ
              หรือข้อความอื่นใดกำหนดในเว็บไซต์นี้ หรือลิงก์ต่าง ๆ
              ทั้งทางตรงและทางอ้อม ทั้งนี้
              บริษัทจะไม่รับผิดชอบในความผิดพลาดที่อาจเกิดขึ้นจากการใช้ข้อมูลดังกล่าว
              ข้างต้น ไม่ว่าจะเป็นการสื่อความหมาย
              หรือเพื่อวัตถุประสงค์ใดโดยเฉพาะ
              และบริษัทมีสิทธิที่จะระงับหรืองดการนำเสนอข้อมูลดังกล่าวข้างต้น
              โดยไม่จำต้องบอกกล่าวล่วงหน้า บริษัทขอเรียนว่า บริษัทไม่ใช่ตัวแทน
              ห้างหุ้นส่วน หรือบุคคลที่มีนิติสัมพันธ์ใด ๆ กับเจ้าของข้อมูล
              ข่าวสาร บทความ หรือข้อความใด ๆ ซึ่งปรากฏอยู่บนเว็บไซต์ของบริษัท
              บริษัทขอเรียนว่าเว็บไซต์นี้เป็นเพียงสื่อกลางที่ใช้ในการส่งผ่านข้อมูล
              ระหว่าง ผู้ใช้บริการ และเจ้าของข้อมูลข่าวสาร ในด้านต่าง ๆ เท่านั้น
              โดยบริษัทไม่สามารถตรวจสอบ หรือทราบถึงแหล่งที่มา และ /
              หรือรายละเอียด ของเนื้อหา ทั้งหมดของเว็บไซต์
              ดังนั้นการนำเสนอข้อมูลดังกล่าวหาก ก่อให้เกิดความเสียหาย
              แก่ผู้ใช้บริการ หรือบุคคลภายนอก จึงไม่ก่อให้เกิดสิทธิ ความรับผิด
              และ / หรือ ภาระผูกพันทางกฎหมายไม่ว่ากรณีใด ๆ ทั้งสิ้น
              ระหว่างบริษัท เจ้าของข้อมูลข่าวสาร ผู้ใช้บริการ สมาชิกของเว็บไซต์
              และบุคคลภายนอก
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; ลิขสิทธิ์ตามกฎหมาย (Copyrights)
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              บริษัทขอแจ้งให้ผู้ใช้บริการทั่วไปทราบว่า บรรดาข้อความ ภาพ เสียง
              เนื้อหา ส่วนประกอบใด ๆ ทั้งหมดของเว็บไซต์
              โดยให้หมายรวมถึงเครื่องหมายการค้า เครื่องหมายบริการ ชื่อ
              ชื่อทางการค้า สิทธิบัตร โนว์ฮาว (Know How) ทรัพย์สินทางปัญญา ฯลฯ
              ที่ปรากฏบนเว็บไซต์ของบริษัทนี้
              เป็นงานอันได้รับความคุ้มครองตามกฎหมายทรัพย์สินทางปัญญาของไทยโดยชอบด้วยกฎหมายของบริษัท
              แต่เพียงผู้เดียว หากบุคคลใด ลอกเลียน ปลอมแปลง ทำซ้ำ ดัดแปลง
              เผยแพร่ต่อสาธารณชน จำหน่าย มีไว้ให้เช่า หรือ กระทำการใด ๆ
              ในลักษณะที่เป็นการแสวงหาประโยชน์ทางการค้า หรือ ประโยชน์โดยมิชอบ
              ไม่ว่าโดยประการใด ๆ จากทรัพย์สินทางปัญญา ดังกล่าวข้างต้น
              โดยไม่ได้รับอนุญาตจากบริษัท บริษัทจะดำเนินการตามกฎหมาย
              กับผู้ละเมิดสิทธิดังกล่าวโดยทันที
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; การจำกัดความรับผิด
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              ผู้ใช้บริการทราบและยอมรับว่า การใช้บริการผ่านเว็บไซต์ของบริษัท
              ถือเป็นความเสี่ยงของผู้ใช้บริการแต่เพียงผู้เดียว
              บริษัทจะไม่รับผิดชอบต่อความเสียหายใด ๆ ไม่ว่าโดยทางตรงหรือทางอ้อม
              ความเสียหายอันเป็นผลต่อเนื่อง ความเสียหายเชิงลงโทษ การสูญเสียกำไร
              ผลประโยชน์ ข้อมูล หรือความสูญเสียอื่น ๆ
              ทั้งที่จับต้องได้และที่ไม่สามารถจับต้องได้อันเป็นผลอันเนื่องมาจากการใช้บริการ
              การส่งต่อข้อมูล หรือการเข้ามาใช้บริการโดยไม่ได้รับอนุญาต
              หรือเนื้อหาสาระใด ๆ ที่เกี่ยวข้องกับบริการ
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; เว็บไซต์ของบุคคลภายนอก
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              เว็บไซต์ PENSOOK
              อาจมีการเชื่อมต่อไปยังเว็บไซต์อื่นที่ดำเนินการโดยบุคคลภายนอก
              ("เว็บไซต์ของบุคคลภายนอก")
              โดยเว็บไซต์ของบุคคลภายนอกเหล่านี้ไม่อยู่ภายใต้การควบคุมของบริษัท
              และท่านยอมรับและรับทราบว่าเราไม่มีส่วนรับผิดชอบต่อความถูกต้อง
              การปฏิบัติตามลิขสิทธิ์ ความถูกต้องตามกฎหมาย ความเหมาะสม
              หรือลักษณะอื่นใดของเนื้อหาบนเว็บไซต์ของบุคคลภายนอกดังกล่าว
              การที่มีลิงก์ของเว็บไซต์ของบุคคลภายนอกดังกล่าวในเว็บไซต์ PENSOOK
              ไม่ได้หมายความว่าเว็บไซต์ของบุคคลภายนอกได้รับการอนุมัติหรือรับรองจากเรา
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; การลงทะเบียนผู้ใช้งาน
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              ท่านอาจต้องทำการลงทะเบียนเพื่อเข้าใช้งานเว็บ PENSOOK
              ท่านยอมรับที่จะเก็บรักษารหัสผ่านของท่านไว้เป็นความลับและรับผิดชอบต่อการใช้งานทั้งหมดที่เกิดขึ้นภายใต้บัญชีและรหัสผ่านของท่าน
              บริษัทขอสงวนสิทธิ์ในการลบ เรียกคืน
              หรือเปลี่ยนแปลงชื่อผู้ใช้งานที่ท่านเลือก
              หากบริษัทพิจารณาตามที่เห็นสมควรแต่เพียงผู้เดียวว่าชื่อผู้ใช้งานดังกล่าวไม่เหมาะสม
              ไม่สุภาพ หรือน่ารังเกียจ
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "#4F4F4F" }}
            >
              &nbsp; การสิ้นสุดการใช้งาน
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }}>
              บริษัทขอสงวนสิทธิ์ในการยกเลิกบัญชีของท่านหรือการเข้าถึงเว็บไซต์
              PENSOOK ไม่ว่าด้วยเหตุผลใด ๆ ตามดุลพินิจของบริษัทแต่เพียงผู้เดียว
              ถ้าพิจารณาว่าการใช้งานของท่านไม่เหมาะสม
              หรือในกรณีที่ท่านฝ่าฝืนข้อกำหนดเหล่านี้
              บริษัทอาจทำการแจ้งเตือนหรือไม่แจ้งให้ทราบก่อนการยกเลิกการใช้งานเว็บไซต์ของท่าน
              หากบริษัทยกเลิก หรือระงับบัญชีของท่านไม่ว่าด้วยเหตุผลใด ๆ ก็ตาม
              ท่านไม่ได้รับอนุญาตให้ลงทะเบียน และสร้างบัญชีใหม่ภายใต้ชื่อของท่าน
              ชื่อปลอมหรือชื่อที่ยืมมา หรือชื่อของบุคคลภายนอก
              แม้ว่าท่านจะกระทำแทนบุคคลภายนอกก็ตาม นอกจากการยกเลิก
              หรือการระงับบัญชีของท่าน
              บริษัทขอสงวนสิทธิ์ในการดำเนินการที่เหมาะสมตามกฎหมาย
              ซึ่งรวมถึงแต่ไม่จำกัดเพียงการดำเนินการทั้งทางแพ่ง อาญา
              และคำสั่งศาล
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};
