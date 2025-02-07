import type { Plugin } from 'vite';
import { NodePath, transformSync, types } from '@babel/core';
import type { JSXOpeningElement } from '@babel/types';
export default function reactSourcePlugin(): Plugin {
  return {
    enforce: 'pre',
    name: 'vite-plugin-react-source',
    transform(code: string, id: string) {
      if (!id.match(/\.[jt]sx$/)) return null;

      const result = transformSync(code, {
        filename: id,
        presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
        plugins: [
          function sourceAttributePlugin() {
            return {
              name: 'source-attribute',
              visitor: {
                JSXOpeningElement(path: NodePath<JSXOpeningElement>) {
                  const loc = path.node.loc;
                  if (!loc) return;

                  path.node.attributes.push(
                    types.jsxAttribute(
                      types.jsxIdentifier('source-file-path'),
                      types.stringLiteral(`${id}:${loc.start.line}`),
                    ),
                  );
                },
              },
            };
          },
        ],
        ast: true,
        sourceMaps: true,
        configFile: false,
        babelrc: false,
      });

      if (!result?.code) return null;

      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}
