"use client";

import {
  createPost,
  deletePost,
  loadUserPosts,
  updatePostDescription,
  updatePostLikes,
} from "@/actions/post-actions";
import { useUser } from "@/utils/contexts/UserContext";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Posts } from "../schemaInterfaces";

interface PostContextType {
  posts: Posts[];
  isLoading: boolean;
  error?: string;
  loadAllUserPosts: () => void;
  addNewPost: (description: string) => Promise<void>;
  removePost: (postId: string, userId: string) => Promise<void>;
  editPostDescription: (postId: string, description: string) => Promise<void>;
  updateLikes: (postId: string, userId: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadAllUserPosts = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const userPosts = await loadUserPosts(user._id);
        setPosts(userPosts);
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const removePost = async (postId: string, userId: string) => {
    try {
      const result = await deletePost(postId, userId);
      if (result) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
      if (user) {
        const updatedUser = {
          ...user,
          posts: user.posts.filter((post) => post._id !== postId),
        };
        setUser(updatedUser);
      }
    } catch (err) {
      setError("Failed to delete post");
    }
  };
  const updateLikes = async (postId: string, userId: string) => {
    try {
      const result = await updatePostLikes(postId, userId);
      if (result) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: result.likes,
                }
              : post
          )
        );
      }
    } catch (err) {
      setError("Failed to edit post likes");
    }
  };
  const editPostDescription = async (postId: string, description: string) => {
    try {
      const result = await updatePostDescription(postId, description);
      if (result) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  description: description,
                  updatedAt: new Date().toISOString(),
                }
              : post
          )
        );
      }
    } catch (err) {
      setError("Failed to edit post");
    }
  };
  const addNewPost = async (description: string) => {
    if (user) {
      try {
        const newPost = await createPost(description, user._id);
        if (newPost) {
          setPosts((prevPosts) => [newPost, ...prevPosts]);
          user.posts.push(newPost);
        }
      } catch (err) {
        setError("Failed to create post.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadAllUserPosts();
    }
  }, [user]);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        error,
        loadAllUserPosts,
        addNewPost,
        removePost,
        editPostDescription,
        updateLikes,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
