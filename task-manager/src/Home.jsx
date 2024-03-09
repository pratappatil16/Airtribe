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
  const [Colorlist, setColorlist] = useState({
    notStarted: "orange",
    started: "red",
    completed: "green"
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddStatusModalOpen, setIsAddStatusModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("notStarted");
  const [modalDesc, setModalDesc] = useState("");
  const [newStatusName, setNewStatusName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color

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

    const savedColorList = JSON.parse(localStorage.getItem("colorlist"));
    if (savedColorList) {
      setColorlist(savedColorList);
    }
  }, []);

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
      setIsAddTaskModalOpen(false);
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

  const deleteStatus = (type) => {
    const { [type]: deletedStatus, ...updatedLists } = lists;
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    const { [type]: deletedColor, ...updatedColorList } = Colorlist;
    setColorlist(updatedColorList);
    localStorage.setItem("colorlist", JSON.stringify(updatedColorList));
  };

  const resetModal = () => {
    setModalTitle("");
    setModalType("notStarted");
    setModalDesc("");
  };

  const closeModal = () => {
    setIsAddTaskModalOpen(false);
    setIsAddStatusModalOpen(false);
    resetModal();
  };

  const openAddTaskModal = (type) => {
    setModalType(type);
    setIsAddTaskModalOpen(true);
  };

  const openAddStatusModal = () => {
    setIsAddStatusModalOpen(true);
  };

  const handleNewStatusNameChange = (e) => {
    setNewStatusName(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const addNewStatus = () => {
    if (newStatusName.trim() !== "") {
      const newStatusType = newStatusName.toLowerCase().replace(/\s+/g, "_");
      setLists(prevLists => ({
        ...prevLists,
        [newStatusType]: []
      }));
      localStorage.setItem("lists", JSON.stringify({ ...lists, [newStatusType]: [] }));
      setIsAddStatusModalOpen(false);
      setNewStatusName("");
      setColorlist({ ...Colorlist, [newStatusType]: selectedColor });
      localStorage.setItem("colorlist", JSON.stringify({ ...Colorlist, [newStatusType]: selectedColor }));
    }
  };

  function getStatusBackgroundColor(type) {
    return Colorlist[type];
  }

  return (
    <div className="flex flex-wrap">
      {Object.entries(lists).map(([type, list]) => (
        <div key={type} className="w-full md:w-1/3 p-4">
          <div className={`border p-4 `}>
            <h1 className="text-xl font-semibold mb-4 capitalize flex items-center">
              <span style={ { backgroundColor:`${getStatusBackgroundColor(type)}`}} className={`rounded px-2 mr-4 p-1`}>{type}</span> {list?.length}{" "}
              <button onClick={() => openAddStatusModal(type)} className="ml-auto">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                    />
                  </svg>
                </span>
              </button>
              <button onClick={() => deleteStatus(type)} className="ml-2 text-red-600">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h2a1 1 0 0 1 1 0h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                  </svg>
                </span>
              </button>
            </h1>
            {/* Rest of your component */}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h2a1 1 0 0 1 1 0h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <button className="p-2 mt-4 text-gray-600 w-auto" onClick={() => openAddTaskModal(type)}>
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                  />
                </svg>
                <span className="pl-3">new</span>
              </span>
            </button>
          </div>
        </div>
      ))}
      {isAddTaskModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="w-full md:w-1/3 bg-white p-4 rounded border flex flex-col relative">
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
              <button className="p-2 rounded text-white hover:bg-blue-700 bg-blue-500" onClick={addItem}>
                Add
              </button>
              <button className="bg-red-600 p-2 rounded text-white hover:bg-red-700" onClick={closeModal}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddStatusModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="w-full md:w-1/3 bg-white p-4 rounded border flex flex-col relative">
            <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
              X
            </button>
            <label htmlFor="newStatus">New Status Name:</label>
            <input
              type="text"
              id="newStatus"
              value={newStatusName}
              onChange={handleNewStatusNameChange}
              className="border mb-2 px-2 py-1 rounded"
            />
            <label htmlFor="color">Select Color:</label>
            <input
              type="color"
              id="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="border mb-2 px-2 py-1 rounded"
            />
            <button
              className="p-2 rounded text-white bg-blue-500 hover:bg-blue-700"
              onClick={addNewStatus}
            >
              Add New Status
            </button>
          </div>
        </div>
      )}
      {Object.entries(lists).length === 0 ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <button onClick={() => openAddStatusModal("")} className="cursor-pointer flex flex-col justify-center items-center">
            <span className="hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-patch-plus-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/>
              </svg>
            </span>
            <span>Add Status</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
