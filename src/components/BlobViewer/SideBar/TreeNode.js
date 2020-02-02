import React, { useCallback } from 'react';
import styles from './TreeNode.module.scss';

const TreeNode = (props) => {
  const { tree, visitPath } = props;

  const onBlobClick = useCallback(
    () => {
      visitPath(tree.path);
    },
    [tree, visitPath],
  );

  return (
    <>
      <div
        className={styles.TreeNode}
        onClick={onBlobClick}
        style={{paddingLeft: `${0.5 * tree.depth}rem`}}
      >
        {tree.name}
      </div>
      {tree.subs.map((sub) => (
        <TreeNode
          key={sub.path}
          tree={sub}
          visitPath={visitPath}
        />
      ))}
    </>
  )
}

export default TreeNode;
