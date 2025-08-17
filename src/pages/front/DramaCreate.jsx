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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">發起聚會</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              活動名稱
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("title", {
                required: "請輸入活動名稱",
              })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              日期
            </label>
            <input
              type="date"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
              {...register("date", {
                required: "請選擇日期",
              })}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              地點
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              {...register("location", {
                required: "請輸入地點",
              })}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              活動說明
            </label>
            <textarea
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
              {...register("description", {
                required: "請輸入活動說明",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              送出
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => navigate("/list")}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DramaCreate;
