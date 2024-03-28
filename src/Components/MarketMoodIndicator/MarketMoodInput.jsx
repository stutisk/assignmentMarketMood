export const MarketMoodInput = ({ score, setScore }) => {
  return (
    <div className="input-score ">
      <label  className="font_size1">Score Value(Change to update widget): </label>
      <input
        type="number"
       
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
      />
    </div>
  );
};
