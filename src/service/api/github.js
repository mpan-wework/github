import store from '../../utils/store';

const get = async (uri, opts = {}) => {
  const url = /^https:/.test(uri) ? uri : `https://api.github.com${uri}`;
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

const createGithubClient = () => {
  const user = async (token) => {
    return get('/user', {
      headers: { Authorization: `token ${token}`},
    });
  };

  const orgs = async () => {
    return get('/user/orgs');
  };

  const tree = async (owner, repo, branch, recursive = true) => {
    return get(`/repos/${owner}/${repo}/git/trees/${branch}${recursive ? '?recursive=1' : ''}`);
  };

  const blob = async (blobUrl) => {
    return get(blobUrl);
  };

  return {
    user,
    orgs,
    tree,
    blob,
  };
};

const githubClient = createGithubClient();

export default githubClient;