import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShareIcon from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { shareContent, copyToClipboard, deleteContent } from "../utils/share";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";
import "../index.css";

import Youtube from "../embeds/Youtube";
import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import BrainIcon from "../icons/BrainIcon";
import GoogleDocsViewer from "./GoogleDocsViewer";

type Tag = {
  _id: string;
  name: string;
  contentId: string[];
};

interface CardProps {
  title: string;
  createdAt: string;
  tags: Tag[];
  link: string;
  contentType: "youtube" | "pdf" | "doc" | "image" | "spreadsheets" | "article";
  _id: string;
  onDelete?: () => void;
  isSharedView?: boolean;
}

const Card = ({
  title,
  link,
  contentType,
  createdAt,
  _id,
  onDelete,
  tags,
  isSharedView = false,
}: CardProps) => {
  const { toast, showToast, hideToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Share clicked for content:", { _id, title, link });
    if (!_id) {
      showToast("Cannot share: Missing content ID", "error");
      return;
    }

    setIsSharing(true);
    try {
      const shareLink = await shareContent(_id);

      if (shareLink) {
        const frontendShareLink = shareLink.replace(
          /http:\/\/localhost:3000\/api\/v1\/content\/share\//,
          `${window.location.origin}/content/`,
        );

        copyToClipboard(frontendShareLink);
        showToast("Link copied to clipboard!", "success");
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!_id) return;
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;

    setIsDeleting(true);
    try {
      await deleteContent(_id);
      showToast("Content deleted successfully!", "success");

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

  const handleCardClick = () => {
    if (!isSharedView) {
      navigate(`/content/view/${_id}`);
    } else {
      window.open(link, "_blank");
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "youtube":
        return <Youtube url={link} />;
      case "image":
        return (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
            <img
              src={link}
              alt={title}
              className="max-w-full max-h-[200px] object-contain"
            />
          </div>
        );
      case "pdf":
        // For PDFs, try Cloudinary thumbnail first, then fallback to Google Docs Viewer
        const isCloudinaryPdf = link.includes("cloudinary.com");

        if (isCloudinaryPdf) {
          const pdfThumbnail = link
            .replace("/upload/", "/upload/w_300,h_400,c_fill,pg_1/")
            .replace(/\.[^/.]+$/, ".jpg");

          return (
            <div className="w-full h-[200px] flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden relative">
              <img
                src={pdfThumbnail}
                alt={title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to document icon if thumbnail fails
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <DocumentIcon size="lg" className="text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 font-medium mb-2">
                  PDF File
                </p>
                <p className="text-xs text-slate-400">Click to view</p>
              </div>
            </div>
          );
        }

        // Non-Cloudinary PDF - show icon
        return (
          <div className="flex flex-col items-center justify-center h-48 bg-slate-50 rounded-lg p-4 text-center">
            <DocumentIcon size="lg" className="text-slate-400 mb-2" />
            <p className="text-sm text-slate-500 font-medium mb-2">PDF File</p>
            <p className="text-xs text-slate-400">Click to view</p>
          </div>
        );

      case "doc":
      case "spreadsheets":
        // Show preview using Google Docs Viewer for Office files
        return (
          <div className="w-full h-[200px] bg-slate-50 rounded-lg overflow-hidden relative">
            <GoogleDocsViewer
              fileUrl={link}
              fileName={title}
              height="200px"
              className="w-full h-full"
            />
            {/* Overlay with icon for better UX */}
            {/* <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm">
              <DocumentIcon size="sm" className="text-purple-600" />
            </div> */}
          </div>
        );

      case "article":
        // For articles, show a preview card with link
        return (
          <div className="p-3">
            <div className="bg-slate-100 p-4 rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <LinkIcon size="md" />
                <span className="capitalize font-medium">Article Link</span>
              </div>
              <p className="text-blue-600 hover:underline break-all text-sm line-clamp-2">
                {link}
              </p>
            </div>
          </div>
        );

      default:
        // Generic content
        return (
          <div className="p-3">
            <div className="bg-slate-100 p-4 rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <LinkIcon size="md" />
                <span className="capitalize font-medium">
                  {contentType} Link
                </span>
              </div>
              <p className="text-blue-600 hover:underline break-all text-sm line-clamp-2">
                {link}
              </p>
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
    <div
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-lg border border-slate-200 p-4 mt-4 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between w-full h-full relative group"
    >
      <div>
        <header className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 max-w-[80%]">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
              {["pdf", "doc", "spreadsheets", "article"].includes(
                contentType,
              ) ? (
                <DocumentIcon size="md" />
              ) : (
                <LinkIcon size="md" />
              )}
            </div>
            <h3
              className="text-lg font-bold text-slate-800 leading-tight line-clamp-2"
              title={title}
            >
              {title}
            </h3>
          </div>

          <div className="flex gap-2 text-slate-400">
            <ShareIcon
              size="md"
              className={`cursor-pointer hover:text-blue-500 transition-colors ${isSharing ? "opacity-50" : ""}`}
              onClick={handleShare}
            />
            {!isSharedView && (
              <TrashIcon
                size="md"
                className={`cursor-pointer hover:text-red-500 transition-colors ${isDeleting ? "opacity-50" : ""}`}
                onClick={handleDelete}
              />
            )}
          </div>
        </header>

        <section className="mb-4 pointer-events-none">
          {/* Pointer events none prevents iframe interactions conflicting with card click */}
          {renderContent()}
        </section>
      </div>

      <footer>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag._id}
              className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full font-medium"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-400">
            {new Date(createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <span>Click to View & Chat</span>
            <BrainIcon size="sm" className="opacity-70" />
          </div>
        </div>
      </footer>

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
