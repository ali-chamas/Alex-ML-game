const GamesFilter = () => {
  return (
    <select className="rounded-lg bg-black/25 border-2 outline-none border-white/40 p-2">
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="Advanced">Adbanced</option>
    </select>
  );
};

export default GamesFilter;
