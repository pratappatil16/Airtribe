import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [lists, setLists] = useState({
    notStarted: [],
    started: [],
    completed: []
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("notStarted");
  const [modalDesc, setModalDesc] = useState("");

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("lists"));
    if (savedLists) {
      setLists(savedLists);
    } else {
      const initialLists = {
        notStarted: [],
        started: [],
        completed: []
      };
      localStorage.setItem("lists", JSON.stringify(initialLists));
      localStorage.setItem("count", 1);
      setLists(initialLists);
    }

    const savedCount = parseInt(localStorage.getItem("count"));
    if (!isNaN(savedCount)) {
      setCount(savedCount);
    }
  }, []);

//   useEffect(() => {
//     if (draggedItem) {
//       const { id, type } = draggedItem;
//       const updatedList = lists[type].filter((item) => item.id !== id);
//       setLists((prevLists) => ({
//         ...prevLists,
//         [draggedItem.type]: updatedList,
//         [type]: [...prevLists[type], draggedItem]
//       }));
//       setDraggedItem(null);
//       localStorage.setItem("lists", JSON.stringify({ ...lists, [type]: updatedList, [draggedItem.type]: [...lists[draggedItem.type], draggedItem] }));
//     }
//   }, [draggedItem, lists]);
const handleDrop = (type) => {
    if (draggedItem) {
      const updatedList = lists[draggedItem.type].filter((item) => item.id !== draggedItem.id);
      setLists(prevLists => ({
        ...prevLists,
        [draggedItem.type]: updatedList,
        [type]: [...prevLists[type], { title: draggedItem.title, id: draggedItem.id, desc: draggedItem.desc, type }]
      }));
      setDraggedItem(null);
  
      localStorage.setItem("lists", JSON.stringify({ ...lists, [draggedItem.type]: updatedList, [type]: [...lists[type], draggedItem] }));
    }
  };

  const handleDragStart = (e, id, type, title, desc) => {
    setDraggedItem({ id, type, title, desc });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addItem = () => {
    if (modalTitle.trim() !== "") {
      const newItem = { title: modalTitle, id: count, desc: modalDesc, type: modalType };
      setLists((prevLists) => ({
        ...prevLists,
        [modalType]: [...prevLists[modalType], newItem]
      }));
      setCount((prevCount) => prevCount + 1);
      resetModal();
      setIsModalOpen(false);
      localStorage.setItem("lists", JSON.stringify({ ...lists, [modalType]: [...lists[modalType], newItem] }));
      localStorage.setItem("count", count + 1);
    }
  };

  const deleteItem = (id, type) => {
    const updatedList = lists[type].filter((item) => item.id !== id);
    setLists((prevLists) => ({
      ...prevLists,
      [type]: updatedList
    }));
    localStorage.setItem("lists", JSON.stringify({ ...lists, [type]: updatedList }));
  };

  const resetModal = () => {
    setModalTitle("");
    setModalType("notStarted");
    setModalDesc("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetModal();
  };

  return (
    <div className="flex w-screen h-screen bg-gray-200">
      {Object.entries(lists).map(([type, list]) => (
        <div key={type} className="w-1/3 h-screen border p-4">
          <h1 className="text-xl font-semibold mb-4 capitalize "><span className=" bg-cyan-500 mr-4 p-1">{type}</span> {list?.length}</h1>
          <ul
            className="w-full flex flex-col min-h-[50px] bg-white rounded shadow-md"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(type)}
          >
            {list.map((ele) => (
              <li
                key={ele.id}
                className="w-full rounded border p-2 mb-2 cursor-move hover:bg-gray-100 relative"
                draggable
                onDragStart={(e) => handleDragStart(e, ele.id, ele.type, ele.title, ele.desc)}
                onClick={() => navigate(`/${ele.id}/${ele.type}`)}
              >
                {ele.title}
                <button
                  className="absolute right-2 top-3 text-red-700 "
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(ele.id, ele.type);
                  }}
                >



                 
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
             
             



                </button>
              </li>
            ))}
          </ul>
          <button
            className="p-2 mt-4 text-gray-600 w-auto"
            onClick={() => {
              setIsModalOpen(true);
              setModalType(type);
            }}
          >
            <span className="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
              </svg>
              <span className="pl-3">new</span>
            </span>
          </button>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="w-1/3 bg-white p-4 rounded border flex flex-col relative">
            <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
              X
            </button>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
              className="border mb-2 px-2 py-1 rounded"
            />
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={modalType}
              onChange={(e) => setModalType(e.target.value)}
              className="border mb-2 px-2 py-1 rounded"
            >
              {Object.keys(lists).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <label htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              value={modalDesc}
              onChange={(e) => setModalDesc(e.target.value)}
              className="border mb-2 px-2 py-1 rounded"
            />
            <div className="flex justify-between">
              <button
                className="p-2 rounded text-white hover:bg-blue-700 bg-blue-500"
                onClick={addItem}
              >
                Add
              </button>
              <button className="bg-red-600 p-2 rounded text-white hover:bg-red-700" onClick={closeModal}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}