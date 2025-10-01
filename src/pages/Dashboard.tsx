import { useEffect, useState } from "react";
import Sidebar from "../component/SiderBar";
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

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

const Dashboard = () => {
  const [addContentOpen, setAddContentOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState<string>("all");
  console.log("filter", filter);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content`);
      setContent(response.data.contents);
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setFilter={setFilter} />
      <AddContentDia
        addContentOpen={addContentOpen}
        setAddContentOpen={setAddContentOpen}
        onContentAdded={fetchContent}
        tags={tags}
      />
      <ShareModal open={shareModalOpen} setOpen={setShareModalOpen} />
      {/* Main Content Area */}
      <div className="w-[78%] bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-300 w-full flex items-center justify-between md:pl-6 p-3 bg-white">
          <h2
            className="md:text-3xl cursor-pointer lg:text-4xl text-2xl font-bold transition-all duration-200 ease-linear"
            onClick={() => {
              setFilter("all");
            }}
          >
            All Notes
          </h2>

          <div className="block md:hidden">
            <HamburgerMenu
              setAddContentOpen={setAddContentOpen}
              setShareModalOpen={setShareModalOpen}
              setFilter={setFilter}
            />
          </div>

          <div className="hidden md:flex gap-2">
            <Button
              className="cursor-pointer"
              size="lg"
              variant="secondary"
              label="Share Brain"
              startIcon={<ShareIcon size="lg" />}
              onClick={() => setShareModalOpen(true)}
            />
            <Button
              className="cursor-pointer"
              size="lg"
              variant="primary"
              label="Add Content"
              startIcon={<PlusIcon size="lg" />}
              onClick={() => setAddContentOpen(true)}
            />
          </div>
        </header>

        {/* Content Area */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:p-3 overflow-auto ">
          {content
            .filter(
              (item: any) => filter === "all" || item.contentType === filter
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
                    tag.contentId.includes(item._id)
                )}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
