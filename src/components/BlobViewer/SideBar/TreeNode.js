import React, { useCallback, useMemo } from 'react';
import styles from './TreeNode.module.scss';

const TreeNode = (props) => {
  const { tree, blob, visitPath } = props;

  const onBlobClick = useCallback(
    () => visitPath(tree.path),
    [tree, visitPath],
  );

  const isCurrent = useMemo(
    () => blob.path.indexOf(tree.path) === -1,
    [blob, tree],
  );

  return (
    <>
      <div
        className={[
          styles.TreeNode,
          isCurrent ? '':  styles.current,
        ].join(' ')}
        onClick={onBlobClick}
        style={{paddingLeft: `${0.5 * tree.depth}rem`}}
      >
        {tree.name}
      </div>
      {tree.subs.map((sub) => (
        <TreeNode
          key={sub.path}
          tree={sub}
          blob={blob}
          visitPath={visitPath}
        />
      ))}
    </>
  )
}

export default TreeNode;
