import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import { MdClose, MdOpenInNew } from "react-icons/md";
import "./MyWorks.css";

const MyWorks = () => {
  const [modalProject, setModalProject] = useState<any>(null);

  const openModal = (project: any) => {
    if (project.iframeUrl) {
      setModalProject(project);
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setModalProject(null);
    document.body.style.overflow = "";
  };

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div
            className="myworks-card"
            key={project.id}
            data-cursor="disable"
            onClick={() => openModal(project)}
            style={{ cursor: (project as any).iframeUrl ? "pointer" : "default" }}
          >
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              {(project as any).iframeUrl ? (
                <>
                  <iframe
                    src={(project as any).iframeUrl}
                    title={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "300px",
                      border: "none",
                      pointerEvents: "none",
                    }}
                    loading="lazy"
                  />
                </>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="myworks-card-info">
              <h3>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.title}
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="myworks-card-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {modalProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-header">
              <h3>{modalProject.title}</h3>
              <div className="project-modal-actions">
                <a
                  href={modalProject.link || modalProject.iframeUrl}
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
                src={modalProject.iframeUrl}
                title={modalProject.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWorks;
