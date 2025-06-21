import "../CSS/AboutMe.css";
import profilePhoto2 from "../assets/Images/portfolio_2.jpg";

export default function AboutMe() {
  return (
    <div className="about-section">
      <div className="about-container">
        <img src={profilePhoto2} alt="My photo" className="about-photo" />
        <div className="about-text">
          <h1>ABOUT ME</h1>
          <p>
            I'm Irina — a passionate web developer and photographer. My journey
            began far from lines of code, rooted in project management and
            visual storytelling through photography. Over time, I discovered a
            love for building digital experiences that are both functional and
            beautiful. Today, I bring creativity, structure, and a strong
            problem-solving mindset to every project. Whether it’s designing
            user-friendly interfaces or capturing meaningful moments behind the
            lens, I’m always driven by curiosity and a desire to create
            something that connects with people.
          </p>
        </div>
      </div>
    </div>
  );
}
