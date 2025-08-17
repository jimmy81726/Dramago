import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import FullPageSpinner from "../../components/FullPageSpinner";
import dayjs from "dayjs";

const DramaDetail = () => {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrama = async () => {
      try {
        const docRef = doc(db, "dramas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDrama({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("找不到活動");
        }
      } catch (error) {
        console.error("讀取失敗", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrama();
  }, [id]);
  if (loading) return <FullPageSpinner />;
  if (!drama) return <p>找不到活動資料。</p>;

  const {
    title,
    description,
    location,
    date,
    createdByName,
    participants,
    status,
  } = drama;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="space-y-4">
          <p className="flex items-center">
            <span className="font-semibold w-24">狀態：</span>
            <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {status}
            </span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-24">活動時間：</span>
            <span>{dayjs(date).format("YYYY-MM-DD HH:mm")}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-24">地點：</span>
            <span>{location}</span>
          </p>
          <p className="flex items-start">
            <span className="font-semibold w-24">介紹：</span>
            <span className="flex-1">{description}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-24">發起人：</span>
            <span>{createdByName}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold w-24">參與人數：</span>
            <span>{participants?.length ?? 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DramaDetail;
