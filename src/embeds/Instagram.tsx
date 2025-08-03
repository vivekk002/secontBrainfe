// Instagram.tsx
type linkType = string;

interface InstagramProps {
  url: linkType;
}

const Instagram = ({ url }: InstagramProps) => {
  const getEmbedUrl = (instagramUrl: string) => {
    if (instagramUrl.includes("/p/") || instagramUrl.includes("/reel/")) {
      return instagramUrl.endsWith("/")
        ? `${instagramUrl}embed/`
        : `${instagramUrl}/embed/`;
    }
    return instagramUrl;
  };

  return (
    <div className="instagram-embed">
      <iframe
        className="p-3 w-full h-96 rounded-3xl border-0"
        src={getEmbedUrl(url)}
        title="Instagram post"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
      />
    </div>
  );
};

export default Instagram;
