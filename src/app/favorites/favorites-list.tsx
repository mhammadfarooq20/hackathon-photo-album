"use client";

import { useEffect, useState } from "react";
import { CloudinaryImage } from "../../components/cloudinary-image";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/image-grid";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);
  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="200"
            height="100"
            alt="an image of something"
            path={""}
            onUnheart={(unheartedResources) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResources.public_id
                )
              );
            }}
          />
        );
      }}
    />
  );
}
