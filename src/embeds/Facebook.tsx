// Facebook.tsx
type linkType = string;

interface FacebookProps {
  url: linkType;
}

const Facebook = ({ url }: FacebookProps) => {
  console.log("facebook link", url);

  const getEmbedUrl = (facebookUrl: string) => {
    const encodedUrl = encodeURIComponent(facebookUrl);
    return `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&width=500&show_text=true&height=600`;
  };

  return (
    <div className="facebook-embed h-full">
      <iframe
        className="w-full h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="Facebook post"
        style={{ border: "none" }}
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
      />
    </div>
  );
};

export default Facebook;
