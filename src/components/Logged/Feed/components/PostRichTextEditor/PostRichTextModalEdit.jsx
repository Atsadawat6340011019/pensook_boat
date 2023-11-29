import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Switch,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RichTextEditor } from "./Components/RichTextEditor";
import LogoPensook from "../../../../../assets/PENSOOK_logo_32.png";
import {
  handleCreatePost,
  handleUpdatePost,
} from "../../../../../services/feedServices";
import { Oval } from "react-loader-spinner";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  height: 785,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 23,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#007DFC" : "#007DFC",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 10,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const PostRichTextModalEdit = forwardRef(
  ({
    ModalRef,
    onClose,
    setReflesh,
    html,
    label,
    editorToggle,
    postId,
    anonymous,
  }) => {
    const userData = useSelector((state) => state.user.userData);
    const token = localStorage.getItem("token");
    const [content, setContent] = useState();
    const [labelText, setLabelText] = useState(label);
    const [isAnonymous, setIsAnonymous] = useState(anonymous);
    const [errorNoti, setErrorNoti] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [htmlBase64, setHtmlBase64] = useState();

    useEffect(() => {
      if (content === "<p><br></p>") {
        setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    }, [content]);

    function replaceParagraphsWithCenterAlignment(htmlText) {
      return htmlText.replace(
        /<p>/g,
        '<p style="text-align: center;" classname="spilt">'
      );
    }

    const extractImgSrc = (htmlString) => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlString, "text/html");

      var imgElements = doc.querySelectorAll("img");

      var imgSrcArray = [];
      imgElements.forEach(function (imgElement) {
        var src = imgElement.getAttribute("src");
        if (src) {
          imgSrcArray.push(src);
        }
      });

      return imgSrcArray;
    };

    async function imageUrlToBase64(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    async function replaceImageUrlsWithBase64(html) {
      const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
      const matches = html.match(imgRegex);

      if (matches) {
        for (const match of matches) {
          const imageUrl = match.match(/src="([^"]+)"/)[1];
          try {
            const base64String = await imageUrlToBase64(imageUrl);
            const updatedImgTag = match.replace(
              imageUrl,
              `data:image/png;base64,${base64String}`
            );
            html = html.replace(match, updatedImgTag);
          } catch (error) {
            console.error(error);
          }
        }
      }

      return html;
    }

    useEffect(() => {
      replaceImageUrlsWithBase64(html)
        .then((resultHtml) => {
          setHtmlBase64(resultHtml);
        })
        .catch((error) => console.error(error));
    }, []);

    const filterConsecutiveEmptyParagraphs = (htmlString, maxConsecutive) => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlString, "text/html");

      var pElements = doc.querySelectorAll("p");
      var consecutiveEmptyCount = 0;

      pElements.forEach(function (pElement) {
        if (
          pElement.children.length === 1 &&
          pElement.children[0].tagName.toLowerCase() === "br"
        ) {
          consecutiveEmptyCount++;

          if (consecutiveEmptyCount > maxConsecutive) {
            pElement.remove();
          }
        } else {
          consecutiveEmptyCount = 0;
        }
      });

      var updatedHTML = doc.documentElement.innerHTML;
      return updatedHTML;
    };

    const addHttpsToHref = (htmlText) => {
      return htmlText.replace(/href="www\./g, 'href="https://www.');
    };

    const addTargetBlankToAllLinks = (htmlText) => {
      return htmlText.replace(/<a/g, '<a target="_blank"');
    };

    const handleSubmit = async () => {
      const cutBrContent = filterConsecutiveEmptyParagraphs(content, 1);
      const linkContent = addHttpsToHref(cutBrContent);
      const linkTargetContent = addTargetBlankToAllLinks(linkContent);

      const AllContent = {
        postId: postId,
        isAnonymous: isAnonymous,
        label: labelText,
        content: replaceParagraphsWithCenterAlignment(linkTargetContent),
        //attachImageArr: extractImgSrc(content),
      };
      setLoading(true);
      setButtonDisable(true);
      if (
        AllContent?.label &&
        !(
          AllContent.content ===
          `<head></head><body><p style="text-align: center;"><br></p></body>`
        )
      ) {
        try {
          const postData = await handleUpdatePost(token, AllContent);
          console.log(postData);
          if (postData.response.status === "success") {
            setReflesh(Math.floor(Math.random() * 101));
            setTimeout(() => {
              setLoading(false);
              onClose();
            }, 1000);
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาด:", error.error);
        }
      } else if (!AllContent.label) {
        setErrorNoti("กรุณาใส่หัวข้อ");
        setButtonDisable(false);
        setTimeout(() => {
          setErrorNoti("");
        }, 2000);
      } else if (
        AllContent.content ===
        `<head></head><body><p style="text-align: center;"><br></p></body>`
      ) {
        setErrorNoti("กรุณาใส่เนื้อหา");
        setButtonDisable(false);
        setTimeout(() => {
          setErrorNoti("");
        }, 2000);
      }
    };

    return (
      <Box sx={style} ref={ModalRef}>
        {loading && (
          <Box sx={{ position: "absolute", top: "50%", zIndex: 10 }}>
            <Oval
              height={80}
              width={80}
              color="#007DFC"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#007DFC"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </Box>
        )}

        <IconButton
          sx={{ position: "absolute", top: 15, right: 15 }}
          onClick={onClose}
        >
          <Close sx={{ color: "#000", width: 29, height: 29 }} />
        </IconButton>
        <Typography
          align="center"
          sx={{ fontWeight: "500", fontSize: 18, pt: 3 }}
        >
          แก้ไขโพสต์
        </Typography>
        {/*<Box
          sx={{
            border: "1px #808080 solid",
            borderRadius: "8px",
            height: 70,
            width: 750,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography
            align="center"
            sx={{ fontWeight: "400", fontSize: 16, px: 6 }}
          >
            โพสต์โดยไม่เปิดเผยตัวตน
          </Typography>
          <Box sx={{ px: 9 }}>
            <AntSwitch
              onClick={() => setIsAnonymous(!isAnonymous)}
              checked={isAnonymous}
              disabled
            />
          </Box>
        </Box>*/}
        <Box sx={{ height: 35 }}></Box>
        <Box
          sx={{
            maxWidth: 750,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", pl: { xs: 2, md: 0 } }}
          >
            <Avatar
              src={isAnonymous ? LogoPensook : userData.profileImagePath}
              sx={{ width: 40, height: 40 }}
              alt="avatar"
            />
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ fontWeight: "500", fontSize: 16 }}>
                {isAnonymous
                  ? "สมาชิกไม่เปิดเผยตัวตน"
                  : userData?.firstName + " " + userData?.lastName}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 103,
              height: 40,
              borderRadius: "8px",
              fontSize: 16,
              mr: { xs: 2, md: 0 },
            }}
            onClick={handleSubmit}
            disabled={buttonDisable}
          >
            แก้ไข
          </Button>
        </Box>
        <Box
          sx={{
            maxWidth: 750,
            width: "100%",
            mt: 3,
          }}
        >
          <InputBase
            placeholder={errorNoti ? errorNoti : "หัวข้อ"}
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            sx={{
              maxWidth: 750,
              width: "100%",
              px: 7,
              fontWeight: "500",
              fontSize: 42,
            }}
            inputProps={{ maxLength: 150 }}
            required
            autoFocus
          />
        </Box>
        <Box sx={{ maxWidth: 750, width: "100%", height: 380, mt: 3 }}>
          <Box sx={{ position: "relative", px: 7, height: 380 }}>
            {htmlBase64 && (
              <RichTextEditor
                content={content}
                setContent={setContent}
                errorNoti={errorNoti}
                html={htmlBase64}
                editorToggle={editorToggle}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);
