import React from 'react';
import Blob from './Blob';
import NavBar from './NavBar';
import Path from './Path';
import SideBar from './SideBar';
import styles from './Github.module.scss';

const Github = () => {
  return (
    <div className={styles.Github}>
      <div className={styles.sidebarWrapper}>
        <SideBar />
      </div>
      <div className={styles.contentWrapper}>
        <NavBar />
        <Path />
        <Blob />
      </div>
    </div>
  );
};

export default Github;
