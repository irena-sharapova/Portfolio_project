import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState, useEffect } from 'react';
import 'photoswipe/dist/photoswipe.css';
import '../CSS/Overview.css';

const images = Object.values(
  import.meta.glob('../assets/Images/images_overview/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default'
  })
);

export default function Overview() {
  const [imageDimensions, setImageDimensions] = useState([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        images.map(src => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
              });
            };
          });
        })
      );
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, []);

  return (
    <Gallery>
    <div className="photo-grid">
      {images.map((src, index) => (
        <Item
          key={index}
          original={src}
          thumbnail={src}
          width={imageDimensions[index]?.width || 1200}
          height={imageDimensions[index]?.height || 800}
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={src}
              className="photo-item"
              alt={`Gallery image ${index + 1}`}
            />
          )}
        </Item>
      ))}
    </div>
  </Gallery>
  );
}
