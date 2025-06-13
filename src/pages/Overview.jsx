import { Gallery, Item } from 'react-photoswipe-gallery';
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
  return (
    <Gallery>
      <div className="photo-grid">
        {images.map((src, index) => (
          <Item
            key={index}
            original={src}
            thumbnail={src}
            width="1200"
            height="800"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={src}
                alt={`Photo ${index + 1}`}
                className="photo-item"
              />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}
