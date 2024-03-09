import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Details() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    id: null,
    title: "",
    desc: "",
    type: ""
  });
  const [statusTypes, setStatusTypes] = useState([]);

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("lists"));
    if (savedLists) {
      const newDetail = savedLists[type].find((item) => item.id === parseInt(id));
      if (!newDetail) {
        navigate("/notFound");
        return;
      }
      setDetail(newDetail);
      
      const savedStatusTypes = Object.keys(savedLists);
      setStatusTypes(savedStatusTypes);
    }
  }, [id, type, navigate]);

  const handleChange = (key, value) => {
    setDetail({ ...detail, [key]: value });
  };

  const handleDelete = () => {
    const savedLists = JSON.parse(localStorage.getItem("lists"));
    savedLists[type] = savedLists[type].filter((item) => item.id !== parseInt(id));
    localStorage.setItem("lists", JSON.stringify(savedLists));
    navigate("/");
  };

  const handleSave = () => {
    const savedLists = JSON.parse(localStorage.getItem("lists"));
    savedLists[type] = savedLists[type].filter((item) => item.id !== parseInt(id));
    savedLists[detail.type].push(detail);
    localStorage.setItem("lists", JSON.stringify(savedLists));
    navigate("/");
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4 text-center pt-2 text-blue-800">Details Page</h1>
      <div className="w-full flex justify-center items-center">
        <div className="w-full md:w-[70vw] flex flex-col">
          <div className="w-full flex items-center justify-between mb-4">
            <select
              name="type"
              value={detail.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
            >
              {statusTypes.map((statusType) => (
                <option key={statusType} value={statusType}>
                  {statusType.charAt(0).toUpperCase() + statusType.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="title" className="font-semibold pb-2">Title</label>
          <input
            type="text"
            id="title"
            value={detail.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded mb-4"
          />
          <label htmlFor="description" className=" font-semibold pb-2">Description</label>
          <textarea
            id="description"
            rows={5}
            value={detail.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            className="border ring ring-gray-300 ring-offset-2 px-2 py-1 rounded"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row py-12 justify-center items-center space-y-5 md:space-y-0 md:space-x-5">
        <button onClick={()=>{navigate("/")}} className="border px-4 py-1 rounded bg-green-500 text-white ring ring-green-600 ring-offset-2">Home</button>
        <button onClick={handleSave} className="border px-4 py-1 rounded bg-blue-500 text-white ring ring-blue-600 ring-offset-2">Save</button>
        <button onClick={handleDelete} className="border px-4 py-1 rounded bg-red-500 text-white ring ring-red-600 ring-offset-2">Delete</button>
      </div>
    </div>
  );
}
