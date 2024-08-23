import React, { useState } from "react";
import { useSelector } from "react-redux";

const WidgetModal = ({ onClose, onAddWidget, onRemoveWidget }) => {
  const [widgetName, setWidgetName] = useState("");
  const categories = useSelector((state) => state.combine.categories);
  const [widgetData, setWidgetData] = useState("");
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.name || ""
  );

  const handleAdd = () => {
    if (widgetName && widgetData) {
      try {
        const parsedData = JSON.parse(widgetData);
        onAddWidget(selectedCategory, widgetName, parsedData);
        setWidgetName("");
        setWidgetData("");
      } catch (error) {
        alert("Invalid JSON format for widget data.");
      }
    }
  };

  const handleToggleWidget = (category, name) => {
    setSelectedWidgets((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      if (updatedSelected[category]?.includes(name)) {
        updatedSelected[category] = updatedSelected[category].filter(
          (widget) => widget !== name
        );
      } else {
        updatedSelected[category] = updatedSelected[category]
          ? [...updatedSelected[category], name]
          : [name];
      }
      return updatedSelected;
    });
  };

  const handleCancelSelection = () => {
    setSelectedWidgets({});
  };

  const handleConfirmSelection = () => {
    Object.entries(selectedWidgets).forEach(([category, widgets]) => {
      widgets.forEach((widget) => {
        console.log(`Removing widget ${widget} from category ${category}`);
        onRemoveWidget(category, widget);
      });
    });
    setSelectedWidgets({});
  };


  const currentCategory = categories.find(
    (cat) => cat.name === selectedCategory
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white  shadow-lg w-[800px] h-full overflow-y-auto">
        <h2 className="text-white font-bold mb-4 bg-blue-900 p-2">
          Add Widgets
        </h2>
        <div className="p-6">
          <div className="flex border-none bg-transparent mb-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.name
                    ? "bg-blue-500 border-black text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Name
            </label>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Data (JSON format)
            </label>
            <textarea
              value={widgetData}
              onChange={(e) => setWidgetData(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows="4"
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Widget
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>

          {Object.keys(selectedWidgets).some(
            (category) => selectedWidgets[category].length > 0
          ) && (
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handleCancelSelection}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelection}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          )}

          {currentCategory && (
            <>
              <h3 className="text-lg font-bold mt-6">Current Widgets</h3>
              <ul className="mt-2">
                {Object.keys(currentCategory.data).map((name) => (
                  <li
                    key={name}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md mb-2"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedWidgets[selectedCategory]?.includes(name) ||
                          false
                        }
                        onChange={() =>
                          handleToggleWidget(selectedCategory, name)
                        }
                        className="mr-2"
                      />
                      {name}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;
;

