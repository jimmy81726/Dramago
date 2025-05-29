import { useForm } from "react-hook-form";

const DramaCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">發起聚會</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">活動名稱</label>
            <input
              type="text"
              className="form-control"
              {...register("title", { required: "請輸入活動名稱" })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">日期</label>
            <input type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">地點</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">活動說明</label>
            <textarea className="form-control" rows="4" />
          </div>

          <button type="submit" className="btn btn-primary">
            送出
          </button>
        </form>
      </div>
    </div>
  );
};

export default DramaCreate;
