import { useEffect, useState } from "react";
import ShareIcon from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { shareContent, copyToClipboard, deleteContent } from "../utils/share";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import "../index.css";

import Twitter from "../embeds/Twitter";
import Instagram from "../embeds/Instagram";
import Facebook from "../embeds/Facebook";
import LinkedIn from "../embeds/LinkedIn";
import Threads from "../embeds/Threads";
import Reddit from "../embeds/Reddit";
import Medium from "../embeds/Medium";
import Pinterest from "../embeds/Pinterest";
import Spotify from "../embeds/Spotify";
import Youtube from "../embeds/Youtube";

interface CardProps {
  title: string;
  createdAt: string;
  link: string;
  contentType:
    | "youtube"
    | "twitter"
    | "instagram"
    | "facebook"
    | "linkedin"
    | "threads"
    | "reddit"
    | "medium"
    | "pinterest"
    | "spotify";
  _id?: string; // Add content ID for sharing
  onDelete?: () => void; // Callback for when content is deleted
}

const Card = ({
  title,
  link,
  contentType,
  createdAt,
  _id,
  onDelete,
}: CardProps) => {
  const { toast, showToast, hideToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShare = async () => {
    console.log("Share clicked for content:", { _id, title, link });
    if (!_id) {
      console.error("No content ID provided");
      showToast("Cannot share: Missing content ID", "error");
      return;
    }

    setIsSharing(true);
    try {
      const shareLink = await shareContent(_id, link);
      if (shareLink) {
        showToast("Content shared successfully!", "success");
      } else {
        showToast("Failed to share content", "error");
      }
    } catch (error) {
      console.error("Share error:", error);
      showToast("Failed to share content", "error");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDelete = async () => {
    console.log("Delete clicked for content:", { _id, title });
    if (!_id) {
      console.error("No content ID provided");
      showToast("Cannot delete: Missing content ID", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this content?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteContent(_id);
      showToast("Content deleted successfully!", "success");
      // Trigger refresh of content list
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete content", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  const renderContent = () => {
    switch (contentType) {
      case "youtube":
        return <Youtube url={link} />;

      case "instagram":
        return <Instagram url={link} />;

      case "facebook":
        return <Facebook url={link} />;

      case "linkedin":
        return <LinkedIn url={link} />;

      case "threads":
        return <Threads url={link} />;

      case "reddit":
        return <Reddit url={link} />;
      case "medium":
        return <Medium url={link} />;

      case "pinterest":
        return <Pinterest url={link} />;

      case "spotify":
        return <Spotify url={link} />;

      case "twitter":
        return <Twitter url={link} />;
      default:
        return (
          <div className="p-3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600">Unsupported platform</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Original →
              </a>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [link]);
  return (
    <div className="rounded-lg border-0.75 h-[600px] w-[350px] border-gray-300 p-2 m-auto mt-1 shadow-lg bg-white flex flex-col justify-between">
      <div>
        <header className=" p-6 items-center flex justify-between">
          <h3 className="text-xl font-bold stroke-2 text-gray-700">{title}</h3>
          <div className="flex gap-5">
            <ShareIcon
              size="md"
              className={`cursor-pointer ${isSharing ? "opacity-50" : ""}`}
              onClick={handleShare}
            />
            <TrashIcon
              size="md"
              className={`cursor-pointer ${isDeleting ? "opacity-50" : ""}`}
              onClick={handleDelete}
            />
          </div>
        </header>

        <section className="flex-1 min-h-0">
          <div className="h-full">{renderContent()}</div>
        </section>
      </div>
      <footer className=" ml-2">
        <div className="p-2 justify-between items-center ">
          <div className="flex gap-2 mt-3">
            <button className="bg-blue-100 text-blue-600 rounded-xl pl-2 pr-2 justify-between items-center p-0.5">
              #tags
            </button>
            <button className="bg-blue-100 text-blue-600 rounded-xl pl-2 pr-2 justify-between items-center p-0.5">
              #tags
            </button>
            <button className="bg-blue-100 text-blue-600 rounded-xl pl-2 pr-2 justify-between items-center p-0.5">
              #tagsasfsdf
            </button>
          </div>
          <div className="mt-2 text-gray-500">
            Added on {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </footer>

      {/* Toast for sharing feedback */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        position="top-right"
        duration={3000}
      />
    </div>
  );
};

export default Card;
