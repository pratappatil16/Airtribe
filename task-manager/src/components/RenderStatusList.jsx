export function RenderStatusList({ handleDragOver, handleDrop, type, list, handleDragStart, navigate, deleteItem }) {
    return <ul
      className="w-full flex flex-col min-h-[30px] bg-white rounded shadow-md"
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
  }