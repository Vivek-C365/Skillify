const loaderStyles = {
  width: "9rem",
  aspectRatio: "1",
  display: "grid",
  border: "4px solid transparent",
  borderRadius: "50%",
  borderColor: "#ccc transparent",
  animation: "spin 1s infinite linear",
  position: "relative",
};

const beforeAfterStyles = {
  content: '""',
  gridArea: "1 / 1",
  margin: "2px",
  border: "4px solid transparent",
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const beforeStyle = {
  ...beforeAfterStyles,
  borderColor: "#f03355 transparent",
  animation: "spin 0.5s infinite reverse linear",
};

const afterStyle = {
  ...beforeAfterStyles,
  margin: "8px",
};

const Loading = () => {
  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div>
        <div style={loaderStyles}>
          <div style={beforeStyle}></div>
          <div style={afterStyle}></div>
        </div>

        <style>
          {`
            @keyframes spin {
                100% { transform: rotate(1turn); }
                }
                `}
        </style>
      </div>
    </div>
  );
};

export default Loading;
