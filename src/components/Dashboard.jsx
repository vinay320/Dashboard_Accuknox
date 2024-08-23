import { useState } from "react";
import DashboardNavigation from "./DashboardNavigation";
import Slide from "./Slide";
import WidgetModal from "./WidgetModal ";
import { data } from "../assets/data"; 

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddWidget = (categoryName, widgetName, widgetData) => {
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      { category: categoryName, name: widgetName, data: widgetData },
    ]);
    setIsModalOpen(false);
  };

  const handleRemoveWidget = (categoryName, widgetName) => {
    setWidgets((prevWidgets) =>
      prevWidgets.filter(
        (widget) =>
          !(widget.category === categoryName && widget.name === widgetName)
      )
    );
  };

  const handleRefresh = () => {
    console.log("Refreshing dashboard...");
    window.location.reload();
  };

  const handleMenu = () => {
    console.log("Opening menu...");
  };

  const handleFilter = () => {
    console.log("Filtering data...");
  };

  const openAddWidgetModal = (category) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
  };

  const closeWidgetModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <DashboardNavigation
        onAddWidget={() => openAddWidgetModal(selectedCategory)}
        onRefresh={handleRefresh}
        onMenu={handleMenu}
        onFilter={handleFilter}
      />
      {isModalOpen && selectedCategory && (
        <WidgetModal
          onClose={closeWidgetModal}
          onAddWidget={handleAddWidget}
          onRemoveWidget={handleRemoveWidget}
          categories={[selectedCategory]}
        />
      )}
      <Slide
        categories={data} 
        onOpenAddWidgetModal={openAddWidgetModal}
      />
    </div>
  );
};

export default Dashboard;
