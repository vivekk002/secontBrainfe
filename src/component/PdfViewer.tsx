import { useState } from "react";

interface PdfViewerProps {
  url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [imgError, setImgError] = useState(false);

  const getPageUrl = (p: number) => {
    return url
      .replace("/upload/", `/upload/w_800,pg_${p}/`)
      .replace(".pdf", ".jpg");
  };

  if (imgError) {
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
        className="w-full h-full border-none rounded-lg bg-white"
        title="PDF Viewer"
      />
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto flex justify-center p-4">
        <img
          key={page}
          src={getPageUrl(page)}
          alt={`Page ${page}`}
          className="max-w-full shadow-lg border border-slate-200 my-auto"
          onError={() => {
            if (page > 1) {
              setHasMore(false);
              setPage((p) => Math.max(1, p - 1));
            } else {
              setImgError(true);
            }
          }}
        />
      </div>
      <div className="flex justify-center items-center gap-4 p-3 bg-white border-t border-slate-200">
        <button
          onClick={() => {
            setPage((p) => Math.max(1, p - 1));
            setHasMore(true);
          }}
          disabled={page === 1}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50 hover:bg-purple-200 transition-colors"
        >
          Previous
        </button>
        <span className="font-medium text-slate-700">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg disabled:opacity-50 hover:bg-purple-200 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
