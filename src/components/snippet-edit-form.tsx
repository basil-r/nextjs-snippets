"use client";

import type { Snippets } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormprops {
  snippet: Snippets;
}

export default function SnippetEditForm(props: SnippetEditFormprops) {
  const [code, setCode] = useState(props.snippet.code);

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetActions = actions.editSnippet.bind(
    null,
    props.snippet.id,
    code
  );

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetActions}>
        <button className="p-2 border rounded" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
