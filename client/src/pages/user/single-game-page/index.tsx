import { useParams } from "react-router-dom";

const SingleGame = () => {
  const { gameId } = useParams();
  console.log(gameId);

  return <div>index</div>;
};

export default SingleGame;
