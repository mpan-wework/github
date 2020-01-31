import React, { useCallback } from 'react';
import Blob from '../components/BlobViewer/Blob/Blob';
import NavBar from '../components/BlobViewer/NavBar/Container';
import Path from '../components/BlobViewer/Path/Path';
import SideBar from '../components/BlobViewer/SideBar/SideBar';
import githubClient from '../service/api/github';
import styles from './BlobViewer.module.scss';

const BlobViewer = () => {
  const fetchData = useCallback(
    async () => {
      const orgs = githubClient.orgs();
      console.info(JSON.stringify(orgs));
    },
    [],
  )
  return (
    <div className={styles.BlobViewer}>
      <div className={styles.sidebarWrapper}>
        <SideBar />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar fetchData={fetchData} />
        <Path />
        <Blob />
      </div>
    </div>
  );
};

export default BlobViewer;
