import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { FiberNode } from '.';

interface SelectModalProps {
  style?: React.CSSProperties;
  filePath?: string;
  protocol?: string;
  onSuccess: () => void;
  list?: FiberNode[];
}
const dialogCss: React.CSSProperties = {
  width: 254,
  position: 'fixed',
  left: '50%',
  top: '0',
  padding: '20px',
  borderRadius: 12,

  flexDirection: 'column',
  justifyContent: 'space-evenly',
  background: '#F6F7FD',
  zIndex: 10000,
  transform: 'translateX(-50%)',
};
const SelectModal = (props: SelectModalProps) => {
  const { style, filePath: path, protocol, onSuccess, list } = props;
  const ref = useRef<HTMLDivElement[]>([]);

  const [filePath, setFilePath] = useState(path);
  const [selectValue, setSelectValue] = useState('vscode');
  const [visible, setVisible] = useState(false);
  const [contextMenuStyle, setContextMenuStyle] = useState<CSSProperties>();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const _protocol = protocol || window.localStorage.getItem('react_find_protocol');
  useEffect(() => {
    setContextMenuVisible(false);
  }, [style]);
  return (
    <>
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 999999 }}>
        {filePath || '暂无定位'}
      </div>
      {contextMenuVisible && (
        <div
          style={{
            borderRadius: 4,
            color: '#fff',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1999999,
            width: 200,
            overflow: 'auto',
            height: 250,
            background: '#000',
            ...contextMenuStyle,
          }}>
          {list?.map((item, index) => {
            return (
              <div
                ref={(_: HTMLDivElement) => {
                  ref.current[index] = _;
                }}
                onClick={() => {
                  if (!item._debugSource) return;
                  if (_protocol) {
                    onSuccess?.();
                    console.log(11);

                    window.open(
                      `${_protocol}://file/${item._debugSource.fileName}:${item._debugSource.lineNumber}`,
                    );
                  } else {
                    setFilePath(`${item._debugSource.fileName}:${item._debugSource.lineNumber}`);
                    setVisible(true);
                  }
                }}
                onMouseLeave={() => {
                  ref.current[index].style.color = '#fff';
                }}
                onMouseEnter={() => {
                  ref.current[index].style.color = '#82CC8F';
                }}
                style={{
                  fontSize: 12,
                  cursor: 'pointer',
                  borderBottom: '1px solid #fff',
                  padding: '4px 12px',
                }}
                key={index}>
                <div style={{ fontSize: 16, color: '#416AE0', fontWeight: 600 }}>
                  {typeof item.type === 'string'
                    ? `<${item.type}/>`
                    : `<${item?.type?.name || item.type?.render?.name}/>`}
                  <span
                    style={{
                      background: '#fff',
                      color: index === 0 ? '#82CC8F' : '#000',
                      fontSize: 10,
                      padding: '0 5px',
                      marginLeft: 4,
                      borderRadius: 12,
                    }}>
                    {index === 0 ? 'current' : 'parent'}
                  </span>
                </div>
                <div
                  title={item?._debugSource?.fileName}
                  style={{
                    wordBreak: 'break-all',
                  }}>
                  <span
                    style={{
                      background: '#2446D3',
                      color: '#fff',
                      padding: '0 4px',
                      borderRadius: 4,
                      marginRight: 8,
                    }}>
                    Source File
                  </span>
                  {item?._debugSource?.fileName}:{item._debugSource.lineNumber}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        onContextMenu={(e) => {
          setContextMenuVisible(true);
          let x = e.clientX,
            y = e.clientY;
          if (e.clientX + 200 > window.innerWidth) {
            x = e.clientX - 200 <= 0 ? 0 : e.clientX - 200;
          }
          if (e.clientY + 250 > window.innerHeight) {
            y = e.clientY - 250 <= 0 ? 0 : e.clientY - 250;
          }

          setContextMenuStyle({
            left: x,
            top: y,
          });
          e.preventDefault();
        }}
        style={{ position: 'fixed', ...style }}
        onClick={() => {
          if (_protocol) {
            onSuccess?.();
            window.open(`${_protocol}://file/${filePath}`);
          } else {
            setVisible(true);
          }
        }}></div>
      {visible && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            zIndex: 1000000,
            background: 'rgba(0,0,0,0.03)',
            boxSizing: 'border-box',
            width: document.documentElement.clientWidth,
            height: '100vh',
            overflow: 'hidden',
          }}>
          <div style={dialogCss}>
            <div style={{ fontWeight: 600 }}>Choose IDE</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                gap: 12,
                fontSize: 18,
                cursor: 'pointer',
              }}>
              <span
                onClick={() => {
                  setSelectValue('vscode');
                }}>
                <input
                  value="vscode"
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                  checked={selectValue === 'vscode'}
                  type="radio"></input>
                <span>Vs code</span>
              </span>
              <span
                onClick={() => {
                  setSelectValue('cursor');
                }}>
                <input value="cursor" checked={selectValue === 'cursor'} type="radio"></input>
                <span>Cursor</span>
              </span>
            </div>
            <button
              onClick={() => {
                window.localStorage.setItem('react_find_protocol', selectValue);
                window.open(`${selectValue}://file/${filePath}`);
                setVisible(false);
                onSuccess?.();
              }}
              style={{
                borderRadius: 12,
                cursor: 'pointer',
                border: 'none',
                marginTop: 20,
                outline: 'none',
                background: '#1285FF',
                display: 'block',
                color: '#fff',
                width: '100%',
                fontSize: 14,
                padding: '4px',
              }}>
              确定
            </button>
            <button
              onClick={() => {
                setVisible(false);
              }}
              style={{
                borderRadius: 12,
                cursor: 'pointer',
                border: 'none',
                marginTop: 10,
                outline: 'none',
                background: '#C0C0C1',
                display: 'block',
                color: '#393939',
                width: '100%',
                fontSize: 14,
                padding: '4px',
              }}>
              取消
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SelectModal;
