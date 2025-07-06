import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";
import {
  AudioOutlined, BoldOutlined, CodeOutlined, DeleteOutlined, ItalicOutlined,
  OrderedListOutlined, PlusOutlined, SendOutlined, UnderlineOutlined,
  UnorderedListOutlined, VideoCameraOutlined, SmileOutlined
} from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import { notImplemented } from "../utils/utils";
import { bottomBarClass, bottomButtonClass, cardClass, deleteButtonClass, dividerClass, emojiPickerClass, sendButtonClass, textareaClass, toolbarButtonActiveClass } from "./styles";
import { containerClass, toolbarButtonClass, toolbarClass } from "./styles";

const PostEditor: React.FC = () => {
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuthStore();
  const addPost = usePostStore((s) => s.addPost);

  const handlePublish = () => {
    if (!content.trim()) return;
    addPost({ author: user?.email || "Anonymous", content });
    setContent("");
  };

  const insertEmoji = (emojiData: any) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.slice(0, start);
    const after = content.slice(end);
    setContent(before + emoji + after);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
    setShowEmoji(false);
  };

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        <div className="flex items-center justify-between h-20 p-2">
          <div className={toolbarClass}>
            <div className={`${toolbarButtonClass} bg-white p-1 w-24`} onClick={notImplemented(user)}>Paragraph</div>
            <div className={`${toolbarButtonClass} ${toolbarButtonActiveClass}`} onClick={notImplemented(user)}><BoldOutlined /></div>
            <div className={toolbarButtonClass} onClick={notImplemented(user)}><ItalicOutlined /></div>
            <div className={toolbarButtonClass} onClick={notImplemented(user)}><UnderlineOutlined /></div>
            <div className={toolbarButtonClass} onClick={notImplemented(user)}><UnorderedListOutlined /></div>
            <div className={toolbarButtonClass} onClick={notImplemented(user)}><OrderedListOutlined /></div>
            <div className={dividerClass}></div>
            <div className={toolbarButtonClass} onClick={notImplemented(user)}><CodeOutlined /></div>
          </div>
          <div>
            <div className={deleteButtonClass} onClick={notImplemented(user)}><DeleteOutlined className="text-red-500" /></div>
          </div>
        </div>
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={textareaClass}
            placeholder="How are you feeling today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {showEmoji && (
            <div className={emojiPickerClass}>
              <EmojiPicker onEmojiClick={insertEmoji} />
            </div>
          )}
        </div>
        <div className={bottomBarClass}>
          <button onClick={notImplemented(user)} className={bottomButtonClass}>
            <PlusOutlined />
          </button>
          <button onClick={notImplemented(user)} className={bottomButtonClass + " bg-white"}>
            <AudioOutlined />
          </button>
          <button onClick={notImplemented(user)} className={bottomButtonClass + " bg-white"}>
            <VideoCameraOutlined />
          </button>
          <button
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            className={bottomButtonClass + " bg-white"}
          >
            <SmileOutlined />
          </button>
          <button
            onClick={handlePublish}
            className={sendButtonClass}
          >
            <SendOutlined className="text-[24px] text-[#3A5EFF]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor; 