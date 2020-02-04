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

  return {
    get,
    user,
    orgs,
    tree,
    branches,
  };
};

const githubFetchClient = createGithubFetchClient();

export default githubFetchClient;

