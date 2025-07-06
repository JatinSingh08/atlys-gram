import { create } from "zustand";

export interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

interface PostState {
  posts: Post[];
  likedPostIds: string[];
  addPost: (post: Omit<Post, "id" | "createdAt">) => void;
  toggleLike: (postId: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [
    {
      id: "1",
      author: "Theresa Webb",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: new Date(Date.now() - 1000 * 60 * 15), 
    },
    {
      id: "2",
      author: "John Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), 
    },
    {
      id: "3",
      author: "Jane Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ],
  likedPostIds: ["1"],
  addPost: (post) =>
    set((state) => ({
      posts: [
        {
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          ...post,
        },
        ...state.posts,
      ],
    })),
  toggleLike: (postId) =>
    set((state) => ({
      likedPostIds: state.likedPostIds.includes(postId)
        ? state.likedPostIds.filter((id) => id !== postId)
        : [...state.likedPostIds, postId],
    })),
})); 