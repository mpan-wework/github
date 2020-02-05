import githubFetchClient from './githubFetchClient';
import octokitClient from './octokitClient';
import cache from '../../utils/cache';

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

  const blob = async (blobUrl) => {
    if (cache.hasItem(blobUrl)) {
      return JSON.parse(cache.getItem(blobUrl));
    }

    const body = await get(blobUrl);
    cache.setItem(blobUrl, JSON.stringify(body));
    return body;
  };

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