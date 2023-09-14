import cloudinary from "cloudinary";
import GalleryGrid from "./gallery/gallery-grid";
import SearchForm from "./gallery/search-form";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage({
  searchParams: {search},
}:{
  searchParams:{
    search: string
  }
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image ${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(100)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex h-16 items-center px-4  container mx-auto ">
          <h1 className="text-4xl font-bold ">Gallery</h1>
        </div>
        <SearchForm initialSearch={search}/>
        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}
