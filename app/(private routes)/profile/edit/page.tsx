"use client";

import { getMe, updateMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      await updateMe({ username });
      router.push("/profile");
    } catch (error) {
      toast.error(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
      router.push("/profile");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
