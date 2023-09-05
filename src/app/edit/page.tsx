"use client";

import { ForceRefresh } from "@/components/force-refresh";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
  >();
  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col  gap-8">
        <div className="flex justify-between ">
          <h1 className="text-4xl font-bold ">Edit {publicId}</h1>
        </div>

        <div className="flex gap-4">
          <Button
            variant={"ghost"}
            onClick={() => setTransformation(undefined)}
          >
            Clear All
          </Button>

          <Button onClick={() => setTransformation("generative-fill")}>
            Apply Generative Fill
          </Button>

          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to Gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate
          </Button>
          <Button onClick={() => setTransformation("bg-remove")}>
            Remove Background
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="300" height="200" alt="some image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              crop="pad"
              fillBackground
            />
          )}

          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              blur="800"
              alt="some image"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              grayscale
              alt="some image"
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              pixelate
              alt="some image"
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              removeBackground
              alt="some image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
