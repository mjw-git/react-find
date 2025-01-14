import React, { useState } from 'react';

interface SelectModalProps {
  style?: React.CSSProperties;
  filePath?: string;
  protocol?: string;
  onSuccess: () => void;
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
  background: '#D8d8d8',
  zIndex: 10000,
  transform: 'translateX(-50%)',
};
const SelectModal = (props: SelectModalProps) => {
  const { style, filePath, protocol, onSuccess } = props;
  const [selectValue, setSelectValue] = useState('vscode');
  const [visible, setVisible] = useState(false);
  const _protocol = protocol || window.localStorage.getItem('react_find_protocol');

  return (
    <>
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 9999 }}>
        {filePath || '暂无定位'}
      </div>
      <div
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
            zIndex: 10001,
            background: 'rgba(0,0,0,0.03)',
            boxSizing: 'border-box',
            width: document.documentElement.clientWidth,
            height: '100vh',
            overflow: 'hidden',
          }}>
          <div style={dialogCss}>
            <div style={{ fontWeight: 600 }}>选择打开的IDE</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 5, fontSize: 18 }}>
              <input
                value="vscode"
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}
                checked={selectValue === 'vscode'}
                type="radio"></input>
              <span>vscode</span>
              <input
                value="cursor"
                checked={selectValue === 'cursor'}
                onChange={(e) => {
                  setSelectValue(e.target.value);
                }}
                type="radio"></input>
              <span>cursor</span>
            </div>
            <button
              onClick={() => {
                window.localStorage.setItem('react_find_protocol', selectValue);
                window.open(`${selectValue}://file/${filePath}`);
                setVisible(false);
                onSuccess?.();
              }}
              style={{
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
