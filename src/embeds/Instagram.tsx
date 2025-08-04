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
    <div className="instagram-embed h-full">
      <iframe
        className="w-full h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="Instagram post"
        style={{ border: "none" }}
        scrolling="no"
        allowTransparency={true}
      />
    </div>
  );
};

export default Instagram;
