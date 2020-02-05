import React, { useCallback, useMemo } from 'react';
import styles from './TreeNode.module.scss';

const TreeNode = (props) => {
  const { tree, currentPath, visitPath, className } = props;

  const onBlobClick = useCallback(() => visitPath(tree.path), [
    tree,
    visitPath,
  ]);

  const isCurrent = useMemo(() => currentPath.indexOf(tree.path) === -1, [
    currentPath,
    tree,
  ]);

  return (
    <>
      <div
        className={[
          className,
          styles.TreeNode,
          isCurrent ? '' : styles.current,
        ].join(' ')}
        onClick={onBlobClick}
        style={{ paddingLeft: `${tree.depth}rem` }}
      >
        {tree.name}
      </div>
      {tree.subs.map((sub) => (
        <TreeNode
          key={sub.path}
          tree={sub}
          currentPath={currentPath}
          visitPath={visitPath}
        />
      ))}
    </>
  );
};

export default TreeNode;
