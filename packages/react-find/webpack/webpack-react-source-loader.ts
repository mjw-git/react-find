import type { LoaderContext } from 'webpack';
import { transformSync, types } from '@babel/core';
import type { NodePath } from '@babel/core';
import type { JSXOpeningElement } from '@babel/types';
import type { RawSourceMap } from 'source-map';

function transformCode(code: string, id: string) {
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
                  types.stringLiteral(`${id}:${loc.start.line}`)
                )
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
    map: result.map as RawSourceMap | undefined,
  };
}

export default function loader(this: LoaderContext<any>, source: string) {
  const callback = this.async();
  const filename = this.resourcePath;

  try {
    const result = transformCode(source, filename);
    if (!result) {
      callback(null, source);
      return;
    }

    callback(null, result.code, result.map);
  } catch (err) {
    callback(err as Error);
  }
}
