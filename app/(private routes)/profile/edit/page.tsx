"use client";

import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";
import { getMe, updateMe, uploadImage } from "@/lib/api/clientApi";
import { Metadata } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your user details and settings",
};

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
      setPhotoUrl(user.photoUrl ?? "");
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : "";
      await updateMe({ userName, photoUrl: newPhotoUrl });
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <br />
      <AvatarPicker profilePhotoUrl={photoUrl} onChangePhoto={setImageFile} />
      <br />
      <form onSubmit={handleSaveUser}>
        <input type="text" value={userName} onChange={handleChange} />
        <br />
        <button type="submit">Save user</button>
      </form>
    </div>
  );
};

export default EditProfile;
