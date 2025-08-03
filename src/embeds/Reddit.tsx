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
    <div className="reddit-embed">
      <iframe
        className="p-3 w-full h-96 rounded-3xl border-0"
        src={getEmbedUrl(url)}
        title="Reddit post"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  );
};

export default Reddit;
