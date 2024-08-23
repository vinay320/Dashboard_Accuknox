import React from "react";
import { useSelector, useDispatch } from "react-redux";
import graph from "../assets/graph.png";
import {
  addWidget,
  removeWidget,
  setSearchQuery,
  performSearch,
} from "./combineSlice";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import WidgetModal from "./WidgetModal ";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Slide = () => {
  const dispatch = useDispatch();

  const { categories, isSearching, filteredResults } = useSelector(
    (state) => state.combine
  );

  const isModalOpen = useSelector((state) => state.modal.isOpen); 

  const handleOpenModal = () => {
    dispatch({ type: "modal/open" }); 
  };

  const handleCloseModal = () => {
    dispatch({ type: "modal/close" }); 
  };
  const handleAddWidget = (categoryName, widgetName, widgetData) => {
    dispatch(addWidget({ categoryName, widgetName, widgetData }));
  };

  const handleRemoveWidget = (categoryName, widgetName) => {
    dispatch(removeWidget({ categoryName, widgetName }));
  };

  return (
    <div className="bg-transparent p-4">
      <div className="scroll-container">
        {(isSearching ? filteredResults : categories).map((item, index) => (
          <div key={index} className="card">
            <div className="flex justify-between overflow-x-hidden items-center mb-4 gap-4">
              <h3 className="text-xl font-bold">{item.name}</h3>
            </div>
            <div className="card-content">
              {Object.keys(item.data).map((key, idx) => (
                <div
                  className="border rounded-xl p-3 h-auto w-[400px] bg-gray-50"
                  key={idx}
                >
                  <h4 className="text-lg font-semibold">{key}</h4>
                  {Object.keys(item.data[key]).length > 0 ? (
                    <>
                      {item.name === "CSPM Executive Dashboard" && (
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={Object.entries(item.data[key]).map(
                                ([name, value]) => ({
                                  name,
                                  value,
                                })
                              )}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#8884d8"
                            >
                              {Object.entries(item.data[key]).map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                )
                              )}
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      )}

                      {item.name === "CWPP Dashboard" && (
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={Object.entries(item.data[key]).map(
                              ([name, value]) => ({
                                name,
                                value,
                              })
                            )}
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      )}

                      {item.name === "Registry Scan" && (
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart
                            data={Object.entries(item.data[key]).map(
                              ([name, value]) => ({
                                name,
                                value,
                              })
                            )}
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic flex justify-center items-center flex-col">
                      No data available{" "}
                      <img src={graph} width={100} height={100} />
                    </p>
                  )}
                </div>
              ))}
              <div
                className="border min-h-[240px] w-[400px] rounded-xl p-3 flex justify-center items-center bg-gray-50 cursor-pointer"
                onClick={handleOpenModal}
              >
                <button className="border text-gray-500 p-2 rounded-md">
                  + Add Widget
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <WidgetModal
          onClose={handleCloseModal}
          onAddWidget={handleAddWidget}
          onRemoveWidget={handleRemoveWidget}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Slide;
