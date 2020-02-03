import React, { useEffect } from 'react';
import Select from 'react-select/async';
import useFindRepo from './useFindRepo';
import useReactSelectStyle from './useReactSelectStyle';
import styles from './Container.module.scss';

const Container = (props) => {
  const { user, onRepoInfoChange } = props;

  const [
    {
      owner,
      ownerOptions,
      repo,
      branch,
      branchOptions,
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

  const [styleProps] = useReactSelectStyle();

  return (
    <div className={styles.Container}>
      <Select
        className={styles.ReactSelect}
        value={owner}
        defaultOptions={ownerOptions}
        loadOptions={loadOwnerOptions}
        onChange={handleOwnerChange}
        placeholder="User / Organization"
        {...styleProps}
      />
      <Select
        className={styles.ReactSelect}
        value={repo}
        loadOptions={loadRepoOptions}
        onChange={handleRepoChange}
        placeholder="Repo"
        {...styleProps}
      />
      <Select
        className={styles.ReactSelect}
        value={branch}
        defaultOptions={branchOptions}
        loadOptions={loadBranchOptions}
        onChange={handleBranchChange}
        placeholder="Branch"
        {...styleProps}
      />
    </div>
  );
};

export default Container;
