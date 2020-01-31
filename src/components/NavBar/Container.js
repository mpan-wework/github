import React, { useCallback, useState } from 'react';
import store from '../../utils/store';
import githubClient from '../../service/api/github';
import styles from './Container.module.scss';

const Container = (props) => {
  const { fetchData } = props;

  const [owner, setOwner] = useState(null);
  const [token, setToken] = useState(store.getItem('token', ''));

  const tokenChange = useCallback(
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
        setTimeout(fetchData, 0);
      }
    },
    [token, setOwner, fetchData],
  );

  const logout = useCallback(
    () => {
      setOwner(null);
    },
    [setOwner],
  );

  return (
    <div className={styles.Container}>
      <input
        className={styles.tokenInput}
        type="text"
        placeholder="Personal Access Token"
        disabled={owner !== null}
        onChange={tokenChange}
        value={token}
      />
      {owner
        ? (
          <>
            <div className={styles.owner}>{owner.login}</div>
            <div
              className={[styles.logout, styles.compButton].join(' ')}
              onClick={logout}
            >
              Log Out
            </div>
          </>
        )
        : (
          <div
            className={[styles.login, styles.compButton].join(' ')}
            onClick={login}
          >
            Log In
          </div>
        )}
    </div>
  );
};

export default Container;
