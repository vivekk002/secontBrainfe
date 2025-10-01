type linkType = string;

interface Props {
  url: linkType;
}

const Twitter = ({ url }: Props) => {
  return (
    <div className="tweet-wrapper p-5 h-[100%] flex items-center justify-center">
      <blockquote className="twitter-tweet">
        {/* replace x.com → twitter.com so the widget script recognises it */}
        <a href={url.replace("x.com", "twitter.com")}></a>
      </blockquote>
    </div>
  );
};

export default Twitter;
