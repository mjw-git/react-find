const Test = (props: { aa: string; fn: () => void }) => {
  const { aa, fn } = props;
  return (
    <div
      onClick={() => {
        fn?.();
      }}>
      {aa}
      <div>gggggg</div>
    </div>
  );
};
export default Test;
