export  function HeadingDescription({ children, contentPosition }) {
  return (
    <h3
      className={`text-black text-3xl mx-auto text-center  ${
        contentPosition === "center" ? "text-center" : "text-"
      } max-w-[40rem] mb-5`}
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
