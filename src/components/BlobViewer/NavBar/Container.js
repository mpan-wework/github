import React from 'react';
import styles from './Container.module.scss';
import useLogin from './useLogin';

const Container = (props) => {
  const { loginCallback } = props;

  const [
    {
      owner,
      token,
    },
    {
      handleTokenChange,
      login,
      logout,
    },
  ] = useLogin({ loginCallback });

  return (
    <div className={styles.Container}>
      <input
        className={styles.tokenInput}
        type="text"
        placeholder="Personal Access Token"
        disabled={owner !== null}
        onChange={handleTokenChange}
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
