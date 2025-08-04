type linkType = string;

interface Props {
  url: linkType;
}
const Youtube = ({ url }: Props) => {
  const getEmbedUrl = (videoUrl: string) => {
    let videoId = "";

    // Handle different YouTube URL formats
    if (videoUrl.includes("watch?v=")) {
      videoId = videoUrl.split("watch?v=")[1].split("&")[0];
    } else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
    } else if (videoUrl.includes("youtube.com/shorts/")) {
      videoId = videoUrl.split("/shorts/")[1].split("?")[0];
    } else if (videoUrl.includes("youtube.com/embed/")) {
      // Already an embed URL
      return videoUrl;
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return videoUrl;
  };

  return (
    <div className="youtube-embed h-full">
      <iframe
        className="w-full h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="YouTube video player"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Youtube;
