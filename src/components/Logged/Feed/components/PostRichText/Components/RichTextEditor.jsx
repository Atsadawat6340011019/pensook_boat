import React, { useEffect, useState } from "react";
import {
  $createTextNode,
  $getRoot,
  $createParagraphNode,
  TextNode,
  $getSelection,
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
import { Box, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { IoMdCodeWorking } from "react-icons/io";

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
      const selection = $getSelection();

      selection.insertText(
        ".....................................................................................................................\n"
      );
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

function ToolbarPlugin() {
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
      <Box></Box>
      <Box sx={{ pr: 6 }}>
        <ListToolbarPlugin />
        <LinePlugin />
      </Box>
    </Box>
  );
}

export const RichTextEditor = ({ setContent }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [ListNode, ListItemNode, TextNode],
  };

  const [editorState, setEditorState] = useState();

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
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={
          <div className="placeholder">ช่วงนี้คุณเป็นยังไงบ้าง....</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
      <ListPlugin />
      <ToolbarPlugin />
    </LexicalComposer>
  );
};
