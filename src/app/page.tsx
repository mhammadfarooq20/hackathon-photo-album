"use client";

import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export interface UploadResult {
  info: {
    public_id: string;
    // You can add more properties related to the uploaded file's information here
    // For example: format: string;
    //              width: number;
    //              height: number;
    //              ...
  };
  // You can add more properties related to the upload result here
  // For example: success: boolean;
  //              message: string;
  //              ...
}

export default function Home() {
  const [imageId, setImageId] = useState("");

  return (
    <main  >
      <h1 className=" flex text-white flex-col p-2">
      PHOTO ALBUM
      </h1>

      <br/>
      <CldUploadButton className=""
        onUpload={(result: UploadResult) => {
          
          return setImageId(result.info.public_id);
        }}
        uploadPreset="saloeek2"
      />

      {imageId && (
        <CldImage
          width="400"
          height="300"
          src={imageId}
          
          
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}

