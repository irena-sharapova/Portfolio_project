import { Gallery, Item } from "react-photoswipe-gallery";
import { useState, useEffect, useRef } from "react";
import "photoswipe/dist/photoswipe.css";
import "../CSS/Overview.css";
import profilePhoto from "../assets/Images/portfolio_1.jpg";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const allImages = Object.entries(
  import.meta.glob("../assets/Images/images_overview/*.{jpg,jpeg,png}", {
    eager: true,
    query: "?url",
    import: "default",
  })
).map(([path, url]) => {
  const typeMatch = path.match(/\/(\w+)_\d+/);
  const type = typeMatch ? typeMatch[1].toLowerCase() : "unknown";
  return { src: url, type };
});

const combinedImages = [...allImages];

function ScrollGallery({ title, images }) {
  const scrollRef = useRef(null);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const loadDims = async () => {
      const dims = await Promise.all(
        images.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
              resolve({
                width: image.naturalWidth,
                height: image.naturalHeight,
              });
            };
          });
        })
      );
      setDimensions(dims);
    };
    loadDims();
  }, [images]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="gallery-section">
      <h2>{title}</h2>
      <div className="scroll-wrapper">
        <button className="scroll-arrow left" onClick={() => scroll("left")}>
          <svg viewBox="0 0 20 20">
            <path d="M13 15l-5-5 5-5v10z" />
          </svg>
        </button>

        <div className="horizontal-scroll" ref={scrollRef}>
          {images.map((img, index) => (
            <Item
              key={index}
              original={img.src}
              thumbnail={img.src}
              width={dimensions[index]?.width || 1200}
              height={dimensions[index]?.height || 800}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={img.src}
                  className="scroll-photo"
                  alt={`Image ${index + 1}`}
                />
              )}
            </Item>
          ))}
        </div>

        <button className="scroll-arrow right" onClick={() => scroll("right")}>
          <svg viewBox="0 0 20 20">
            <path d="M7 5l5 5-5 5V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Overview() {
  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToContact");
    if (shouldScroll === "true") {
      localStorage.removeItem("scrollToContact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact-note");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <img src={profilePhoto} alt="Profile" className="profile-photo" />
          <div className="profile-text">
            <h1 className="headline">CREATIVE MIND, TECH HEART</h1>
            <p className="headline-description">
              Hi, I'm Irina — a photographer at heart — I love capturing people,
              places, and products through thoughtful, creative storytelling.
              Whether it’s a portrait, a styled product shoot, or a landscape
              glowing with natural light, I find meaning in every frame.
              <br />
              <br />
              I’m also a web developer with a passion for blending logic and
              design. From clean, accessible interfaces to intuitive user
              experiences, I enjoy building digital spaces that feel both
              functional and personal.
            </p>
          </div>
        </div>
      </div>
      <Gallery>
        <div className="scroll-section">
          <ScrollGallery images={combinedImages} />
        </div>
      </Gallery>
      <div id="contact-note" className="contact-note">
        <h2>Let’s Connect</h2>
        <p>
          I'm always open to creative collaborations and new projects. Whether
          you're looking for a photographer or a website, feel free to{" "}
          <strong>DM me</strong> on social media!
          <br />
          I’d love to hear from you!
        </p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/irena_sharapova/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://www.facebook.com/irina.sharapova.73307"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook size={28} />
          </a>
        </div>
      </div>
    </>
  );
}
