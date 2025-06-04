import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DramaList = () => {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      {currentUser && (
        <Link to="/dramas/create">
          <button>發起聚會</button>
        </Link>
      )}
      <div>劇會列表</div>
    </>
  );
};

export default DramaList;
