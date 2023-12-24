"use client";

import React from "react";

import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";

import cs from "../../../scss/helpers.module.scss";
import s from "./addPostEditor.module.scss";

import BlockQuoteSVG from "../../../../public/img/editor/blockquote.svg";
import BoldSVG from "../../../../public/img/editor/bold.svg";
import H1SVG from "../../../../public/img/editor/h1.svg";
import H2SVG from "../../../../public/img/editor/h2.svg";
import ItalicSVG from "../../../../public/img/editor/italic.svg";
import OlistSVG from "../../../../public/img/editor/olist.svg";
import UlistSVG from "../../../../public/img/editor/ulist.svg";
import RedoSVG from "../../../../public/img/editor/redo.svg";
import UndoSVG from "../../../../public/img/editor/undo.svg";
import StrikeSVG from "../../../../public/img/editor/strikethrough.svg";
import UnderlineSVG from "../../../../public/img/editor/underline.svg";

type EditorBarProps = {
  editor: Editor | null;
};
const EditorBar: React.FC<EditorBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={`${s.bar} ${cs.input}`}>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
          <H1SVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
          <H2SVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}>
          <BoldSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}>
          <ItalicSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}>
          <UnderlineSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}>
          <StrikeSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}>
          <UlistSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}>
          <OlistSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}>
          <BlockQuoteSVG />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <UndoSVG />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <RedoSVG />
        </button>
      </div>
    </div>
  );
};

type AddPostEditorProps = {
  setContent: (text: string, json: JSONContent) => void;
  isValidText: Record<string, string>;
};

export const AddPostEditor: React.FC<AddPostEditorProps> = ({ setContent, isValidText }) => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, Underline, ListItem],
    content: "",

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const text = editor.getText();

      setContent(text, json);
    },
  });

  const onContentFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const focusable = e.currentTarget.querySelector("[tabindex='0']") as HTMLElement;
    focusable?.focus();
  };

  return (
    <div className={`${s.root} ${cs.inputWrapper}`} {...isValidText}>
      <EditorBar editor={editor} />
      <EditorContent
        editor={editor}
        onFocus={onContentFocus}
        className={`${s.content} ${cs.article} ${cs.input}`}
        tabIndex={0}
      />
    </div>
  );
};
