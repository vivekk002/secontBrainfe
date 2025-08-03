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
    <div className="facebook-embed">
      <iframe
        className="p-3 w-full h-96 rounded-3xl border-0"
        src={getEmbedUrl(url)}
        title="Facebook post"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
      />
    </div>
  );
};

export default Facebook;
