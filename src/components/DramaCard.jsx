import dayjs from "dayjs";
import { Link } from "react-router-dom";
const DramaCard = ({ drama }) => {
  const { title, date, location, description, createdByName, id } = drama;
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <img src="..." className="w-full h-48 object-cover" alt="..." />
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-gray-600 mb-2">地點: {location}</p>
        <p className="text-sm text-gray-500 mb-2">
          活動時間：{dayjs(date.toDate()).format("YYYY/MM/DD HH:mm")}
        </p>
        <p className="text-sm text-gray-500 mb-4">主辦人：{createdByName}</p>
        <Link
          to={`/dramas/${id}`}
          className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200"
        >
          查看詳細
        </Link>
      </div>
    </div>
  );
};

export default DramaCard;
