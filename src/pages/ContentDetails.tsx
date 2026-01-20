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

const ContentDetails = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();
  const { content, loading: contentLoading, error } = useContent(contentId);
  const { showToast } = useToast();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
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
        // Both PDFs and Office documents (which are converted to PDF) use the same rendering
        const isCloudinaryFile = content.link.includes("cloudinary.com");

        if (isCloudinaryFile) {
          // Generate thumbnail URL from the PDF/document
          let pdfImageUrl = content.link;

          if (content.link.includes("/upload/")) {
            pdfImageUrl = content.link.replace(
              "/upload/",
              `/upload/w_1200,f_jpg,pg_${currentPage}/`,
            );
            // Replace any document extension with .jpg
            pdfImageUrl = pdfImageUrl.replace(
              /\.(pdf|docx?|xlsx?|pptx?)$/i,
              ".jpg",
            );
          }

          return (
            <div className="w-full h-full bg-slate-900 flex flex-col overflow-auto">
              <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{content.title}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 rounded transition-colors text-sm"
                    >
                      ← Previous
                    </button>
                    <span className="text-sm text-slate-300">
                      Page {currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={!hasNextPage}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 rounded transition-colors text-sm"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-start justify-center p-4 overflow-auto">
                <img
                  src={pdfImageUrl}
                  alt={content.title}
                  className="max-w-full h-auto shadow-2xl"
                  onLoad={() => setHasNextPage(true)}
                  onError={(e) => {
                    // If image fails to load, we've reached the last page
                    setHasNextPage(false);

                    // If it's the first page and fails, show fallback
                    if (currentPage === 1) {
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="flex flex-col items-center justify-center text-white p-8">
                            <p class="mb-4">Unable to display preview</p>
                            <a href="${content.link}" download target="_blank" rel="noopener noreferrer" 
                               class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                              Open ${content.contentType === "pdf" ? "PDF" : "Document"} in New Tab
                            </a>
                          </div>
                        `;
                      }
                    } else {
                      // If not first page, just go back to previous page
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }
                  }}
                />
              </div>
            </div>
          );
        }

        // Non-Cloudinary file - provide download link
        return (
          <div className="flex flex-col items-center justify-center h-full bg-slate-50 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-slate-400 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="text-lg font-medium text-slate-700 mb-2">
              {content.contentType === "pdf" ? "PDF Document" : "Document"}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              This file is hosted externally
            </p>
            <a
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Open {content.contentType === "pdf" ? "PDF" : "Document"}
            </a>
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
