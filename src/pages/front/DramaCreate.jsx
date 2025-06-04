import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DramaCreate = () => {
  const navigate = useNavigate();
  const { currentUser, userData, isLoading } = useAuth();

  console.log(userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 檢查用戶是否登入
      if (!isLoading && !currentUser) {
        alert("請先登入");
        return;
      }

      // 準備要儲存的資料
      const dramaData = {
        title: data.title,
        date: new Date(data.date), // 轉換為 Date 物件
        location: data.location,
        description: data.description,
        createdAt: serverTimestamp(), // 使用伺服器時間戳
        updatedAt: serverTimestamp(), // 使用伺服器時間戳
        createdBy: currentUser.uid, // 儲存建立者 ID
        createdByName: userData.displayName, // 儲存建立者名稱
        status: "active", // 預設狀態
        participants: [{ uid: currentUser.uid, name: userData.displayName }], // 建立者自動加入參與者列表
      };

      // 儲存到 Firestore
      const docRef = await addDoc(collection(db, "dramas"), dramaData);

      // 成功提示
      alert("活動建立成功！");

      // 導到詳情頁
      navigate(`/dramas/${docRef.id}`);
    } catch (error) {
      console.error("建立活動失敗：", error);
      alert("建立活動失敗，請稍後再試");
    }
  };
  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">發起聚會</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">活動名稱</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", {
                required: "請輸入活動名稱",
              })}
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">日期</label>
            <input
              type="date"
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              {...register("date", {
                required: "請選擇日期",
              })}
            />
            {errors.date && (
              <p className="text-danger">{errors.date.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">地點</label>
            <input
              type="text"
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              {...register("location", {
                required: "請輸入地點",
              })}
            />
            {errors.location && (
              <p className="text-danger">{errors.location.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">活動說明</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              rows="4"
              {...register("description", {
                required: "請輸入活動說明",
              })}
            />
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            送出
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/list")}
          >
            取消
          </button>
        </form>
      </div>
    </div>
  );
};

export default DramaCreate;
