import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import styles from './App.module.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });

        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prev) => [...prev, ...response.data.results]);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
      
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleImageClick = (image) => setSelectedImage(image);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearchSubmit} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {loading && <Loader />}

      {!loading && images.length > 0 && !error && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
