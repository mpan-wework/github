import React from 'react';
import TreeNode from './TreeNode';
import styles from './Container.module.scss';
import useBlobTree from './useBlobTree';

const Container = (props) => {
  const { tree, currentPath, visitPath } = props;

  const [{ blobTree }] = useBlobTree({ blobs: tree.tree });

  return (
    <div className={styles.Container}>
      <TreeNode
        className={styles.current}
        tree={blobTree}
        currentPath={currentPath}
        visitPath={visitPath}
      />
    </div>
  );
};

export default Container;
