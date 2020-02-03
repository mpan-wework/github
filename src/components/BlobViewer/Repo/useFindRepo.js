import { useCallback, useState } from 'react';
import githubClient from '../../../service/api/github';

const useFindRepo = (props) => {
  const { user } = props;

  const [owner, setOwner] = useState(null);
  const [repo, setRepo] = useState(null);
  const [branch, setBranch] = useState(null);

  const loadOwnerOptions = useCallback(
    async (inputValue) => {
      if (!user) {
        return [];
      }

      const orgs = await githubClient.orgs();
      return [user]
        .concat(orgs)
        .filter(
          (ownerItem) =>
            inputValue.trim() === '' ||
            ownerItem.login.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        )
        .map(
          (ownerItem) => ({
            label: ownerItem.login,
            value: ownerItem.login,
            data: ownerItem,
          }),
        );
    },
    [user],
  );

  const handleOwnerChange = useCallback(
    (value) => {
      setOwner(value);
      setRepo(null);
      setBranch(null);
    },
    [],
  );

  const loadRepoOptions = useCallback(
    async (inputValue) => {
      if (!owner) {
        return [];
      }

      const scope = owner.data.type === 'User'
        ? { user: owner.data.login }
        : { org: owner.data.login };

      const data = await githubClient.qrepos(inputValue, scope);
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

  const loadBranchOptions = useCallback(
    async (inputValue) => {
      if (!owner || !repo) {
        return [];
      }

      const branches = await githubClient.branches(owner.data.login, repo.data.name);

      return branches
        .filter(
          (branchItem) =>
            inputValue.trim() === '' ||
            branchItem.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          )
        .map(
          (branchItem) => ({
            label: branchItem.name,
            value: branchItem.name,
            data: branchItem,
          }),
        );
    },
    [owner, repo],
  );

  return [
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
      handleBranchChange: setBranch,
    },
  ];
};

export default useFindRepo;
