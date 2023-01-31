import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { AppContainer } from './App.styled';

const PERSONAL_KEY = '29444023-fe7d4e5e60b2e765be0bef471';

export const App = () => {
  const [imageArray, setImageArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setImageArray([]);
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${PERSONAL_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        return res.json();
      })
      .then(Array => {
        const photos = Array.hits.map(({ largeImageURL, webformatURL, id }) => {
          return {
            largeImageURL,
            webformatURL,
            id,
          };
        });
        if (page === 1) {
          setImageArray(photos);
        } else {
          setImageArray(state => [...state, ...photos]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, searchQuery]);

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const toggleModal = modalImgURL => {
    setShowModal(state => !state);
    setModalImg(modalImgURL);
  };

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSearchSubmit} />
      {imageArray && (
        <ImageGallery imageArray={imageArray} onClick={toggleModal} />
      )}
      {imageArray.length > 11 && <Button onLoadMore={loadMore} />}
      {loading && <Loader />}
      {showModal && <Modal modalImgURL={modalImg} onClose={toggleModal} />}

      <ToastContainer autoClose={3000} theme="colored" />
    </AppContainer>
  );
};
