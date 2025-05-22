import React from 'react';

const Input = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="relative">
          <input id="username" name="username" type="text" placeholder className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit" />
          <label htmlFor="username" className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
            Name
          </label>
        </div>
      </div>
    </div>
  );
}

export default Input;
