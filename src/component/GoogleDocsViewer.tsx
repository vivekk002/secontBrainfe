interface GoogleDocsViewerProps {
  fileUrl: string;
  fileName: string;
  height?: string;
  className?: string;
}

export default function GoogleDocsViewer({
  fileUrl,
  fileName,
  height = "600px",
  className = "",
}: GoogleDocsViewerProps) {
  // Handle URLs with query parameters
  const cleanUrl = fileUrl.split("?")[0];
  const extension = cleanUrl.split(".").pop()?.toLowerCase();

  const isOfficeFile = ["doc", "docx", "ppt", "pptx"].includes(extension || "");
  const isPdf = extension === "pdf";

  let viewerUrl;
  const encodedUrl = encodeURIComponent(fileUrl);

  if (isPdf) {
    // Use Google Docs Viewer for multi-page PDF support
    viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  } else if (isOfficeFile) {
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
  } else {
    viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
  }

  if (isPdf) {
    return (
      <div
        className={`document-viewer ${className} flex flex-col`}
        style={{ height: height }}
      >
        <div className="bg-slate-800 text-white px-4 py-2 flex justify-between items-center text-sm shrink-0">
          <span className="truncate font-medium">{fileName}</span>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-purple-300 transition-colors text-xs"
          >
            <span>Open Original</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
        <iframe
          src={viewerUrl}
          className="flex-1 w-full"
          style={{ border: "none", minHeight: "500px" }}
          title={fileName}
        />
      </div>
    );
  }

  return (
    <div
      className={`document-viewer ${className} relative bg-gray-100 rounded-lg overflow-hidden`}
    >
      <iframe
        src={viewerUrl}
        width="100%"
        height={height}
        frameBorder="0"
        title={fileName}
        style={{ border: "none" }}
        className="rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
