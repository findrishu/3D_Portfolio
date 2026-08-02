import { useState } from "react";
import { MdArrowOutward, MdClose, MdOpenInNew } from "react-icons/md";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props.iframeUrl) {
      e.preventDefault();
      e.stopPropagation();
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <div className="work-image">
        <a
          className="work-image-in"
          href={props.iframeUrl ? undefined : props.link}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target={props.iframeUrl ? undefined : "_blank"}
          data-cursor={"disable"}
          style={{ cursor: "pointer" }}
        >
          {props.link && !props.iframeUrl && (
            <div className="work-link">
              <MdArrowOutward />
            </div>
          )}
          {props.iframeUrl ? (
            <>
              <div className="work-preview-badge">Click to Preview</div>
              <iframe
                src={props.iframeUrl}
                title={props.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 5,
                  pointerEvents: "none",
                  borderRadius: "10px",
                }}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
              <img src={props.image} alt={props.alt} style={{ opacity: 0 }} />
            </>
          ) : (
            <img src={props.image} alt={props.alt} />
          )}
          {isVideo && !props.iframeUrl && (
            <video src={video} autoPlay muted playsInline loop></video>
          )}
        </a>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && props.iframeUrl && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="project-modal-header">
              <h3>{props.alt || "Project Preview"}</h3>
              <div className="project-modal-actions">
                <a
                  href={props.link || props.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-open"
                  data-cursor="disable"
                >
                  <MdOpenInNew /> Open
                </a>
                <button
                  className="project-modal-close"
                  onClick={closeModal}
                  data-cursor="disable"
                >
                  <MdClose />
                </button>
              </div>
            </div>
            <div className="project-modal-body">
              <iframe
                src={props.iframeUrl}
                title={props.alt}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkImage;
