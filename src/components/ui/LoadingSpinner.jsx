import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size = 50, color = "#7091E6" }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;