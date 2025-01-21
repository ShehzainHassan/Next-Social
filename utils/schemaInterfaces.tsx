export interface UserInfo {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  city: string;
  school: string;
  work: string;
  website: string;
  description: string;
  avatar: string;
  createdAt: string;
  posts: Posts[];
  likes: Like[];
  comment: Comment[];
  followers: Follower[];
  followings: Follower[];
  followRequestsSent: FollowRequest[];
  followRequestsReceived: FollowRequest[];
  blocks: Block[];
  blockedBy: Block[];
  stories: Story[];
}

export interface Posts {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  comments: Comment[];
  likes: Like[];
}

export interface Comment {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likes: Like[];
  postId: string;
}

export interface Like {
  _id: string;
  createdAt: string;
  userId: string;
  postId: string;
  commentId: string;
}

export interface Follower {
  _id: string;
  createdAt: string;
  followerId: string;
  followingId: string;
}

export interface FollowRequest {
  _id: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
}

export interface Block {
  _id: string;
  createdAt: string;
  blockerId: string;
  blockedId: string;
}

export interface Story {
  _id: string;
  createdAt: string;
  expiresAt: string;
  userId: string;
  img: string;
}

export interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
