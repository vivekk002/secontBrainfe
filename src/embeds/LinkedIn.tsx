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
    <div className="linkedin-embed h-full">
      <iframe
        className="w-full h-full rounded-3xl"
        src={getEmbedUrl(url)}
        title="LinkedIn post"
        style={{ border: "none" }}
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

export default LinkedIn;
