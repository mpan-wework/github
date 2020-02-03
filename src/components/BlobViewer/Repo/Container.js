import React, { useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import styles from './Container.module.scss';
import useFindRepo from './useFindRepo';

const Container = (props) => {
  const { user, onRepoInfoChange } = props;

  const [
    {
      owner,
      repo,
      branch,
    },
    {
      loadOwnerOptions,
      handleOwnerChange,
      loadRepoOptions,
      handleRepoChange,
      loadBranchOptions,
      handleBranchChange,
    },
  ] = useFindRepo({ user });

  useEffect(
    () => {
      if (!owner || !repo || !branch) {
        return;
      }

      setTimeout(
        () => onRepoInfoChange({
          owner, repo, branch,
        }),
        0,
      );
    },
    [onRepoInfoChange, owner, repo, branch],
  );

  return (
    <div className={styles.Container}>
      <AsyncSelect
        className={styles.ReactSelect}
        value={owner}
        loadOptions={loadOwnerOptions}
        onChange={handleOwnerChange}
      />
      <AsyncSelect
        className={styles.ReactSelect}
        value={repo}
        loadOptions={loadRepoOptions}
        onChange={handleRepoChange}
      />
      <AsyncSelect
        className={styles.ReactSelect}
        value={branch}
        loadOptions={loadBranchOptions}
        onChange={handleBranchChange}
      />
    </div>
  );
};

export default Container;
