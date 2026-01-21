import { useEffect, useState } from "react";
import Sidebar from "../component/SideBar";
import AddContentDia from "../component/AddContentDia";
import ShareModal from "../component/ShareModal";
import Button from "../component/Button";
import ShareIcon from "../icons/ShareIcon";
import PlusIcon from "../icons/PlusIcon";
import Card from "../component/Card";
import Loader from "../component/Loader";
import { BACKEND_URL } from "../config";
import axios from "axios";
import HamburgerMenu from "../component/HamburgerMenu";
import BrainiIcon from "../icons/BrainIcon";
import SearchIcon from "../icons/SearchIcon";

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

type Content = {
  _id: string;
  title: string;
  link: string;
  contentType: "youtube" | "pdf" | "doc" | "image" | "article";
  createdAt: string;
};

const Dashboard = () => {
  const [addContentOpen, setAddContentOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const response = await axios.post(
            `${BACKEND_URL}/search`,
            { query: searchQuery },
            { headers: { Authorization: localStorage.getItem("token") } },
          );
          setContent(response.data.results);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else if (searchQuery === "") {
        if (!loading) fetchContent();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const contents = response.data.contents;

      const imagesToLoad = contents
        .filter((c: any) => c.contentType === "image" && c.link)
        .map((c: any) => c.link);

      const preloadImage = (src: string) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          // Resolve on both load and error to prevent getting stuck
          img.onload = resolve;
          img.onerror = resolve;
        });
      };

      if (imagesToLoad.length > 0) {
        await Promise.all(
          imagesToLoad.map((link: string) => preloadImage(link)),
        );
      }

      setContent(contents);
      setTags(response.data.tags);
      setFilter("all");
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="items-center justify-center h-screen mt-70">
        <Loader
          size="custom"
          customWidth={20}
          customHeight={100}
          bars={10}
          speed={1.5}
          customColors={[
            "#ff0000",
            "#ff4500",
            "#ffa500",
            "#ffff00",
            "#adff2f",
            "#00ff00",
          ]}
          shape="pill"
          shadow={true}
          gap="md"
        />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
      <header
        className="
        w-full flex items-center justify-between
        px-4 md:px-8 py-4 md:py-5
        bg-gradient-to-r from-blue-50 to-purple-50
        border-b-2 border-slate-200
        shadow-lg
        transition-all duration-200
      "
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-[200px] md:min-w-[250px]">
          <div className="flex-shrink-0 transition-transform duration-200 hover:scale-110">
            <BrainiIcon size="md" />
          </div>

          <h1
            className="
            hidden md:block 
            text-xl lg:text-2xl font-bold 
            bg-gradient-to-r from-purple-600 to-blue-600 
            bg-clip-text text-transparent
            tracking-tight
          "
          >
            Second Brain
          </h1>

          <h2
            className="
              block md:hidden 
              text-xl font-bold 
              text-gray-800
              cursor-pointer 
              hover:text-purple-600 
              transition-colors duration-200
            "
            onClick={() => setFilter("all")}
          >
            All Notes
          </h2>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl px-4 hidden sm:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SearchIcon size="md" />
            </div>
            <input
              type="text"
              className="
                block w-full pl-10 pr-10 py-2 
                border-2 border-slate-200 rounded-xl
                leading-5 bg-white placeholder-gray-400 
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 
                transition-all duration-200
                shadow-sm group-hover:shadow-md
                text-gray-900
              "
              placeholder="Search by keyword or meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 min-w-[50px] md:min-w-[250px] justify-end">
          <div className="block md:hidden">
            <div className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200">
              <HamburgerMenu
                setAddContentOpen={setAddContentOpen}
                setShareModalOpen={setShareModalOpen}
                setFilter={setFilter}
              />
            </div>
          </div>

          <div className="hidden md:flex gap-3 items-center">
            <Button
              className="
                cursor-pointer 
                shadow-sm 
                hover:shadow-md 
                transition-all duration-200
                hover:scale-105
              "
              size="md"
              variant="secondary"
              label="Share Brain"
              startIcon={<ShareIcon size="lg" />}
              onClick={() => setShareModalOpen(true)}
            />
            <Button
              className="
                cursor-pointer 
                shadow-sm 
                hover:shadow-md 
                transition-all duration-200
                hover:scale-105
              "
              size="lg"
              variant="primary"
              label="Add Content"
              startIcon={<PlusIcon size="lg" />}
              onClick={() => setAddContentOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Search Bar (visible only on small screens) */}
      <div className="sm:hidden px-4 py-3 bg-white border-b border-gray-200">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <SearchIcon size="md" />
          </div>
          <input
            type="text"
            className="
                block w-full pl-10 pr-10 py-2 
                border-2 border-slate-200 rounded-xl
                leading-5 bg-white placeholder-gray-400 
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 
                transition-all duration-200
                shadow-sm
                text-gray-900
              "
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar setFilter={setFilter} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 md:p-4 overflow-auto">
            {content.length === 0 && searchQuery ? (
              <div className="col-span-full flex flex-col items-center justify-center p-10 text-white opacity-80">
                <SearchIcon size="lg" className="mb-4" />
                <p className="text-xl">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              content
                .filter(
                  (item: any) =>
                    filter === "all" || item.contentType === filter,
                )
                .map((item: any) => (
                  <Card
                    contentType={item.contentType}
                    title={item.title}
                    link={item.link}
                    key={item._id}
                    _id={item._id}
                    createdAt={item.createdAt}
                    onDelete={fetchContent}
                    tags={tags.filter(
                      (tag) =>
                        Array.isArray(tag.contentId) &&
                        tag.contentId.includes(item._id),
                    )}
                  />
                ))
            )}
          </section>
        </div>
      </div>

      <AddContentDia
        addContentOpen={addContentOpen}
        setAddContentOpen={setAddContentOpen}
        onContentAdded={fetchContent}
        tags={tags}
      />
      <ShareModal open={shareModalOpen} setOpen={setShareModalOpen} />
    </div>
  );
};

export default Dashboard;
