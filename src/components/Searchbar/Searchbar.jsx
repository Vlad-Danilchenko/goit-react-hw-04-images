import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  HeaderContainer,
  SearchForm,
  FormButton,
  FormButtonLabel,
  FormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Заповніть поле пошуку');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <HeaderContainer>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <FiSearch />
          <FormButtonLabel>Search</FormButtonLabel>
        </FormButton>

        <FormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </SearchForm>
    </HeaderContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
