import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";
import PostEditor from "../components/PostEditor";
import PostCard from "../components/PostCard";
import AuthModal from "../components/AuthModal";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FeedPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const posts = usePostStore((s) => s.posts);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"signin" | "signup">("signin");

  const handleInteraction = (cb: () => void) => {
    if (!user) {
      setModalOpen(true);
      setModalMode("signin");
    } else {
      cb();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <div className="w-full flex justify-between items-center px-8 py-4 sticky top-0 bg-white/70 backdrop-blur-md shadow-sm z-50">
        <div className="text-2xl font-bold">foo-rum</div>
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              className="text-sm text-gray-700 hover:underline flex items-center gap-2"
              onClick={() => navigate("/signin")}
            >
              Login <LoginOutlined />
            </button>
          ) : (
            <>
              <span className="text-sm text-gray-700">{user.email}</span>
              <button
                className="text-sm text-gray-700 hover:underline"
                onClick={() => {
                  logout();
                  navigate("/signin");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-xl">
              <div
                onClick={() => handleInteraction(() => {})}
                className="cursor-pointer"
              >
                <PostEditor />
              </div>
            </div>
            <div className="w-full max-w-xl mt-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleInteraction(() => {})}
                  className="cursor-pointer"
                >
                  <PostCard post={post} handleInteraction={handleInteraction} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        open={modalOpen && !user}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        onAuthSuccess={() => setModalOpen(false)}
      />
    </div>
  );
};

export default FeedPage; 