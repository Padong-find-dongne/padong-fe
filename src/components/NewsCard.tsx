import rec from "../../public/images/rec.png";
type NewsCardProps = {
  image: string;
  title: string;
  summary: string;
};

function NewsCard({ image, title, summary }: NewsCardProps) {
  return (
    <div className="w-[200px] rounded-xl overflow-hidden bg-white">
      <img src={rec} alt="임시" className="w-full h-[180px] object-cover" />
      <div className="p-4">
        <h2 className="text-lg text-3B3B3B font-semibold mb-2">뉴스 제목</h2>
        <p className="text-sm text-3B3B3B">요약요양ㄱ요약</p>
      </div>
    </div>
  );
}

export default NewsCard;
