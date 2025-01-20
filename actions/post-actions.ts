"use server";

import axios from "axios";

export const createPost = async (description: string, userId: string) => {
  try {
    const response = await axios.post("http://localhost:3333/post/createPost", {
      description,
      userId,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log("Error saving post to the database ", err);
  }
};

export const deletePost = async (postId: string, userId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3333/post/deletePost?postId=${postId}&userId=${userId}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error deleting post from the database ", err);
  }
};

export const loadAllPostsFromDB = async () => {
  try {
    const response = await axios.get(`http://localhost:3333/post/loadAllPosts`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error loading posts from the database ", err);
  }
};
export const loadUserPosts = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3333/post/loadUserPosts?userId=${userId}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error loading posts from the database ", err);
  }
};
export const updatePostLikes = async (postId: string, userId: string) => {
  try {
    const response = await axios.patch(
      `http://localhost:3333/post/updatePostLikes`,
      {
        userId,
        postId,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error updating post likes ", err);
  }
};
export const updatePostDescription = async (
  postId: string,
  description: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:3333/post/updatePostDescription/${postId}`,
      {
        description,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error updating post description ", err);
  }
};
export const addComment = async (
  description: string,
  userId: string,
  postId: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3333/comment/addComment",
      {
        description,
        userId,
        postId,
      }
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (err) {
    console.log("Error saving comment to the database ", err);
  }
};
export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3333/comment/deleteComment?commentId=${commentId}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error deleting comment", err);
  }
};
export const loadAllComments = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3333/comment/loadAllComments`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log("Error loading comments ", err);
  }
};
