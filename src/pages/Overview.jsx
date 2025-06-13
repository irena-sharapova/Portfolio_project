import { useState } from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import '../CSS/Overview.css'; 

const images = Object.values(
  import.meta.glob('../assets/Images/images_overview/*.{jpg,jpeg,png}', {
    eager: true,
    query: '?url',
    import: 'default'
  })
);

export default function Overview() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="photo-grid">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Photo ${index + 1}`}
          className="photo-item"
          onClick={() => {
            setPhotoIndex(index);
            setIsOpen(true);
          }}
        />
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}
