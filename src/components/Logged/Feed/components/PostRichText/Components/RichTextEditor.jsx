import React, { useEffect, useState } from "react";
import {
  $createTextNode,
  $getRoot,
  $createParagraphNode,
  TextNode,
  $getSelection,
  FORMAT_ELEMENT_COMMAND,
  INSERT_LINE_BREAK_COMMAND,
  INSERT_TAB_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
} from "lexical";
import "./styles.css";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {
  ListNode,
  ListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { Box, IconButton, Menu, Modal } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { IoMdCodeWorking } from "react-icons/io";
import { ImageNode } from "../Nodes/ImageNode";
import ImagesPlugin, { InsertImageDialog } from "../Plugin/ImagePlugin";
import {
  Close,
  CropOriginal,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { MaxLengthPlugin } from "../Plugin/MaxLengthPlugin";
import { addClassNamesToElement } from "@lexical/utils";
import {
  INSERT_SPLIT_COMMAND,
  SplitNode,
  SplitPlugin,
} from "../Plugin/SpiltPlugin";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoLinkNode } from "@lexical/link";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

const theme = {
  // Theme styling goes here
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  console.error(error);
}

function LinePlugin() {
  const [editor] = useLexicalComposerContext();

  function update() {
    editor.update(() => {
      const root = $getRoot;
      const selection = $getSelection();
      editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND);
      selection.insertText(
        ".....................................................................................................................\n"
      );

      //editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
      editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND);
    });
  }
  return (
    <IconButton onClick={update}>
      <IoMdCodeWorking color="#000" />
    </IconButton>
  );
}

function ListToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [select, setSelect] = useState(true);

  const onClick = () => {
    setSelect(!select);
    if (select === true) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (select === false) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  return (
    <>
      <IconButton onClick={() => onClick()}>
        <FormatListBulletedIcon sx={{ color: "#000", width: 24, height: 24 }} />
      </IconButton>
    </>
  );
}

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    return text;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

function ToolbarPlugin({ setModalUploadImage, content }) {
  const [editor] = useLexicalComposerContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("1f60a");

  function countImgTags(htmlString) {
    const div = document.createElement("div");
    div.innerHTML = htmlString;

    const imgTags = div.querySelectorAll("img");

    const imgCount = imgTags.length;

    return imgCount;
  }

  function update(emoji) {
    editor.update(() => {
      const selection = $getSelection();
      selection.insertText(emoji);

      //editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
    });
  }

  function onClick(emojiData, event) {
    setSelectedEmoji(emojiData.unified);
    update(emojiData.emoji);
  }

  return (
    <Box
      sx={{
        width: 750,
        height: 50,
        border: "1px #808080 solid",
        borderRadius: "8px",
        position: "absolute",
        bottom: -50,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ pl: 6 }}>
        <IconButton
          onClick={() => setModalUploadImage(true)}
          disabled={countImgTags(content) >= 10}
        >
          <CropOriginal
            sx={{
              color: countImgTags(content) >= 10 ? "#cdcdcd" : "#000",
              width: 24,
              height: 24,
            }}
          />
        </IconButton>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <SentimentSatisfiedAlt sx={{ color: "#000" }} />
        </IconButton>
      </Box>
      <Box sx={{ pr: 6 }}>
        <ListToolbarPlugin />
        <LinePlugin />
      </Box>
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: -70,
          horizontal: 80,
        }}
        transformOrigin={{
          vertical: "-50",
          horizontal: "center",
        }}
      >
        <div
          style={{
            width: "317px",
            height: "30px",
            position: "relative",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => setAnchorEl(null)}
            aria-label="close"
            sx={{ position: "absolute", top: -10, right: 0 }}
          >
            <Close />
          </IconButton>
        </div>
        <EmojiPicker
          height={400}
          width={310}
          skinTonesDisabled={true}
          onEmojiClick={onClick}
          emojiStyle={EmojiStyle.NATIVE}
        />
      </Menu>
    </Box>
  );
}

export const RichTextEditor = ({ setContent, content, errorNoti }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [ListNode, ListItemNode, TextNode, ImageNode, AutoLinkNode],
  };

  const [editorState, setEditorState] = useState();
  const [modalUploadImage, setModalUploadImage] = useState(false);

  function onChange(editorState, editor) {
    setEditorState(editorState);
    editor.update(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null);
      setContent(rawHTML);
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="contentEditable" autoFocus="none" />
        }
        placeholder={
          errorNoti === "กรุณาใส่เนื้อหา" ? (
            <div className="placeholder" style={{ pointerEvents: "none" }}>
              กรุณาใส่เนื้อหา
            </div>
          ) : (
            <div className="placeholder" style={{ pointerEvents: "none" }}>
              เนื้อหา....
            </div>
          )
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
      <ListPlugin />
      <ImagesPlugin captionsEnabled={false} />
      <MaxLengthPlugin maxLength={3000} />
      <AutoLinkPlugin matchers={MATCHERS} />

      <ToolbarPlugin
        content={content}
        setModalUploadImage={setModalUploadImage}
      />
      <Modal open={modalUploadImage} onClose={() => setModalUploadImage(false)}>
        <InsertImageDialog onClose={() => setModalUploadImage(false)} />
      </Modal>
    </LexicalComposer>
  );
};
