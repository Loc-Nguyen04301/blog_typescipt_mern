import React from "react";
import ReactQuill from "react-quill";

interface IProps {
  body: string;
  setBody: (value: string) => void;
}

let container = [
  [{ font: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block", "link"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
];

const LiteQuill: React.FC<IProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container } };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Write somethings..."
      onChange={(e) => setBody(e)}
      value={body}
    />
  );
};

export default LiteQuill;
