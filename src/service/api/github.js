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
  } = _githubFetchClient;

  const blob = async (blobUrl) => get(blobUrl);

  const _searchQuery = (keywords = [], scopes = []) => {
    return [...keywords, ...scopes].join('+');
  };

  const qrepos = async (keyword, scope) => {
    const q = _searchQuery(
      [keyword],
      [
        'in:name',
        scope.org
          ? `org:${scope.org}`
          : `user:${scope.user}`,
      ]);
    return get(`/search/repositories?q=${q}`);
  };

  return {
    user,
    orgs,
    tree,
    blob,
    branches,
    qrepos,
  };
};

const githubClient = createGithubClient();

export default githubClient;