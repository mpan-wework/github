import React, { useMemo } from 'react';
import TreeNode from './TreeNode';
import styles from './Container.module.scss';

const Container = (props) => {
  const { blobs, visitPath } = props;

  const tree = useMemo(
    () => {
      const root = {
        path: '/',
        name: '/',
        subs: [],
        depth: 0,
      };
      const dirs = [root];
      blobs.forEach((blob) => {
        let parentPath = null;
        const pos = blob.path.lastIndexOf('/');
        if (pos === -1) {
          parentPath = '';
        } else {
          parentPath = blob.path.slice(0, pos)
        }
        const parent = dirs.find((dir) => dir.path === parentPath);

        const treeNode = {
          ...blob,
          name: blob.path.replace(/^.+\//, ''),
          subs: [],
          depth: parent.depth + 1,
        };
        parent.subs.push(treeNode);
        if (blob.type === 'tree') {
          dirs.push(treeNode);
        }
      });
      return root;
    },
    [blobs],
  );

  return (
    <div className={styles.Container}>
      <TreeNode tree={tree} visitPath={visitPath} />
    </div>
  );
};

export default Container;
