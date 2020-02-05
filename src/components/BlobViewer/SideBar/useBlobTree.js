import { useMemo } from 'react';

const useBlobTree = (props) => {
  const { blobs } = props;

  const blobTree = useMemo(() => {
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
        parentPath = '/';
      } else {
        parentPath = blob.path.slice(0, pos);
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
  }, [blobs]);

  return [{ blobTree }];
};

export default useBlobTree;
