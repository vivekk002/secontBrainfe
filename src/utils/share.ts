import axios from "axios";
import { BACKEND_URL } from "../config";

// Share the entire brain (all content)
export const shareBrain = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/brain/share`, {
      share: true,
    });

    // Based on the backend code, the response includes shareLink
    return response.data.shareLink || null;
  } catch (error) {
    console.error("Error sharing brain:", error);
    throw error;
  }
};

// Unshare the brain
export const unshareBrain = async (): Promise<void> => {
  try {
    await axios.post(`${BACKEND_URL}/brain/share`, {
      share: false,
    });
  } catch (error) {
    console.error("Error unsharing brain:", error);
    throw error;
  }
};

// Share individual content
export const shareContent = async (
  contentId: string,
  contentLink: string
): Promise<string | null> => {
  try {
    console.log("Sharing content with ID:", contentId);
    // First, create a shareable link on the backend
    const response = await axios.post(
      `${BACKEND_URL}/content/${contentId}/share`
    );

    console.log("Share response:", response.data);

    if (response.data.shareLink) {
      const shareLink = response.data.shareLink;

      // Try to use native share API first
      if (navigator.share) {
        await navigator.share({
          title: "Shared from Second Brain",
          text: "Check out this content I found interesting!",
          url: shareLink,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareLink);
      }

      return shareLink;
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
    return {
      isShared: response.data.isShared,
      shareLink: response.data.shareLink,
    };
  } catch (error) {
    console.error("Error getting share status:", error);
    return { isShared: false };
  }
};

// Delete content
export const deleteContent = async (contentId: string): Promise<void> => {
  try {
    console.log("Deleting content with ID:", contentId);
    const response = await axios.delete(`${BACKEND_URL}/content/${contentId}`);
    console.log("Delete response:", response.data);
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
};
