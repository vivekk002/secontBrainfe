import { useEffect, useState } from "react";
import Sidebar from "../component/SiderBar";
import AddContentDia from "../component/AddContentDia";
import Button from "../component/Button";
import ShareIcon from "../icons/ShareIcon";
import PlusIcon from "../icons/PlusIcon";
import Card from "../component/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";

const token = localStorage.getItem("token");
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/content`,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setContent(response.data.contents);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <AddContentDia open={open} setOpen={setOpen} />
      {/* Main Content Area */}
      <div className="w-[78%] bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-300 w-full flex justify-between p-6 bg-white">
          <h2 className="text-4xl font-bold">All Notes</h2>

          <div className="flex gap-4">
            <Button
              className="cursor-pointer"
              size="lg"
              variant="secondary"
              label="Share Brain"
              startIcon={<ShareIcon size="lg" />}
            />
            <Button
              className="cursor-pointer"
              size="lg"
              variant="primary"
              label="Add Content"
              startIcon={<PlusIcon size="lg" />}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </header>

        {/* Content Area */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-6 overflow-auto">
          {content.map((item: any) => (
            <Card
              contentType={item.contentType}
              title={item.title}
              link={item.link}
              key={item._id}
              createdAt={item.createdAt}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
