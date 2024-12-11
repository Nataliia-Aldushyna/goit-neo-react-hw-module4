import styles from './ImageCard.module.css';

export default function ImageCard({ src, alt }) {
  return (
    <div className={styles.card}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
}

