//for opening the new Status model box
export function StatusModalBox({ closeModal, newStatusName, handleNewStatusNameChange, selectedColor, handleColorChange, addNewStatus }) {
    return <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
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
  }
  