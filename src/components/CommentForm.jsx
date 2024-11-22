import { handleSubmit } from "@/utils/serveraction";
export default function CommentForm({ topicId, parentId }) {
  return (
    <div>
      <form action={handleSubmit}>
        <textarea type="text" name="reply" maxLength={144} />
        <input type="hidden" name="topicId" value={topicId} />
        <input type="hidden" name="parentId" value={parentId} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
