import { db } from "@/utils/utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function DeleteButton({ to, type, id }) {
  async function handleClick() {
    "use server";
    if (type === "talkingpoint") {
      await db.query("DELETE FROM topics WHERE id = $1", [id]);
    } else {
      await db.query("DELETE FROM comments WHERE id = $1", [id]);
    }
    revalidatePath(to);
    redirect(to);
  }
  return <button onClick={handleClick}>Delete {type}</button>;
}
