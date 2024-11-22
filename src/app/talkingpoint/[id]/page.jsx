import CommentForm from "@/components/CommentForm";
import DeleteButton from "@/components/DeleteButton";
import Replies from "@/components/Replies";
import ReplyButton from "@/components/ReplyButton";
import { handleSubmit } from "@/utils/serveraction";
import { db } from "@/utils/utilities";

export default async function page({ params }) {
  const id = (await params).id;
  const result = (
    await db.query(
      "SELECT topics.*, users.username FROM topics LEFT JOIN users ON topics.user_id = users.id WHERE topics.id = $1",
      [id]
    )
  ).rows;

  const talkingpoint = await result[0];
  return (
    <div className="flex justify-center flex-col w-2/3 m-auto border-4 border-purple-950 rounded-xl p-5">
      <div>
        <h2>{talkingpoint.title}</h2>
        <p>{talkingpoint.username}</p>
        <h3>{talkingpoint.content}</h3>
        <div>
          <ReplyButton>
            <CommentForm
              topicId={id}
              parentId={0}
              handleSubmit={handleSubmit}
            />
          </ReplyButton>
          <DeleteButton
            to={`/browsetalkingpoints/1`}
            type="talkingpoint"
            id={id}
          />
        </div>
      </div>
      <p> this is the page of a talking point with id {id}</p>
      <div>
        <h3>Replies</h3>
        <Replies topicId={id} parentId={0} />
      </div>
    </div>
  );
}
