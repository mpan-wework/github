import React, { useCallback } from 'react';
import Blob from './Blob';
import NavBar from './NavBar/Container';
import Path from './Path';
import SideBar from './SideBar';
import githubClient from '../service/api/github';
import styles from './Github.module.scss';

const Github = () => {
  const fetchData = useCallback(
    async () => {
      const orgs = githubClient.orgs();
      console.info(JSON.stringify(orgs));
    },
    [],
  )
  return (
    <div className={styles.Github}>
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

export default Github;
