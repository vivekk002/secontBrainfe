import { useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import { shareBrain, unshareBrain, copyToClipboard } from "../utils/share";
import { useToast } from "../hooks/useToast";
import Toast from "./Toast";

interface ShareModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal = ({ open, setOpen }: ShareModalProps) => {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const link = await shareBrain();
      if (link) {
        setShareLink(link);
        setIsShared(true);
        showToast("Brain shared successfully!", "success");
      } else {
        showToast("Failed to generate share link", "error");
      }
    } catch (error) {
      showToast("Failed to share brain", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnshare = async () => {
    setIsLoading(true);
    try {
      await unshareBrain();
      setShareLink(null);
      setIsShared(false);
      showToast("Brain unshared successfully!", "success");
    } catch (error) {
      showToast("Failed to unshare brain", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (shareLink) {
      try {
        await copyToClipboard(shareLink);
        showToast("Link copied to clipboard!", "success");
      } catch (error) {
        showToast("Failed to copy link", "error");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40 w-full h-full z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Share Your Brain</h2>
          <CrossIcon
            size="lg"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Create a shareable link for your entire brain collection. Anyone
            with the link can view your shared content.
          </p>

          {!isShared ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Click the button below to generate a shareable link for your
                brain.
              </p>
              <Button
                size="lg"
                variant="primary"
                label={isLoading ? "Sharing..." : "Share Brain"}
                className="w-full justify-center"
                onClick={handleShare}
                disabled={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Share Link:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareLink || ""}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    label="Copy"
                    onClick={handleCopyLink}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant="secondary"
                  label="Unshare"
                  onClick={handleUnshare}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  size="lg"
                  variant="primary"
                  label="Copy Link"
                  onClick={handleCopyLink}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
          position="bottom-right"
          duration={4000}
        />
      </div>
    </div>
  );
};

export default ShareModal;
