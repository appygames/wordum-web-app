"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAvatar } from "@/store/userSlice";
import { setCoins } from "@/features/game/gameSlice";
import { setStats } from "@/store/userSlice";
import {
  useCreateUserMutation,
  useLazyGetUserByDeviceIdQuery,
} from "@/store/slices/userApiSlice";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [triggerGetUserByDeviceId] = useLazyGetUserByDeviceIdQuery();

  useEffect(() => {
    const device_id = localStorage.getItem("device_id") || crypto.randomUUID(); // Generate new if not present

    // Always ensure device_id is saved in localStorage
    localStorage.setItem("device_id", device_id);

    const coins = localStorage.getItem("coins") || "0";
    dispatch(setCoins(Number(coins)));

    triggerGetUserByDeviceId(device_id)
      .unwrap()
      .then((res) => {
        const data = res.data;
        if (data && data.avatar) {
          // Convert relative path to absolute if needed
          const avatarPath = data.avatar.startsWith("http")
            ? data.avatar
            : `${window.location.origin}${data.avatar}`;
          dispatch(setAvatar(avatarPath));
          dispatch(setCoins(data.coins));
          localStorage.setItem("avatar", avatarPath);
        }
        if (data.game_stats) {
          // Convert stats to lowercase keys
          const formattedStats = {
            easy: data.game_stats.Easy || { wins: 0, losses: 0 },
            medium: data.game_stats.Medium || { wins: 0, losses: 0 },
            hard: data.game_stats.Hard || { wins: 0, losses: 0 },
            expert: data.game_stats.Expert || { wins: 0, losses: 0 },
          };
          dispatch(setStats(formattedStats));
        } else {
          // No user found, create a new one
          const defaultAvatar =
            "https://raw.githubusercontent.com/appygames/wordum-web-app/refs/heads/main/public/avatars/profile-1.png?token=GHSAT0AAAAAADF7LCBUU2J6ZFMJDLWUOPO42CWQYCA";

          createUser({ device_id, avatar: defaultAvatar })
            .unwrap()
            .then(() => {
              dispatch(setAvatar(defaultAvatar));
              localStorage.setItem("avatar", defaultAvatar);
            })
            .catch(() => {
              console.error("Failed to create user");
            });

          router.push("/avatar");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch, createUser, triggerGetUserByDeviceId, router]);

  return <>{children}</>;
}
