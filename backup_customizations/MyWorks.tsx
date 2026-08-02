import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
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
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              {(project as any).iframeUrl ? (
                <iframe src={(project as any).iframeUrl} title={project.title} style={{ width: '100%', height: '100%', minHeight: '300px', border: 'none' }} />
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="myworks-card-info">
              <h3>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                ) : project.title}
              </h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="myworks-card-link">View Project →</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
