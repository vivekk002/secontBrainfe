type linkType = string;

interface Props {
  url: linkType;
}
const Youtube = ({ url }: Props) => {
  const getEmbedUrl = (videoUrl: string) => {
    if (videoUrl.includes("watch?v=")) {
      return videoUrl.replace("watch?v=", "embed/");
    } else if (videoUrl.includes("youtu.be/")) {
      return videoUrl.replace("youtu.be/", "youtube.com/embed/");
    } else if (videoUrl.includes("youtube.com/shorts/")) {
      const videoId = videoUrl.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoUrl;
  };

  return (
    <iframe
      className="p-3 w-full rounded-3xl"
      src={getEmbedUrl(url)}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default Youtube;
