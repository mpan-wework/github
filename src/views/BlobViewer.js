import React, { useCallback, useState } from 'react';
import Blob from '../components/BlobViewer/Blob/Container';
import NavBar from '../components/BlobViewer/NavBar/Container';
import Path from '../components/BlobViewer/Path/Container';
import SideBar from '../components/BlobViewer/SideBar/Container';
import githubClient from '../service/api/github';
import styles from './BlobViewer.module.scss';

const defaultBlob = {
  path: '/',
  name: '/',
  subs: [],
  depth: 0,
};

const BlobViewer = () => {
  const [owner] = useState('mpan-wework');
  const [repo] = useState('github');
  const [branch] = useState('master');
  const [blobs, setBlobs] = useState([]);
  const [blob, setBlob] = useState(defaultBlob);

  const fetchTree = useCallback(
    async () => {
      const tree = await githubClient.tree(owner, repo, branch);
      setBlobs(tree.tree);
    },
    [owner, repo, branch, setBlobs],
  )

  const fetchData = useCallback(
    async () => {
      await githubClient.orgs();
      setTimeout(() => fetchTree(), 0);
    },
    [fetchTree],
  );

  const visitPath = useCallback(
    async (path) => {
      const pathBlob = blobs.find((b) => b.path === path);
      if (pathBlob) {
        const data = await githubClient.blob(pathBlob.url);
        setBlob({ ...pathBlob, ...data, path })
      } else {
        setBlob(defaultBlob)
      }
    },
    [blobs, setBlob],
  );

  return (
    <div className={styles.BlobViewer}>
      <div className={styles.sidebarWrapper}>
        <SideBar
          blobs={blobs}
          blob={blob}
          visitPath={visitPath}
        />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar fetchData={fetchData} />
        <Path
          path={blob.path || ''}
          visitPath={visitPath}
        />
        <Blob blob={blob} />
      </div>
    </div>
  );
};

export default BlobViewer;
