import store from '../../utils/store';

const createGithubFetchClient = () => {
  const get = async (uri, opts = {}) => {
    const url = /^https:/.test(uri)
      ? uri
      : `https://api.github.com${uri}`;
    try {
      const resp = await window.fetch(
        url,
        {
          headers: {
            Authorization: `token ${store.getItem('token')}`,
            ...opts.headers,
          },
        },
      );
      return resp.ok ? resp.json() : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const user = async (token) => get('/user', {
    headers: { Authorization: `token ${token}`},
  });

  const orgs = async () => get('/user/orgs');

  const tree = async (owner, repo, branch, recursive = true) => {
    return get(`/repos/${owner}/${repo}/git/trees/${branch}${recursive ? '?recursive=1' : ''}`);
  };

  const branches = async (owner, repo) =>
    get(`/repos/${owner}/${repo}/branches`);

  const _searchQuery = (keywords = [], scopes = []) => {
    return [...keywords, ...scopes].join('+');
  };

  const qOwners = async (keyword) => {
    const q = _searchQuery(
      [keyword],
      [
        'in:login',
        'type:user',
        'type:org',
      ],
    );
    return get(`/search/users?q=${q}`);
  };

  const qRepos = async (keyword, scope) => {
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
    get,
    user,
    orgs,
    tree,
    branches,
    qOwners,
    qRepos,
  };
};

const githubFetchClient = createGithubFetchClient();

export default githubFetchClient;

