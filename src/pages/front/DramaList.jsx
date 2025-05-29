import { Link } from "react-router-dom";

const DramaList = () => {
  return (
    <>
      <Link to="/dramas/create">發起聚會</Link>
      <div>劇會列表</div>
    </>
  );
};

export default DramaList;
