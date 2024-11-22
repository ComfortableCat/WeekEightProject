"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { handleSubmit } from "@/utils/serveraction";

export default function ReplyButton({ topicId, parentId }) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <button onClick={() => setShow(!show)}>Reply</button>
      ) : (
        <>
          <button onClick={() => setShow(!show)}>Hide</button>
          <CommentForm
            handleSubmit={handleSubmit}
            topicId={topicId}
            parentId={parentId}
          />
        </>
      )}
    </>
  );
}
