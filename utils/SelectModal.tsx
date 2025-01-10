import React from "react"

interface SelectModalProps {
  style?: React.CSSProperties,
  filePath?: string
  protocol?: string
}
const SelectModal = (props: SelectModalProps) => {
  const { style, filePath, protocol } = props
  return <a href={`${filePath ? `${protocol}://file/${filePath}` : ''}`}>
    <div style={{ position: 'fixed',left:0,top:0,zIndex: 9999999 }}>{filePath||'暂无定位'}</div>
    <div style={{ position: 'fixed',...style }}></div>
  </a>
}
export default SelectModal