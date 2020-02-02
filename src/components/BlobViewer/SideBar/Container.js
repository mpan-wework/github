import React from 'react';
import TreeNode from './TreeNode';
import styles from './Container.module.scss';
import useBlobTree from './useBlobTree';

const Container = (props) => {
  const { blobs, blob, visitPath } = props;

  const [{ blobTree }] = useBlobTree({ blobs });

  return (
    <div className={styles.Container}>
      <TreeNode
        tree={blobTree}
        blob={blob}
        visitPath={visitPath}
      />
    </div>
  );
};

export default Container;
