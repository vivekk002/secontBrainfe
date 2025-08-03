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
    <div className="pinterest-embed">
      <iframe
        className="p-3 w-full h-96 rounded-3xl border-0"
        src={getEmbedUrl(url)}
        title="Pinterest pin"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
};

export default Pinterest;
