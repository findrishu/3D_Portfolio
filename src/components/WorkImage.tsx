import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  iframeUrl?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && !props.iframeUrl && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {props.iframeUrl ? (
          <>
            <img src={props.image} alt={props.alt} style={{ opacity: 0 }} />
            <iframe 
              src={props.iframeUrl} 
              title={props.alt} 
              style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0, zIndex: 5, pointerEvents: 'auto', borderRadius: '10px' }} 
              sandbox="allow-scripts allow-same-origin"
            />
          </>
        ) : (
          <img src={props.image} alt={props.alt} />
        )}
        {isVideo && !props.iframeUrl && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
