import React, { useState, useCallback } from 'react';

import { TextInputProps } from 'react-native';

import { Container, TextInputSearch } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
}

const SearchInput: React.FC<InputProps> = ({ value = '', ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFocused={isFocused}>
      <TextInputSearch
        placeholderTextColor="#FFFFFF"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        testID="search-input"
        {...rest}
      />
    </Container>
  );
};

export default SearchInput;
