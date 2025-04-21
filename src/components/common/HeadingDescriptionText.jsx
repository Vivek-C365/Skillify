export  function HeadingDescription({ children, contentPosition , className }) {
  return (
    <h3
      className={`  text-3xl mx-auto   ${
        contentPosition === "center" ? "text-center" : "text-"
      } max-w-[40rem] mb-5 ${className}`}
    >
      {children}
    </h3>
  );
}

export  function HeadingDescriptionText({ children, textCase }) {
  return (
    <h3
      className={`text-gray-500 mx-auto text-center max-w-[530px] ${
        textCase == "upper" ? "uppercase" : "normal-case"
      } mb-6`}
    >
      {children}
    </h3>
  );
}
