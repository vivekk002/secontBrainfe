// Threads.tsx
type linkType = string;

interface ThreadsProps {
  url: linkType;
}

const Threads = ({ url }: ThreadsProps) => {
  // Threads doesn't have official embed API yet, so we'll create a preview card
  return (
    <div className="threads-embed">
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-3xl text-white">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold text-lg">@</span>
          </div>
          <div className="ml-3">
            <p className="font-semibold">Threads Post</p>
            <p className="text-sm opacity-90">Meta's Text Platform</p>
          </div>
        </div>
        <p className="text-sm mb-3">View this post on Threads</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          Open in Threads →
        </a>
      </div>
    </div>
  );
};

export default Threads;
