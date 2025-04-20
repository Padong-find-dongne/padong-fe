import rec from "../../public/images/rec.png";
type NewsCardProps = {
  newsImage: string;
  newsTitle: string;
  newsSummary: string;
};

function NewsCard({ newsImage, newsTitle, newsSummary }: NewsCardProps) {
  return (
    <div className="w-[200px] rounded-xl overflow-hidden bg-white">
      <img src={rec} alt="임시" className="w-full h-[180px] object-cover" />
      <div className="p-4">
        <h2 className="text-lg text-3B3B3B font-semibold mb-2">뉴스 제목</h2>
        <p className="text-sm text-3B3B3B">요약요약요약</p>
      </div>
    </div>
  );
}

export default NewsCard;
