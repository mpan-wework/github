import githubFetchClient from './githubFetchClient';
import octokitClient from './octokitClient';

const createGithubClient = () => {
  const _octokitClient = octokitClient;
  const _githubFetchClient = githubFetchClient;

  const { user } = _octokitClient;

  const {
    get,
    orgs,
    tree,
    branches,
    qOwners,
    qRepos,
  } = _githubFetchClient;

  const blob = async (blobUrl) => get(blobUrl);

  return {
    user,
    orgs,
    tree,
    blob,
    branches,
    qOwners,
    qRepos,
  };
};

const githubClient = createGithubClient();

export default githubClient;