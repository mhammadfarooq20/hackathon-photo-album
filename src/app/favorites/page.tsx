import cloudinary from "cloudinary";
import { CloudinaryImage } from "../../components/cloudinary-image";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import FavoritesList from "./favorites-list";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="flex h-16 items-center px-4  container mx-auto ">
            <h1 className="text-4xl font-bold ">Favorites</h1>
            
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-4 ">
            <FavoritesList initialResources={results.resources} />
          </div>
        </div>
      </div>
    </section>
  );
}
