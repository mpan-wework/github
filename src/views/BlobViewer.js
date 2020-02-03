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

  useEffect(
    () => {
      if (!user) {
        setRepoInfo(null);
        setTree({ tree: [] });
        setBlob(undefined);
      }
    },
    [user],
  );

  useEffect(
    () => {
      const fn = async () => {
        if (repoInfo) {
          const data = await githubClient.tree(
            repoInfo.owner.value,
            repoInfo.repo.value,
            repoInfo.branch.value,
          );
          setTree(data);
        }
      };
      fn();
    },
    [repoInfo],
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
    [tree],
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
