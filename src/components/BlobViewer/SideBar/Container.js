import React from 'react';
import TreeNode from './TreeNode';
import styles from './Container.module.scss';
import useBlobTree from './useBlobTree';

const SideBar = (props) => {
  const { tree, blob, visitPath } = props;

  const [{ blobTree }] = useBlobTree({
    blobs: tree ? tree.tree : [],
  });

  return (
    <div className={styles.Container}>
      <TreeNode
        className={styles.current}
        tree={blobTree}
        currentPath={blob ? blob.path : '/'}
        visitPath={visitPath}
      />
    </div>
  );
};

export default SideBar;
