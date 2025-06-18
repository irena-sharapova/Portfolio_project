import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState, useEffect, useRef } from 'react';
import 'photoswipe/dist/photoswipe.css';
import '../CSS/Overview.css';

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

const portraitImages = allImages.filter(img => img.type === 'people');
const natureThingsImages = allImages.filter(
  img => img.type === 'nature' || img.type === 'things'
);

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
    <Gallery>
      <div className="scroll-section">
        <ScrollGallery title="Portraits" images={portraitImages} />
        <ScrollGallery title="Nature & Things" images={natureThingsImages} />
      </div>
    </Gallery>
  );
}
