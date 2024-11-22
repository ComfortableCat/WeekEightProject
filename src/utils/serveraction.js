"use server";

import { revalidatePath } from "next/cache";
import { db } from "./utilities";
import { redirect } from "next/navigation";

export async function handleSubmit(formData) {
  const reply = formData.get("reply");
  const topicId = formData.get("topicId");
  const parentId = formData.get("parentId");
  console.log("topicId ", topicId);
  console.log("reply ", reply);
  console.log("parentId ", parentId);
  await db.query(
    "INSERT INTO comments (topic_id, parent_id, user_id, content) VALUES ($1, $2, 1, $3)",
    [topicId, parentId, reply]
  );
  revalidatePath(`/talkingpoint/${topicId}`);
  redirect(`/talkingpoint/${topicId}`);
}

export async function getReplies(topicId, parentId) {
  let replies = [];
  if (parentId === 0) {
    const result = (
      await db.query(
        `SELECT
              comments.*,
              users.username,
              replies.titlesubreplies as subreplies,
              replies.subusers
              from
              comments
              left JOIN users ON comments.user_id = users.id 
              LEFT JOIN (
                select
                 parent_id,
                 COALESCE(json_agg(secondaryreplies), '[]'::JSON) AS titlesubreplies,
                 ARRAY_AGG(users.username) as subusers
                 from
                 comments AS secondaryreplies
                 left join users on secondaryreplies.user_id = users.id
                 GROUP by
                 parent_id
              ) AS replies
              on
              comments.id = replies.parent_id
              where
              comments.parent_id IS NULL AND comments.topic_id = $1
              ORDER BY comments.id`,
        [topicId]
      )
    ).rows;
    replies = result;
  } else {
    const result = (
      await db.query(
        `SELECT
                    comments.*,
                    users.username,
                    replies.titlesubreplies as subreplies
                    from
                    comments
                    left JOIN users ON comments.user_id = users.id 
                LEFT JOIN (
                  select
                   parent_id,
                   COALESCE(json_agg(row_to_json(secondaryreplies,false)), '[]'::JSON) AS titlesubreplies
                   from
                   comments AS secondaryreplies
                   GROUP by
                   parent_id
                ) AS replies
                on
                comments.id = replies.parent_id
                where
                comments.parent_id =$1 AND comments.topic_id = $2
                ORDER BY comments.id`,
        [parentId, topicId]
      )
    ).rows;
    replies = result;
  }
  return replies;
}
