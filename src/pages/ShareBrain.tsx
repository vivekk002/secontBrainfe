import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";
import Loader from "../component/Loader";
import BrainiIcon from "../icons/BrainIcon";
import { BACKEND_URL } from "../config";

const SharedBrain = () => {
  const { sharelink } = useParams<{ sharelink: string }>();
  const [contents, setContents] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/brain/${sharelink}`);

        setContents(response.data.contents);
        setOwnerName(response.data.name);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching shared brain:", err);
        setError(
          err.response?.data?.error ||
            "Failed to load shared brain. The link may be invalid or expired.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (sharelink) {
      fetchSharedBrain();
    }
  }, [sharelink]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
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
          <p className="mt-6 text-lg font-semibold text-gray-700">
            Loading shared brain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="text-center max-w-md px-6">
          <div className="mb-6">
            <BrainiIcon size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Brain Not Found
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <header className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainiIcon size="md" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindVault
                </h1>
                <p className="text-sm text-slate-600 hidden md:block">
                  Shared by {ownerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="text-sm font-semibold text-purple-700">
                Public View
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 md:hidden">
            Shared by <span className="font-semibold">{ownerName}</span>
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            {ownerName}'s Brain Collection
          </h2>
          <p className="text-slate-600">
            {contents.length} {contents.length === 1 ? "item" : "items"} shared
          </p>
        </div>

        {contents.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {contents.map((item: any) => (
              <Card
                key={item._id}
                contentType={item.contentType}
                title={item.title}
                link={item.link}
                _id={item._id}
                createdAt={item.createdAt}
                onDelete={() => {}}
                tags={[]}
                isSharedView={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6 opacity-50">
              <BrainiIcon size="lg" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Content Yet
            </h3>
            <p className="text-gray-500">
              This brain is empty. Check back later!
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center">
          <p className="text-slate-600 text-sm">
            Powered by{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MindVault
            </span>
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Want your own MindVault?{" "}
            <a
              href="/signup"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign up now
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SharedBrain;
