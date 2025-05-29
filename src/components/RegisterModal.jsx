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
      <div className="modal-content p-4 rounded shadow">
        <div className="modal-header border-bottom-0">
          <h5 className="modal-title">註冊頁面</h5>
          <p
            className="text-primary"
            onClick={() => {
              onClose();
              openLoginModal();
            }}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            已有帳號?點此登入..
          </p>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
          <div className="mb-3">
            <label htmlFor="displayName">姓名</label>
            <input
              type="text"
              id="displayName"
              className="form-control"
              {...register("displayName", { required: "請輸入暱稱" })}
            />
            {errors.displayName && (
              <p className="text-danger">{errors.displayName.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", { required: "請輸入 email" })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "請輸入密碼",
                minLength: {
                  value: 6,
                  message: "密碼長度至少6個字",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">確認密碼</label>
            <input
              type="password"
              className="form-control"
              {...register("confirmPassword", { required: "請輸入確認密碼" })}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              送出
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
