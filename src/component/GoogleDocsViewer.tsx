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
  const extension = fileUrl.split(".").pop()?.toLowerCase();
  const isOfficeFile = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
    extension || "",
  );

  let viewerUrl;
  const encodedUrl = encodeURIComponent(fileUrl);

  if (isOfficeFile) {
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
  } else {
    viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
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
