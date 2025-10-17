import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
  openGraph: {
    title: "Profile",
    description: "Manage your profile settings",
    url: `https://08-zustand-eight-pi.vercel.app`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Profile`,
    description: "Manage your profile settings",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
