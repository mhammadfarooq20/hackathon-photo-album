import cloudinary from "cloudinary";
import AlbumGrid from "./album-grid";
import { SearchResult } from "@/app/gallery/page";
import { ForceRefresh } from "@/components/force-refresh";

export default async function AlbumNamePage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(5)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
        <ForceRefresh/>
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="flex h-16 items-center px-4  container mx-auto ">
            <h1 className="text-4xl font-bold ">Album of {albumName}</h1>
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>

        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
