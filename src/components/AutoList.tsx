import { useAutoStore } from "../store/AutoStore";

type Props = {
  onSelect: (dongName: string) => void;
};

const AutoList = ({ onSelect }: Props) => {
  const { suggestions, clear } = useAutoStore();

  if (!suggestions.length) return null;

  return (
    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
      {suggestions.map((item, idx) => (
        <li
          key={idx}
          onClick={() => {
            onSelect(item); // 선택 시 상위에서 전달받은 함수 호출
            clear(); // 리스트 닫기
          }}
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AutoList;
