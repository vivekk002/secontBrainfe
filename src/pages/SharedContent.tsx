import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";
import Loader from "../component/Loader";
import BrainiIcon from "../icons/BrainIcon";
import { BACKEND_URL } from "../config";

// 🆕 SharedContent Page - Public view of individual shared content
const SharedContent = () => {
  const { hash } = useParams<{ hash: string }>();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/content/share/${hash}`
        );

        setContent(response.data.content);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching shared content:", err);
        setError(
          err.response?.data?.error ||
            "Failed to load content. The link may be invalid or expired."
        );
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedContent();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <Loader
          size="custom"
          customWidth={20}
          customHeight={100}
          bars={10}
          speed={1.5}
          customColors={[
            "#9333ea",
            "#7c3aed",
            "#6366f1",
            "#3b82f6",
            "#0ea5e9",
            "#06b6d4",
          ]}
          shape="pill"
          shadow={true}
          gap="md"
        />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="text-center max-w-md px-6">
          <BrainiIcon size="lg" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-4">
            Content Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Shared Content
          </h1>
          <p className="text-gray-600">View this shared item</p>
        </header>

        <Card
          contentType={content.contentType}
          title={content.title}
          link={content.link}
          _id={content._id}
          createdAt={content.createdAt}
          onDelete={() => {}}
          tags={[]}
          isSharedView={true}
        />
      </div>
    </div>
  );
};

export default SharedContent;
