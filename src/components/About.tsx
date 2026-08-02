import "./styles/About.css";
import { config } from "../config";
import { useContent } from "../context/ContentProvider";

const About = () => {
  const { aboutMe } = useContent();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p className="para">
          {aboutMe}
        </p>
      </div>
    </div>
  );
};

export default About;
