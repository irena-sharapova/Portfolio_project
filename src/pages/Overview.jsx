import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState, useEffect, useRef } from 'react';
import 'photoswipe/dist/photoswipe.css';
import '../CSS/Overview.css';
import profilePhoto from '../assets/Images/portfolio_1.jpg';

const allImages = Object.entries(
  import.meta.glob('../assets/Images/images_overview/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
).map(([path, url]) => {
  const typeMatch = path.match(/\/(\w+)_\d+/);
  const type = typeMatch ? typeMatch[1].toLowerCase() : 'unknown';
  return { src: url, type };
});

const combinedImages = [...allImages];

function ScrollGallery({ title, images }) {
  const scrollRef = useRef(null);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    const loadDims = async () => {
      const dims = await Promise.all(
        images.map(img => {
          return new Promise(resolve => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
              resolve({
                width: image.naturalWidth,
                height: image.naturalHeight
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
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="gallery-section">
      <h2>{title}</h2>
      <div className="scroll-wrapper">
        <button className="scroll-arrow left" onClick={() => scroll('left')}>
          <svg viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5v10z"/></svg>
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

        <button className="scroll-arrow right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 20 20"><path d="M7 5l5 5-5 5V5z"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <img src={profilePhoto} alt="Profile" className="profile-photo" />
          <div className="profile-text">
            <h1>PORTFOLIO</h1>
            <p>Bacon ipsum dolor amet beef ribs cupim shankle, jerky jowl kielbasa prosciutto picanha ball tip chuck. Ribeye pancetta swine ham chislic biltong. Tongue pork chop picanha ground round shankle shoulder short ribs. Biltong pastrami drumstick, bresaola turkey boudin pancetta sausage shank ham hock.</p>
          </div>
        </div>
      </div>
      <Gallery>
        <div className="scroll-section">
          <ScrollGallery title="Gallery" images={combinedImages} />
        </div>
      </Gallery>
    </>
  );
}
