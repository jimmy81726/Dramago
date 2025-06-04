import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import FullPageSpinner from "../../components/FullPageSpinner";

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
    <div className="container py-4">
      <h2 className="mb-3">{title}</h2>
      <p>
        <strong>狀態：</strong> {status}
      </p>
      <p>
        <strong>活動時間：</strong> {new Date(date).toLocaleString("zh-TW")}
      </p>
      <p>
        <strong>地點：</strong> {location}
      </p>
      <p>
        <strong>介紹：</strong> {description}
      </p>
      <p>
        <strong>發起人：</strong> {createdByName}
      </p>
      <p>
        <strong>參與人數：</strong> {participants?.length ?? 0}
      </p>
    </div>
  );
};

export default DramaDetail;
