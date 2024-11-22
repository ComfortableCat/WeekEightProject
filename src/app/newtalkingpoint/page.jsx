import { db } from "@/utils/utilities";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewTalkingPoint() {
  async function handleSubmit(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");
    const titleCheck = (
      await db.query(
        "SELECT title FROM topics WHERE user_id = 1 AND title = $1 AND content = $2",
        [title, content]
      )
    ).rows;
    console.log(titleCheck);
    if (titleCheck.length === 0) {
      await db.query(
        "INSERT INTO topics (user_id, title, content) VALUES (1,$1,$2)",
        [title, content]
      );
      const newId = (
        await db.query(
          "SELECT id FROM topics WHERE user_id = 1 AND title = $1 AND content = $2",
          [title, content]
        )
      ).rows;
      console.log(newId);
      revalidatePath(`/talkingpoint/${newId[0].id}`);
      redirect(`/talkingpoint/${newId[0].id}`);
    } else {
      console.log("ERROR");
    }
  }
  return (
    <div className="flex justify-center flex-col w-2/3 m-auto border-4 border-purple-950 rounded-xl">
      <p className="text-center font-semibold">
        Create a new talking point here
      </p>
      <form action={handleSubmit} className="flex flex-col px-5">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          className="border border-black rounded-md"
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          maxLength={144}
          className="border border-black rounded-md"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
