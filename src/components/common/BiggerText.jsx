import { responsiveText } from "../../styles/responsiveText";

const BiggerText = ({ text }) => {
  return (
    <div className="flex bigger-text flex-col items-center justify-center primary-text">
      <span className={responsiveText}>{text}</span>
    </div>
  );
};

export default BiggerText;
