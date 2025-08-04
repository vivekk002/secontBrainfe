// Medium.tsx
type linkType = string;

interface MediumProps {
  url: linkType;
}

const Medium = ({ url }: MediumProps) => {
  console.log("medium link", url);

  // Medium doesn't have direct embed, so we'll create a preview card
  return (
    <div className="medium-embed h-full">
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-3xl h-full flex flex-col justify-center">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-800">Medium Article</p>
            <p className="text-sm text-gray-600">Read on Medium</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border">
          <p className="text-gray-700 text-sm mb-3">
            Click to read the full article on Medium
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors inline-block"
          >
            Read Article →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Medium;
