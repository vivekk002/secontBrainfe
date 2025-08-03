// Spotify.tsx
type linkType = string;

interface SpotifyProps {
  url: linkType;
}

const Spotify = ({ url }: SpotifyProps) => {
  console.log("spotify link", url);

  const getEmbedUrl = (spotifyUrl: string) => {
    // Convert Spotify URL to embed format
    if (spotifyUrl.includes("spotify.com/")) {
      return spotifyUrl.replace("spotify.com/", "spotify.com/embed/");
    } else if (spotifyUrl.includes("open.spotify.com/")) {
      return spotifyUrl.replace("open.spotify.com/", "open.spotify.com/embed/");
    }
    return spotifyUrl;
  };

  return (
    <div className="spotify-embed">
      <iframe
        className="p-3 w-full rounded-3xl"
        src={getEmbedUrl(url)}
        width="100%"
        height="232"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify player"
      />
    </div>
  );
};

export default Spotify;
