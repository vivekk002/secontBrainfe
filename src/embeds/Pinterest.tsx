// Pinterest.tsx
type linkType = string;

interface PinterestProps {
  url: linkType;
}

const Pinterest = ({ url }: PinterestProps) => {
  const getEmbedUrl = (pinterestUrl: string) => {
    // Pinterest embed URL format
    if (pinterestUrl.includes("/pin/")) {
      const pinId = pinterestUrl.split("/pin/")[1].split("/")[0];
      return `https://assets.pinterest.com/ext/embed.html?id=${pinId}`;
    }
    return pinterestUrl;
  };

  return (
    <div className="pinterest-embed h-full">
      <iframe
        className="w-full h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="Pinterest pin"
        style={{ border: "none" }}
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
};

export default Pinterest;
