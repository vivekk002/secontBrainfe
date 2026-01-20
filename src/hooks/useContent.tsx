import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export interface Content {
  _id: string;
  title: string;
  contentType: "youtube" | "pdf" | "doc" | "image" | "article";
  link: string;
  createdAt: string;
  aiChat?: ChatMessage[];
  questions?: string[];
}

export const useContent = (contentId: string | undefined) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!contentId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/content/${contentId}`, {
          headers: { Authorization: token },
        });

        if (res.data.content) {
          setContent(res.data.content);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load content details");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  return { content, loading, error };
};
