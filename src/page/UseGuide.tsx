import Header from "../components/Header";

const UseGuide = () => {
  return (
    <div>
      <Header />
      <div className="p-5 flex flex-col items-center justify-center">
        <span className="p-7 text-[#2e58e4] text-4xl font-bold">
          파동 <span className="text-[#333333]">이용가이드</span>
        </span>

        <img className="h-600" src="/images/guide.png" alt="파동 이용 가이드" />
      </div>
    </div>
  );
};

export default UseGuide;
