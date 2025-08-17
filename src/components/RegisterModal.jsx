import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const RegisterModal = ({ show, onClose, openLoginModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { displayName, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("密碼不一致");
      return;
    }
    try {
      const userCredient = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredient.user;
      await setDoc(doc(db, "users", user.uid), {
        displayName: String(displayName),
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      reset();
      onClose();
      alert("註冊成功");
    } catch (error) {
      alert(error.message);
      console.log("註冊失敗", error.message);
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">註冊頁面</h5>
          <div className="flex items-center gap-4">
            <p
              className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
              onClick={() => {
                onClose();
                openLoginModal();
              }}
            >
              已有帳號?點此登入..
            </p>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              姓名
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("displayName", { required: "請輸入暱稱" })}
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("email", { required: "請輸入 email" })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              密碼
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", {
                required: "請輸入密碼",
                minLength: {
                  value: 6,
                  message: "密碼長度至少6個字",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              確認密碼
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("confirmPassword", { required: "請輸入確認密碼" })}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              送出
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              關閉
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default RegisterModal;
