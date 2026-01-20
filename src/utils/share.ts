import axios from "axios";
import { BACKEND_URL } from "../config";

// Get the frontend URL base for correct sharing
const getFrontendOrigin = () =>
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "http://localhost:3000";

// Share the entire brain (all content) - returns public view URL
export const shareBrain = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/brain/share`, {
      share: true,
    });
    // The backend returns something like http://localhost:3000/api/v1/brain/<hash>
    if (response.data.shareLink) {
      // Convert API URL to frontend public URL
      const hash = response.data.shareLink.split("/").pop();
      return `${getFrontendOrigin()}/brain/${hash}`;
    }
    return null;
  } catch (error) {
    console.error("Error sharing brain:", error);
    throw error;
  }
};

// Unshare the brain
export const unshareBrain = async (): Promise<void> => {
  try {
    await axios.post(`${BACKEND_URL}/brain/share`, { share: false });
  } catch (error) {
    console.error("Error unsharing brain:", error);
    throw error;
  }
};

// Share individual content - returns frontend public view URL
export const shareContent = async (
  contentId: string,
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/content/${contentId}/share`,
    );
    if (response.data.shareLink) {
      // The backend returns http://localhost:3000/api/v1/content/share/<hash>
      const hash = response.data.shareLink.split("/").pop();
      // Build frontend public URL
      const publicUrl = `${getFrontendOrigin()}/content/${hash}`;

      // Try to use native share API first
      if (navigator.share) {
        await navigator.share({
          title: "Shared from Second Brain",
          text: "Check out this content I found interesting!",
          url: publicUrl,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(publicUrl);
      }

      return publicUrl;
    }
    return null;
  } catch (error) {
    console.error("Error sharing content:", error);
    throw error;
  }
};

// Copy link to clipboard
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    throw error;
  }
};

// Get share status
export const getShareStatus = async (): Promise<{
  isShared: boolean;
  shareLink?: string;
}> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/brain/share`);
    let shareLink;
    if (response.data.shareLink) {
      // Convert API link to public frontend link
      const hash = response.data.shareLink.split("/").pop();
      shareLink = `${getFrontendOrigin()}/brain/${hash}`;
    }
    return {
      isShared: response.data.isShared,
      shareLink,
    };
  } catch (error) {
    console.error("Error getting share status:", error);
    return { isShared: false };
  }
};

// Delete content
export const deleteContent = async (contentId: string): Promise<void> => {
  try {
    await axios.delete(`${BACKEND_URL}/content/${contentId}`);
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
};
