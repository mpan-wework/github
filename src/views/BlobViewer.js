import React, { useCallback, useState } from 'react';
import Blob from '../components/BlobViewer/Blob/Container';
import NavBar from '../components/BlobViewer/NavBar/Container';
import Path from '../components/BlobViewer/Path/Container';
import SideBar from '../components/BlobViewer/SideBar/Container';
import githubClient from '../service/api/github';
import styles from './BlobViewer.module.scss';

const BlobViewer = () => {
  const [owner] = useState('mpan-wework');
  const [repo] = useState('github');
  const [branch] = useState('master');
  const [blobs, setBlobs] = useState([]);
  const [path] = useState('src/components/BlobViewer/Blob/Blob.js');
  const [blob, setBlob] = useState({});

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

  const fetchBlob = useCallback(
    async (blobUrl) => {
      const data = await githubClient.blob(blobUrl);
      setBlob(data);
    },
    [],
  )

  return (
    <div className={styles.BlobViewer}>
      <div className={styles.sidebarWrapper}>
        <SideBar
          blobs={blobs}
          fetchBlob={fetchBlob}
          path={path}
        />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar fetchData={fetchData} />
        <Path path={path} />
        <Blob blob={blob} />
      </div>
    </div>
  );
};

export default BlobViewer;
