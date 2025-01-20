"use client";
import {
  addComment,
  deleteComment,
  loadAllComments,
} from "@/actions/post-actions";
import { createContext, useContext, useEffect, useState } from "react";
import { Comment } from "../schemaInterfaces";
import { useUser } from "./UserContext";

interface CommentContextType {
  comments: Comment[];
  isLoading: boolean;
  error?: string;
  addNewComment: (
    description: string,
    userId: string,
    postId: string
  ) => Promise<void>;
  loadComments: () => Promise<void>;
  removeComment: (commentId: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const addNewComment = async (
    description: string,
    userId: string,
    postId: string
  ) => {
    setIsLoading(true);
    try {
      const newComment = await addComment(description, userId, postId);
      if (newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
      }
    } catch (err) {
      setError("Failed to add comment.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeComment = async (commentId: string) => {
    try {
      const response = await deleteComment(commentId);
      if (response) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      }
    } catch (err) {
      setError("Error deleting comments");
    }
  };
  const loadComments = async () => {
    try {
      const comments = await loadAllComments();
      setComments(comments);
    } catch (err) {
      setError("Error loading comments");
    }
  };

  useEffect(() => {
    if (user) {
      loadComments();
    }
  }, [user]);
  return (
    <CommentContext.Provider
      value={{
        comments,
        isLoading,
        error,
        addNewComment,
        loadComments,
        removeComment,
      }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = (): CommentContextType => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
};
