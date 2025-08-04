// Reddit.tsx
type linkType = string;

interface RedditProps {
  url: linkType;
}

const Reddit = ({ url }: RedditProps) => {
  console.log("reddit link", url);

  const getEmbedUrl = (redditUrl: string) => {
    // Reddit embed URL format
    return (
      redditUrl.replace("www.reddit.com", "www.redditmedia.com") +
      "?ref_source=embed&ref=share&embed=true"
    );
  };

  return (
    <div className="reddit-embed h-full">
      <iframe
        className="h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="Reddit post"
        style={{ border: "none" }}
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
};

export default Reddit;
