import React, { useCallback, useEffect, useState } from 'react';
import Blob from '../components/BlobViewer/Blob/Container';
import NavBar from '../components/BlobViewer/NavBar/Container';
import Repo from '../components/BlobViewer/Repo/Container';
import Path from '../components/BlobViewer/Path/Container';
import SideBar from '../components/BlobViewer/SideBar/Container';
import githubClient from '../service/api/github';
import styles from './BlobViewer.module.scss';
import useAsyncEffect from '../components/shared/useAsyncEffect';

const BlobViewer = () => {
  const [user, setUser] = useState(null);
  const [repoInfo, setRepoInfo] = useState(null);
  const [tree, setTree] = useState(null);
  const [blob, setBlob] = useState(undefined);

  useEffect(() => {
    if (!user) {
      setRepoInfo(null);
      setTree(null);
      setBlob(undefined);
    }
  }, [user]);

  useAsyncEffect(async () => {
    if (repoInfo) {
      const data = await githubClient.tree(
        repoInfo.owner.value,
        repoInfo.repo.value,
        repoInfo.branch.value,
      );
      setTree(data);
    }
  }, [repoInfo]);

  const visitPath = useCallback(
    (path) => {
      if (tree) {
        const pathBlob = tree.tree.find((b) => b.path === path);
        if (pathBlob) {
          setBlob({ ...pathBlob, path });
        } else {
          setBlob(undefined);
        }
      } else {
        setBlob(undefined);
      }
    },
    [tree],
  );

  return (
    <div className={styles.BlobViewer}>
      <div className={styles.sidebarWrapper}>
        <SideBar tree={tree} blob={blob} visitPath={visitPath} />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar loginCallback={setUser} />
        <Repo user={user} onRepoInfoChange={setRepoInfo} />
        <Path path={blob ? blob.path : ''} visitPath={visitPath} />
        <Blob blob={blob} />
      </div>
    </div>
  );
};

export default BlobViewer;
