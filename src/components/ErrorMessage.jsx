import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">
      {message}
    </div>
  );
}