import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState, useEffect } from 'react';
import 'photoswipe/dist/photoswipe.css';
import '../CSS/Things.css'; 

const allImages = Object.entries(
  import.meta.glob('../assets/Images/images_overview/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
).map(([path, url]) => {
  const typeMatch = path.toLowerCase().match(/images_overview\/(\w+)_/);

  return {
    src: url,
    type: typeMatch ? typeMatch[1] : 'unknown',
  };
});

const peopleImages = allImages.filter(img => img.type === 'things');

export default function Things() {
  const [imageDimensions, setImageDimensions] = useState([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        peopleImages.map(({ src }) => {
          return new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              resolve({ width: img.naturalWidth, height: img.naturalHeight });
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
      {peopleImages.map((image, index) => (
        <Item
          key={index}
          original={image.src}
          thumbnail={image.src}
          width={imageDimensions[index]?.width || 1200}
          height={imageDimensions[index]?.height || 800}
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={image.src}
              className="photo-item"
              alt={`Things photo ${index + 1}`}
            />
          )}
        </Item>
      ))}
    </div>
  </Gallery>
  );
}
