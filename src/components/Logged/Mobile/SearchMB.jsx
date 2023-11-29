import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  IconButton,
  InputBase,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddSearchKeyword, AddSearchPostId } from "../../../store/selectSlice";
import { handleGetSearchList } from "../../../services/getDataServices";
import { Close, SearchOutlined } from "@mui/icons-material";
import { setSearchMobile } from "../../../store/mobileSlice";

export const SearchMB = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBoxRef = useRef();
  const [showResults, setShowResults] = useState(false);
  const [dataSearch, setDataSearch] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== "") {
      const results = dataSearch.filter((item) =>
        item.label.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);

      if (e.key === "Enter") {
        const postArray = results.map((item) => item._id);
        if (postArray) {
          dispatch(AddSearchPostId(postArray));
          navigate("/search");
        }
        setShowResults(false);
      }
    } else {
      setSearchResults();
      setShowResults(false);
    }
  };

  const handleButtonSearch = () => {
    const postArray = searchResults?.map((item) => item._id);
    if (postArray) {
      dispatch(AddSearchPostId(postArray));
      navigate("/search");
    }
  };

  useEffect(() => {
    handleGetSearchList(token)
      .then((response) => {
        console.log(response.data);
        setDataSearch(response.data.response.searchList);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Backdrop
      open={true}
      sx={{
        display: { xs: "block", sm: "none" },
        bgcolor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        left: "-14.4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          pt: 2,
        }}
        ref={searchBoxRef}
      >
        <IconButton
          sx={{ position: "absolute", width: 30, height: 30, right: "3%" }}
          onClick={() => {
            dispatch(setSearchMobile(false));
          }}
        >
          <Close sx={{ color: "#000" }} />
        </IconButton>
        <Typography
          sx={{
            bgcolor: "#007DFC",
            color: "#fff",
            fontSize: 14,
            fontWeight: 500,
            px: 1,
            height: 40,
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          ค้นหา
        </Typography>
        <InputBase
          ref={searchBoxRef}
          fullWidth
          placeholder="ช่วงนี้คุณเป็นยังไงบ้าง..."
          sx={{
            border: "1px solid #E7EAEE",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            height: 40,
            fontSize: 14,
            maxWidth: 250,
            width: "100%",
            pl: 2,
            pr: 1,
          }}
          endAdornment={
            <IconButton
              onClick={() => {
                handleButtonSearch();
                dispatch(setSearchMobile(false));
                setShowResults(false);
              }}
            >
              <SearchOutlined sx={{ color: "#000" }} />
            </IconButton>
          }
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              document.getElementById(`searchResult-${0}`)?.focus();
            } else if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        {showResults && (
          <Box
            sx={{
              position: "absolute",
              color: "#000",
              border: "1px solid #E7EAEE",
              bgcolor: "#fff",
              maxWidth: 300,
              width: "100%",
              top: 55,
              left: "50%",
              transform: "translate(-50%)",
              borderRadius: "8px",
              maxHeight: 182,
              overflow: "auto",
            }}
          >
            {searchResults?.map((item, index) => (
              <MenuItem
                key={item._id}
                onClick={() => {
                  if (item._id === null) {
                    dispatch(AddSearchKeyword(item?.label));
                  } else if (item._id) {
                    dispatch(AddSearchPostId([item?._id]));
                    dispatch(AddSearchKeyword(undefined));
                  }
                  setSearchTerm(item?.label);
                  setShowResults(false);
                  dispatch(setSearchMobile(false));
                  navigate(`/search`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (item._id === null) {
                      dispatch(AddSearchKeyword(item?.label));
                    } else if (item._id) {
                      dispatch(AddSearchPostId([item?._id]));
                      dispatch(AddSearchKeyword(undefined));
                    }
                    setSearchTerm(item?.label);
                    setShowResults(false);
                    dispatch(setSearchMobile(false));
                    navigate(`/search`);
                  } else if (e.key === "ArrowUp" && index > 0) {
                    // Handle arrow up
                    // Move focus to the previous item if it's not the first item
                    document
                      .getElementById(`searchResult-${index - 1}`)
                      ?.focus();
                  } else if (
                    e.key === "ArrowDown" &&
                    index < searchResults.length - 1
                  ) {
                    // Handle arrow down
                    // Move focus to the next item if it's not the last item
                    document
                      .getElementById(`searchResult-${index + 1}`)
                      ?.focus();
                  }
                }}
                role="button"
                tabIndex={0}
                id={`searchResult-${index}`}
              >
                <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.label}
                </div>
              </MenuItem>
            ))}
          </Box>
        )}
      </Box>
    </Backdrop>
  );
};
