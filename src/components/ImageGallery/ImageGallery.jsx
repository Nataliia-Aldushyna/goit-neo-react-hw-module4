import styles from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={styles.item}>
          <img
            src={urls.small}
            alt={alt_description}
            className={styles.image}
            onClick={() => onImageClick(urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
}