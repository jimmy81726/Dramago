import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import FullPageSpinner from "../../components/FullPageSpinner";
import DramaCard from "../../components/DramaCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";

const DramaList = () => {
  const [dramas, setDramas] = useState([]);
  const [isLoadingDramas, setIsLoadingDramas] = useState(true);
  const { currentUser, isLoading } = useAuth();

  const fetchDramas = async () => {
    try {
      const q = await getDocs(collection(db, "dramas"));
      const dramasList = q.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDramas(dramasList);
    } catch (error) {
      console.error("獲取活動列表失敗：", error);
    } finally {
      setIsLoadingDramas(false);
    }
  };

  useEffect(() => {
    fetchDramas();
  }, []);

  if (isLoading || isLoadingDramas) {
    return <FullPageSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">劇會列表</h1>
        {currentUser && (
          <Link to="/dramas/create">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              發起聚會
            </button>
          </Link>
        )}
      </div>

      {dramas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">目前還沒有任何活動</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dramas.map((drama) => (
            <DramaCard key={drama.id} drama={drama} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DramaList;
