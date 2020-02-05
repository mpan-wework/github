import { useCallback, useMemo } from 'react';

const useReactSelectStyle = () => {
  const colors = useMemo(
    () => ({
      color: '#4af626',
      backgroundColor: '#24292e',
    }),
    [],
  );
  const styles = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        ...colors,
        borderColor: '#4af626',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        ...colors,
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        ...colors,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        visibility: 'hidden',
      }),
      input: (provided) => ({
        ...provided,
        ...colors,
      }),
      loadingIndicator: (provided) => ({
        ...provided,
        ...colors,
      }),
      loadingMessage: (provided) => ({
        ...provided,
        ...colors,
      }),
      menu: (provided) => ({
        ...provided,
        ...colors,
        border: '1px solid #4af626',
      }),
      menuList: (provided) => ({
        ...provided,
        ...colors,
      }),
      menuPortal: (provided) => ({
        ...provided,
        ...colors,
      }),
      noOptionsMessage: (provided) => ({
        ...provided,
        ...colors,
      }),
      option: (provided) => ({
        ...provided,
        ...colors,
      }),
      placeholder: (provided) => ({
        ...provided,
        ...colors,
      }),
      singleValue: (provided) => ({
        ...provided,
        ...colors,
      }),
      valueContainer: (provided) => ({
        ...provided,
        ...colors,
      }),
    }),
    [colors],
  );

  const theme = useCallback(
    (_theme) => ({
      ..._theme,
    }),
    [],
  );

  return [{ styles, theme }];
};

export default useReactSelectStyle;
