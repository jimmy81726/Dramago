import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/firebase";
import Modal from "./Modal";

const LoginModal = ({ show, onClose, openRegisterModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("登入成功", userCredential.user);
      reset();
      onClose();
    } catch (error) {
      console.log("登入失敗", error);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="modal-content p-4 rounded shadow">
        <div className="modal-header border-bottom-0">
          <h5 className="modal-title">登入頁面</h5>
          <p
            className="text-primary text-decoration-underline"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
              openRegisterModal();
            }}
          >
            尚未註冊?
          </p>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
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
              {...register("password", { required: "請輸入密碼" })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
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

export default LoginModal;
