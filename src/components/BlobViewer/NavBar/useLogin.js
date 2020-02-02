import { useCallback, useState } from 'react';
import store from '../../../utils/store';
import githubClient from '../../../service/api/github';

const useLogin = (props) => {
  const { loginCallback } = props;

  const [owner, setOwner] = useState(null);
  const [token, setToken] = useState(store.getItem('token', ''));

  const handleTokenChange = useCallback(
    (e) => {
      setToken(e.target.value);
    },
    [setToken],
  );

  const login = useCallback(
    async () => {
      const user = await githubClient.user(token);
      if (user) {
        store.setItem('token', token);
        setOwner(user);
        setTimeout(loginCallback, 0);
      }
    },
    [token, setOwner, loginCallback],
  );

  const logout = useCallback(
    () => {
      setOwner(null);
    },
    [setOwner],
  );

  return [
    {
      owner,
      token,
    },
    {
      handleTokenChange,
      login,
      logout,
    },
  ];
};

export default useLogin;
