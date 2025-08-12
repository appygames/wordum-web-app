"use client";

import { useEffect, useState } from "react";
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
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsInitializing(true);
        setInitError(null);

        // Generate or get device ID
        let device_id = localStorage.getItem("device_id");
        if (!device_id) {
          device_id = crypto.randomUUID();
          localStorage.setItem("device_id", device_id);
        }

        // Load local coins
        const storedCoins = localStorage.getItem("coins");
        const coins = storedCoins ? Number(storedCoins) : 0;
        dispatch(setCoins(coins));

        // Try to get user from server
        const response = await triggerGetUserByDeviceId(device_id).unwrap();
        
        if (response?.data) {
          const userData = response.data;
          
          // Handle avatar - convert external URLs to local paths if needed
          if (userData.avatar) {
            const avatarPath = normalizeAvatarPath(userData.avatar);
            dispatch(setAvatar(avatarPath));
            localStorage.setItem("avatar", avatarPath);
          }

          // Handle coins - use server data if available
          if (typeof userData.coins === 'number') {
            dispatch(setCoins(userData.coins));
            localStorage.setItem("coins", userData.coins.toString());
          }

          // Handle game stats
          if (userData.game_stats) {
            const formattedStats = {
              easy: userData.game_stats.Easy || { wins: 0, losses: 0 },
              medium: userData.game_stats.Medium || { wins: 0, losses: 0 },
              hard: userData.game_stats.Hard || { wins: 0, losses: 0 },
              expert: userData.game_stats.Expert || { wins: 0, losses: 0 },
            };
            dispatch(setStats(formattedStats));
          }
        } else {
          // User not found, create new user
          await createNewUser(device_id);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        
        // If it's a "user not found" error, create new user
        if ((error as { success?: boolean })?.success === false) {
          try {
            const device_id = localStorage.getItem("device_id");
            if (device_id) {
              await createNewUser(device_id);
            }
          } catch (createError) {
            console.error("Failed to create new user:", createError);
            setInitError("Failed to initialize user account");
          }
        } else {
          // Network or other errors - still allow app to work with local data
          console.warn("Using offline mode due to error:", error);
          loadLocalUserData();
        }
      } finally {
        setIsInitializing(false);
      }
    };

    const createNewUser = async (device_id: string) => {
      const defaultAvatar = getDefaultAvatar();
      
      try {
        await createUser({ 
          device_id, 
          avatar: defaultAvatar,
          coins: 0 
        }).unwrap();

        // Set user data in store and localStorage
        dispatch(setAvatar(defaultAvatar));
        localStorage.setItem("avatar", defaultAvatar);
        
        // Initialize default stats
        const defaultStats = {
          easy: { wins: 0, losses: 0 },
          medium: { wins: 0, losses: 0 },
          hard: { wins: 0, losses: 0 },
          expert: { wins: 0, losses: 0 },
        };
        dispatch(setStats(defaultStats));

        // Navigate to avatar selection
        router.push("/avatar");
      } catch (error) {
        console.error("Failed to create user:", error);
        // Still set default avatar locally so app can function
        dispatch(setAvatar(defaultAvatar));
        localStorage.setItem("avatar", defaultAvatar);
        throw error;
      }
    };

    const loadLocalUserData = () => {
      // Load avatar from localStorage
      const storedAvatar = localStorage.getItem("avatar");
      if (storedAvatar) {
        const normalizedAvatar = normalizeAvatarPath(storedAvatar);
        dispatch(setAvatar(normalizedAvatar));
      } else {
        const defaultAvatar = getDefaultAvatar();
        dispatch(setAvatar(defaultAvatar));
        localStorage.setItem("avatar", defaultAvatar);
      }

      // Load stats from localStorage if available
      const storedStats = localStorage.getItem("game_stats");
      if (storedStats) {
        try {
          const stats = JSON.parse(storedStats);
          dispatch(setStats(stats));
        } catch (error) {
          console.error("Failed to parse stored stats:", error);
        }
      }
    };

    const getDefaultAvatar = () => {
      // Use local avatar instead of external URL
      return "https://wordum.s3.us-east-1.amazonaws.com/avatars/avatar1.png";
    };

    const normalizeAvatarPath = (avatarUrl: string) => {
      // Convert external GitHub URLs to local paths
      if (avatarUrl.includes('raw.githubusercontent.com') || avatarUrl.includes('github.com')) {
        // Extract filename from GitHub URL
        const filename = avatarUrl.split('/').pop();
        return `/avatars/${filename}`;
      }
      
      // If it's already a local path, return as is
      if (avatarUrl.startsWith('/') || avatarUrl.startsWith('./')) {
        return avatarUrl;
      }
      
      // If it's a full URL from your domain, convert to relative
      if (avatarUrl.startsWith(window.location.origin)) {
        return avatarUrl.replace(window.location.origin, '');
      }
      
      // For other external URLs, return as is (make sure they're in next.config.js)
      return avatarUrl;
    };

    // Only run once on mount
    initializeUser();
  }, [dispatch, createUser, triggerGetUserByDeviceId, router]);

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing game...</p>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed critically
  if (initError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Initialization Error
          </h2>
          <p className="text-red-600 mb-4">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}