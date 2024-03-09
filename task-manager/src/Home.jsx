import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonAddTask } from "./components/ButtonAddTask";
import { RenderStatusList } from "./components/RenderStatusList";
import { ButtonDeleteStatus } from "./components/ButtonDeleteStatus"
import { ButtonOpenStatusModal } from "./components/ButtonOpenStatusModal";
import { TaskModal } from "./components/TaskModal";
import { StatusModalBox } from "./components/StatusModalBox";
import { AddStatusModal } from "./components/AddStatusModal";


export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [lists, setLists] = useState({
    not_started: [],
    in_progress: [],
    completed: []
  });
  const [Colorlist, setColorlist] = useState({
    not_started: "#F8A593",
    in_progress: "#F6EA99",
    completed: "#B4E589"
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
        not_started: [],
        in_progress: [],
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
    if (draggedItem && type!== draggedItem?.type) {
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
            <h1 className="text-l font-semibold mb-1 capitalize flex items-center">
              <span  style={{ backgroundColor: `${getStatusBackgroundColor(type)}` }} className={`rounded px-2 mr-4 p-1 `}>{type.toString().split("_").join(" ")}</span>
              <span className=" text-gray-400"> {list?.length}{" "}</span>
              <ButtonOpenStatusModal openAddStatusModal={openAddStatusModal} type={type} />
              <ButtonDeleteStatus deleteStatus={deleteStatus} type={type} />
            </h1>

            <RenderStatusList handleDragOver={handleDragOver} handleDrop={handleDrop} type={type} list={list} handleDragStart={handleDragStart} navigate={navigate} deleteItem={deleteItem} />
            <ButtonAddTask openAddTaskModal={openAddTaskModal} type={type} />
          </div>
        </div>
      ))}
      {isAddTaskModalOpen && (
        <TaskModal closeModal={closeModal} modalTitle={modalTitle} setModalTitle={setModalTitle} modalType={modalType} setModalType={setModalType} lists={lists} modalDesc={modalDesc} setModalDesc={setModalDesc} addItem={addItem} Colorlist={Colorlist} />
      )}
      {isAddStatusModalOpen && (
        <StatusModalBox closeModal={closeModal} newStatusName={newStatusName} handleNewStatusNameChange={handleNewStatusNameChange} selectedColor={selectedColor} handleColorChange={handleColorChange} addNewStatus={addNewStatus} />
      )}
      {Object.entries(lists).length === 0 ? (
        <AddStatusModal openAddStatusModal={openAddStatusModal} />
      ) : null}
    </div>
  );
}
