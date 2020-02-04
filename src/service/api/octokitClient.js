import { Octokit } from '@octokit/rest';

const createOctokitClient = () => {
  let _octokit = null;

  const api = async (url) => {
    if (!_octokit) {
      console.error('Octokit missing!');
      return null;
    }

    const resp = await _octokit.request(url);
    if (resp.status < 200 || resp.status >= 300) {
      console.error(resp);
      return null
    }
    return resp.data;
  };

  const user = async (auth) => {
    _octokit = new Octokit({ auth });
    rateLimit();
    return api('/user');
  };

  const rateLimit = async () => _octokit?.rateLimit.get();

  return {
    user,
    rateLimit,
  };
};

const octokitClient = createOctokitClient();

export default octokitClient;
