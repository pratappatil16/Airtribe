// to Add New Status when all the status are deleted 
export function AddStatusModal({ openAddStatusModal }) {
    return <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={() => openAddStatusModal("")} className="cursor-pointer flex flex-col justify-center items-center">
        <span className="hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-patch-plus-fill" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0" />
          </svg>
        </span>
        <span>Add Status</span>
      </button>
    </div>
  }