// LinkedIn.tsx
type linkType = string;

interface LinkedInProps {
  url: linkType;
}

const LinkedIn = ({ url }: LinkedInProps) => {
  const getEmbedUrl = (linkedinUrl: string) => {
    if (linkedinUrl.includes("/posts/")) {
      return `https://www.linkedin.com/embed/feed/update/${
        linkedinUrl.split("/posts/")[1].split("/")[0]
      }`;
    }
    return linkedinUrl;
  };

  return (
    <div className="linkedin-embed">
      <iframe
        className="p-3 w-full h-96 rounded-3xl border-0"
        src={getEmbedUrl(url)}
        title="LinkedIn post"
        frameBorder="0"
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

export default LinkedIn;
