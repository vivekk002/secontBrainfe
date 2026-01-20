import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useContent } from "../hooks/useContent";
import type { ChatMessage } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useToast } from "../hooks/useToast";
import Button from "../component/Button";
import Youtube from "../embeds/Youtube";
import BrainIcon from "../icons/BrainIcon";
import GoogleDocsViewer from "../component/GoogleDocsViewer";

const ContentDetails = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();
  const { content, loading: contentLoading, error } = useContent(contentId);
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content?.aiChat) {
      setMessages(content.aiChat);
    }
  }, [content]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setChatLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_URL}/chat`,
        { contentId, question: userMsg.content },
        { headers: { Authorization: token } },
      );

      const aiMsg: ChatMessage = { role: "model", content: res.data.answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error("Chat error", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        showToast("Session expired. Please sign in again.", "error");
        navigate("/signin");
        return;
      }
      showToast("Failed to get response", "error");
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Error: Could not get response." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (contentLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 text-slate-800">
        Loading content...
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-800">
        <p className="text-xl mb-4">Content not found</p>
        <Button
          variant="secondary"
          size="md"
          label="Go Back"
          onClick={() => navigate(-1)}
        />
      </div>
    );
  }

  const renderContentPreview = () => {
    switch (content.contentType) {
      case "youtube":
        return <Youtube url={content.link} />;
      case "image":
        return (
          <div className="flex items-center justify-center h-full bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={content.link}
              alt={content.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      case "pdf":
      case "doc":
      case "spreadsheets":
        // Use Google Docs Viewer for all document types
        return (
          <div className="w-full h-full bg-white">
            <GoogleDocsViewer
              fileUrl={content.link}
              fileName={content.title}
              height="100%"
              className="w-full h-full"
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white transition-colors">
      <header className="h-16 border-b border-slate-200 flex items-center px-4 justify-between bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800 truncate max-w-md">
            {content.title}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 md:p-6 bg-slate-50 overflow-hidden flex flex-col">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            {renderContentPreview()}
          </div>
        </div>

        <div className="w-full md:w-[400px] border-l border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-purple-50">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <BrainIcon size="md" />
              <span>AI Assistant</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Ask questions about this {content.contentType}.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 text-center p-6">
                <BrainIcon size="lg" className="mb-3 opacity-50" />
                <p>No messages yet.</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-500 text-sm p-3 rounded-2xl rounded-bl-none animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={chatLoading}
              />
              <button
                onClick={handleSend}
                disabled={chatLoading}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
