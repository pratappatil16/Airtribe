import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold mb-4 text-red-600">Error 404</div>
      <div className="w-3/4 text-center mb-8">
        <p className="text-lg text-gray-700">Page Not Found</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}
