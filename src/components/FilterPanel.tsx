import { useFilterStore } from "../store/filterStore";

const FilterPanel = () => {
  const { deposit, monthly, sale, setDeposit, setMonthly, setSale } =
    useFilterStore();

  return (
    <div className="p-4 shadow rounded bg-white space-y-4">
      <div>
        <label>보증금(전세금)</label>
        <input
          type="range"
          min={0}
          max={50000}
          value={deposit[1]}
          onChange={(e) => setDeposit([0, Number(e.target.value)])}
        />
        <span>{deposit[1]}만원</span>
      </div>

      <div>
        <label>월세</label>
        <input
          type="range"
          min={0}
          max={500}
          value={monthly[1]}
          onChange={(e) => setMonthly([0, Number(e.target.value)])}
        />
        <span>{monthly[1]}만원</span>
      </div>

      <div>
        <label>매매</label>
        <input
          type="range"
          min={0}
          max={100000}
          value={sale[1]}
          onChange={(e) => setSale([0, Number(e.target.value)])}
        />
        <span>{sale[1]}만원</span>
      </div>
    </div>
  );
};

export default FilterPanel;
