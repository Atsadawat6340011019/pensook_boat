import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  EditorConfig,
  ElementNode,
  LexicalNode,
  createCommand,
} from "lexical";
import React from "react";

export class SplitNode extends ElementNode {
  static getType() {
    return "split";
  }
  static clone(node) {
    return new SplitNode(node.__key);
  }

  createDOM() {
    const element = document.createElement("div");

    return element;
  }
}

export function $createSplitNode() {
  return new SplitNode();
}

export function $isSplitNode() {
  return LexicalNode instanceof SplitNode();
}

export const INSERT_SPLIT_COMMAND = createCommand("INSERT_SPLIT");

export function SplitPlugin() {
  const [editor] = useLexicalComposerContext();
  editor.hasNodes([SplitNode]);
  editor.registerCommand(
    INSERT_SPLIT_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createSplitNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}
