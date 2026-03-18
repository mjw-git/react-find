/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import { initFinder, type FinderParams } from '../createFinder';
import { type NodeItem } from '../SelectModal';

export type ParamsProps = FinderParams;

const findNodeAttrFilePath = (node: Element): string | undefined => {
  return node.getAttribute('source-file-path') || undefined;
};

const getPathKey = (path: string) => {
  return path.replace(/:\d+$/, '');
};

const init = (params?: ParamsProps) => {
  initFinder(params, (node, { rootDom }) => {
    const list: NodeItem[] = [];
    let currentNode: Element | null = node;
    const pathMap = new Map<string, boolean>();

    while (currentNode?.parentElement && !rootDom.contains(currentNode) && rootDom !== currentNode) {
      const path = findNodeAttrFilePath(currentNode);
      const pathKey = path ? getPathKey(path) : undefined;

      if (path && pathKey && !pathMap.has(pathKey)) {
        pathMap.set(pathKey, true);
        list.push({ 'source-file-path': path, tagName: currentNode.tagName });
      }
      currentNode = currentNode.parentElement;
    }

    if (!list.length || !currentNode || currentNode === rootDom || rootDom.contains(currentNode)) {
      return null;
    }

    return {
      list,
      filePath: list[0]['source-file-path'],
      currentNode: node,
    };
  });
};

export default init;
