import { useCallback, useEffect, useState } from 'react';
import githubClient from '../../../service/api/github';
import useAsyncMemo from '../../shared/useAsyncMemo';
import useAsyncDebouncedCallback from '../../shared/useAsyncDebounceCallback';

const useFindRepo = (props) => {
  const { user } = props;

  const [owner, setOwner] = useState(null);
  const [repo, setRepo] = useState(null);
  const [branch, setBranch] = useState(null);

  useEffect(
    () => {
      if (!user) {
        setOwner(null);
        setRepo(null);
        setBranch(null);
      }
    },
    [user],
  );

  const ownerOptions = useAsyncMemo(
    async () => {
      if (!user) {
        return [];
      }

      const orgs = await githubClient.orgs();

      return [user].concat(orgs).map(
        (ownerItem) => ({
          label: ownerItem.login,
          value: ownerItem.login.toLowerCase(),
          data: ownerItem,
        }),
      );
    },
    [user],
    [],
  );

  const loadOwnerOptions = useAsyncDebouncedCallback(
    async (inputValue) => {
      const data = await githubClient.qOwners(inputValue);
      const owners = data.items.map(
        (ownerItem) => ({
          label: ownerItem.login,
          value: ownerItem.login.toLowerCase(),
          data: ownerItem,
        }),
      );
      return ownerOptions
        .filter(
          (ownerItem) =>
            inputValue.trim() === '' ||
            ownerItem.value.indexOf(inputValue.toLowerCase()) > -1,
        )
        .concat(owners);
    },
    [ownerOptions],
  );

  const handleOwnerChange = useCallback(
    (value) => {
      setOwner(value);
      setRepo(null);
      setBranch(null);
    },
    [],
  );

  const loadRepoOptions = useAsyncDebouncedCallback(
    async (inputValue) => {
      if (!owner) {
        return [];
      }

      const scope = owner.data.type === 'User'
        ? { user: owner.data.login }
        : { org: owner.data.login };

      const data = await githubClient.qRepos(inputValue, scope);
      return data.items.map((repoItem) => ({
        label: repoItem.name,
        value: repoItem.name,
        data: repoItem,
      }));
    },
    [owner],
  );

  const handleRepoChange = useCallback(
    (value) => {
      setRepo(value);
      setBranch(null);
    },
    [],
  );

  const branchOptions = useAsyncMemo(
    async () => {
      if (!owner || !repo) {
        return [];
      }

      const branches = await githubClient.branches(owner.data.login, repo.data.name);
      return branches.map(
        (branchItem) => ({
          label: branchItem.name,
          value: branchItem.name.toLowerCase(),
          data: branchItem,
        }),
      );
    },
    [owner, repo],
  );

  const loadBranchOptions = useCallback(
    async (inputValue) => {
      return branchOptions.filter(
        (branchItem) =>
          inputValue.trim() === '' ||
          branchItem.value.indexOf(inputValue.toLowerCase()) > -1
      );
    },
    [branchOptions],
  );

  return [
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
      handleBranchChange: setBranch,
    },
  ];
};

export default useFindRepo;
