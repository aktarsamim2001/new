
import dynamic from "next/dynamic";
const SwiperClient = dynamic(() => import("./SwiperClient"), { ssr: false });


const SmartHealthBanner = ({ dataItem }) => {
  return <SwiperClient dataItem={dataItem} />;
};

export default SmartHealthBanner;
