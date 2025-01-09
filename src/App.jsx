import { useState, useEffect } from 'react';
import { fetchImages } from './services/api';
import toast, { Toaster } from "react-hot-toast";
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import styles from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        const { results, total_pages } = data;

        if (results.length === 0) {
          toast.error('No images found for this query.');
        }

        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPages(total_pages);
      } catch (err) {
        console.error(err);
        setError(`Error: ${err.message || 'Something went wrong. Please try again later.'}`);
      }
      finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }

    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      setTotalPages(0);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageData) => {
    setModalData(imageData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className={styles.App}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {page < totalPages && !isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          image={modalData}
        />
      )}
    </div>
  );
};

export default App;
