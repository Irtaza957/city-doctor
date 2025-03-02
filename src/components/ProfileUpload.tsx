"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";

const ProfileUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  return (
    <div className="relative">
      {image ? (
        <Image
          width={64}
          height={64}
          alt="profile"
          src={URL.createObjectURL(image)}
          className="size-16 rounded-full object-cover border"
        />
      ) : (
        <div className="w-16 h-16 bg-secondary/30 rounded-full" />
      )}
      <div className="absolute bottom-0 right-0 w-6 h-6 p-1.5 rounded-full bg-secondary flex items-center justify-center">
        <button type="button" onClick={handleButtonClick}>
          <EditIcon className="w-full h-full text-white" />
        </button>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfileUpload;
