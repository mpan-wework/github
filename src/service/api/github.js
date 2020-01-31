import store from '../../utils/store';

const get = async (uri, opts = {}) => {
  try {
    const resp = await window.fetch(
      `https://api.github.com${uri}`,
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

  return {
    user,
    orgs,
  };
};

const githubClient = createGithubClient();

export default githubClient;