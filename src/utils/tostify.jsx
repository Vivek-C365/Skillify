import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const design = {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const handleSuccess = (msg) => {
  toast.success(msg, design);
};

export const handleError = (msg) => {
  toast.error(msg, design);
};

export const handleWarning = (msg) => {
  toast.warn(msg, design);
};
