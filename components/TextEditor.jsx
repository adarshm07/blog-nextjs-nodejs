import {
  RichTextEditor,
  Link,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useDispatch } from "react-redux";
import { updateAction, updatePost } from "../store/postSlice";
import { useRouter } from "next/router";
import Image from "@tiptap/extension-image";
import { ImageUpload } from "./ImageUpload";
import ImageUploaderModal from "./ImageUploaderModal";
import { useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import Placeholder from "@tiptap/extension-placeholder";

function GetContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { editor } = useRichTextEditorContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = editor.getHTML();
    dispatch(updatePost(newPost));
    if (router.pathname?.toLowerCase().includes("addpost")) {
      dispatch(updateAction("addpost"));
    } else {
      dispatch(updateAction("editpost"));
    }
  };

  const handleDraft = (e) => {
    console.log("disabled");
  };

  return (
    <div>
      <button className="btn btn-sm btn-primary rounded" onClick={handleSubmit}>
        Publish
      </button>
      <button
        className="btn btn-sm btn-outlined-secondary rounded disabled"
        style={{ cursor: "not-allowed" }}
        onClick={handleDraft}
      >
        Draft
      </button>
    </div>
  );
}

export default function TextEditor({ content }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Image.configure({
        inline: true,
        resizable: true,
        allowAlignment: true,
        defaultAlignment: "left",
        defaultWidth: null,
        defaultHeight: null,
      }),
      Placeholder.configure({
        placeholder: "Write something here...",
      }),
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  async function addImage(file) {
    var formdata = new FormData();
    formdata.append("image", file[0], file[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch("http://localhost:8080/api/v1/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          editor.chain().focus().setImage({ src: result.data.path }).run();
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <button
              className="mantine-UnstyledButton-root mantine-RichTextEditor-control mantine-f6e83k"
              onClick={handleShowModal}
            >
              <IconUpload
                style={{
                  height: "14px",
                }}
              />
            </button>
            <ImageUploaderModal show={showModal} handleClose={handleCloseModal}>
              <ImageUpload onDrop={addImage} />
            </ImageUploaderModal>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          <GetContent />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
}
