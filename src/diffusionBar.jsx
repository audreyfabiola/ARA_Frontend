import React from "react";

function DiffusionBar({ modelName, diffusionPercentage }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-xl font-semibold w-2/5 overflow-hidden">{modelName}</span>
      <div className="flex items-center w-3/4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${diffusionPercentage}%`,
              background: "linear-gradient(to left, red, green)",
            }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {diffusionPercentage}%
        </span>
      </div>
    </div>
  );
}

export default DiffusionBar;
