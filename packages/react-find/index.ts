/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import { initFinder, type FinderParams } from './createFinder';
import { type NodeItem } from './SelectModal';

export type ParamsProps = FinderParams;

export interface FiberNode {
  type: string | { name?: string; render?: { name?: string } };
  _debugOwner?: FiberNode;
  _debugSource?: {
    columnNumber: number;
    lineNumber: number;
    fileName: string;
  };
}

const findReactFiberAttr = (node: Element): FiberNode | undefined => {
  const fiberContainer = node as unknown as Record<string, unknown>;

  for (const prop in fiberContainer) {
    if (prop.startsWith('__reactFiber')) {
      return fiberContainer[prop] as FiberNode;
    }
  }
};

const toNodeItem = (node: FiberNode): NodeItem | null => {
  if (!node._debugSource) return null;

  return {
    'source-file-path': `${node._debugSource.fileName}:${node._debugSource.lineNumber}`,
    tagName:
      typeof node.type === 'string' ? `${node.type}` : `${node.type?.name || node.type?.render?.name}`,
  };
};

const init = (params?: ParamsProps) => {
  initFinder(params, (node, { body, rootDom }) => {
    const fibers: FiberNode[] = [];
    let currentNode: Element | null = node;
    let currentFiber = findReactFiberAttr(currentNode);

    while (
      !currentFiber &&
      currentNode &&
      currentNode.parentElement !== body &&
      currentNode !== body &&
      !rootDom.contains(currentNode) &&
      rootDom !== currentNode
    ) {
      currentNode = currentNode.parentElement;
      if (currentNode) {
        currentFiber = findReactFiberAttr(currentNode);
      }
    }

    if (!currentFiber || !currentNode || currentNode === rootDom || rootDom.contains(currentNode)) {
      return null;
    }

    fibers.push(currentFiber);
    while (currentFiber._debugOwner) {
      fibers.push(currentFiber._debugOwner);
      currentFiber = currentFiber._debugOwner;
    }

    (window as any).react_find_attr_list = fibers;
    const list = fibers.map(toNodeItem).filter((item): item is NodeItem => item !== null);
    const filePath = list[0]?.['source-file-path'];
    if (!filePath) return null;

    return {
      list,
      filePath,
      currentNode: node,
    };
  });
};

export default init;
