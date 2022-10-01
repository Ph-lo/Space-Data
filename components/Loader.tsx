import Lottie from "react-lottie-player";
import loadingAnimation from "../assets/98288-loading.json";

const Loader = () => {
  return (
    <div className="container w-full flex justify-center py-24">
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 220, height: 220 }}
      />
    </div>
  );
};

export default Loader;
