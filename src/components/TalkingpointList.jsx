import Link from "next/link";
import { db } from "@/utils/utilities";

export default async function TalkingpointList({ page, asc }) {
  const offset = (page - 1) * 10;
  const talkingpoints = (await db.query("SELECT id, title FROM topics")).rows;
  if (asc === "false") {
    talkingpoints.reverse();
  }
  return (
    <div>
      {talkingpoints.map((topics) => (
        <div key={topics.id}>
          <Link href={`/talkingpoint/${topics.id}`}>{topics.title}</Link>
        </div>
      ))}
    </div>
  );
}
