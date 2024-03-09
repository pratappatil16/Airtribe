// To Add New Task in the Status
export function TaskModal({ closeModal, modalTitle, setModalTitle, modalType, setModalType, lists, modalDesc, setModalDesc, addItem,Colorlist }) {
  console.log(Colorlist)
    return <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
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
            <option key={type} value={type} style={{color:`${Colorlist[type]}`}} className=" capitalize">
 
              {type.toString().split("_").join(" ")}
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
  }