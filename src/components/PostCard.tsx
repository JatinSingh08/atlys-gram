import React from "react";
import type { Post } from "../store/postStore";
import { CommentOutlined, HeartOutlined, HeartFilled, SendOutlined } from "@ant-design/icons";
import { usePostStore } from "../store/postStore";
import { useAuthStore } from "../store/authStore";
import { notImplemented, timeAgo } from "../utils/utils";

interface PostCardProps {
  post: Post;
  handleInteraction: (cb: () => void) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, handleInteraction }) => {
  const { user } = useAuthStore();
  const likedPostIds = usePostStore((s) => s.likedPostIds);
  const toggleLike = usePostStore((s) => s.toggleLike);
  const isLiked = likedPostIds.includes(post.id);

  return (
    <div className="bg-gray-100 p-2 w-full rounded-2xl mb-4 max-w-xl">
      <div className="bg-white rounded-2xl shadow-[0_0_16px_0_rgba(0,0,0,0.10)] p-4">
        <div className="flex items-center mb-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="text-start">
            <div className="font-semibold">{post.author}</div>
            <div className="text-xs text-gray-500">
              {timeAgo(post.createdAt)}
            </div>
          </div>
        </div>
        <div className="mb-2 text-lg flex items-start gap-6">
          <span className="text-2xl">😊</span>
          <span className="text-start">
            {post.content}
          </span>
        </div>
      </div>
      <div className="flex text-gray-500 mt-2 gap-6 px-2 pb-1">
        <button
          onClick={() => user ? toggleLike(post.id) : handleInteraction(() => {})}
          className="bg-transparent text-xl flex items-center justify-center transition-all duration-200 w-0 h-0"
        >
          {isLiked ? (
            <HeartFilled className="text-red-500 animate-like" />
          ) : (
            <HeartOutlined />
          )}
        </button>
        <button className="bg-transparent text-xl flex items-center justify-center w-0 h-0" onClick={notImplemented(user)}><CommentOutlined /></button>
        <button className="bg-transparent text-xl flex items-center justify-center w-0 h-0" onClick={notImplemented(user)}><SendOutlined /></button>
      </div>
    </div>
  );
};

export default PostCard; 