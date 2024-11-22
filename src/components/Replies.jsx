import { db } from "@/utils/utilities";
import ReplyButton from "./ReplyButton";
import { getReplies } from "@/utils/serveraction";
import DeepReplies from "./DeepReplies";
import DeleteButton from "./DeleteButton";

export default async function Replies({ topicId, parentId }) {
  const replies = await getReplies(topicId, parentId);
  console.log(replies);
  return (
    <div>
      {replies.map((reply) => (
        <div key={reply.id} className={parentId !== 0 ? "ml-10" : ""}>
          <p>{reply.content}</p>
          <ReplyButton topicId={topicId} parentId={reply.id} />
          <DeleteButton
            to={`/talkingpoint/${topicId}`}
            type="reply"
            id={reply.id}
          />
          {reply.subreplies !== null &&
            reply.subreplies.map((subreply) => (
              <div key={subreply.id} className="ml-10">
                <p>{subreply.content}</p>
                <ReplyButton topicId={topicId} parentId={subreply.id} />
                <DeleteButton
                  to={`/talkingpoint/${topicId}`}
                  type="reply"
                  id={subreply.id}
                />
                <DeepReplies parentId={subreply.id} topicId={topicId} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
