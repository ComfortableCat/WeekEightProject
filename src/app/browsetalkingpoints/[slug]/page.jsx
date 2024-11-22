import TalkingpointList from "@/components/TalkingpointList";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function TalkingpointsPage({ params }) {
  const asc = (await params).slug;
  async function handleClick() {
    "use server";
    if (asc === "true") {
      revalidatePath(`/browsetalkingpoints/false`);
      redirect(`/browsetalkingpoints/false`);
    } else {
      revalidatePath(`/browsetalkingpoints/true`);
      redirect(`/browsetalkingpoints/true`);
    }
  }
  return (
    <div>
      <p>this is where you find the different talking points</p>
      <button onClick={handleClick}>
        {asc === "true" ? "sort by oldest" : "sort by newest"}
      </button>
      <TalkingpointList asc={asc} />
    </div>
  );
}
