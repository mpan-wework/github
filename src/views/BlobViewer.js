import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import Blob from '../components/BlobViewer/Blob/Container';
import NavBar from '../components/BlobViewer/NavBar/Container';
import Repo from '../components/BlobViewer/Repo/Container';
import Path from '../components/BlobViewer/Path/Container';
import SideBar from '../components/BlobViewer/SideBar/Container';
import githubClient from '../service/api/github';
import styles from './BlobViewer.module.scss';

const BlobViewer = () => {
  const [user, setUser] = useState(null);
  const [repoInfo, setRepoInfo] = useState(null);
  const [tree, setTree] = useState({ tree: [] });
  const [blob, setBlob] = useState(undefined);

  const fetchTree = useCallback(
    async () => {
      if (repoInfo) {
        const data = await githubClient.tree(
          repoInfo.owner.value,
          repoInfo.repo.value,
          repoInfo.branch.value,
        );
        setTree(data);
      } else {
        setTree({ tree: [] });
      }
    },
    [repoInfo, setTree],
  );

  useEffect(
    () => {
      if (user) {
        fetchTree();
      }
    },
    [user, fetchTree],
  );

  const visitPath = useCallback(
    async (path) => {
      const pathBlob = tree.tree.find((b) => b.path === path);
      if (pathBlob) {
        const data = await githubClient.blob(pathBlob.url);
        setBlob({ ...pathBlob, ...data, path })
      } else {
        setBlob(undefined)
      }
    },
    [tree, setBlob],
  );

  return (
    <div className={styles.BlobViewer}>
      <div className={styles.sidebarWrapper}>
        <SideBar
          tree={tree}
          currentPath={blob ? blob.path : '/'}
          visitPath={visitPath}
        />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar
          loginCallback={setUser}
        />
        <Repo
          user={user}
          onRepoInfoChange={setRepoInfo}
        />
        <Path
          path={blob ? blob.path : '/'}
          visitPath={visitPath}
        />
        <Blob blob={blob} />
      </div>
    </div>
  );
};

export default BlobViewer;
