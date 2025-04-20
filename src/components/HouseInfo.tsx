import rec from "../../public/images/rec.png";
type HouseInfoProps = {
  image: string;
  locate: string;
  score: number;
  distance: string;
  comuteTime: string;
};
const HouseInfo = ({
  image,
  locate,
  score,
  distance,
  comuteTime,
}: HouseInfoProps) => {
  return (
    <div className="HouseInfo flex rounded-xl bg-white">
      <img src={rec} alt="HouseImage" className="w-60 h-50 pr-2 object-cover" />
      <div className="grid grid-flow-col grid-rows-4">
        <p className="font-bold text-lg text-[#3B3B3B]">OO구 00동</p>
        <div className="flex inline-flex items-center justify-center space-x-4">
          <h2 className="text-lg text-[#3B3B3B]">파동점수</h2>
          <div className="text-[#3B3B3B] text-[10px] px-2 py-1 bg-[#2e58e4] rounded-lg text-[#FFFFFF]">
            파동점수
          </div>
        </div>
        <div className="flex inline-flex items-center space-x-4">
          <h2 className="text-sm text-[#3B3B3B]">출퇴근 거리</h2>
          <div className="text-[#585858] text-xs">
            <span>0.7777km</span>
          </div>
        </div>
        <div className="flex inline-flex items-center space-x-4">
          <h2 className="text-sm text-[#3B3B3B]">출퇴근 시간</h2>
          <div className="text-[#585858] text-xs">
            <span>55 시간</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseInfo;
