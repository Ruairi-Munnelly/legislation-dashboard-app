import React from "react";
import "./App.css";
import { nanoid } from "@reduxjs/toolkit";
import DashboardTable from "./components/Dashboard/DashboardTable";
import BillModal from "./components/BillModal/BillModal";
import TabsComponent from "./components/Tabs/TabsComponentDynamic";
import { useSelector } from "react-redux";
import {
  getFavourites,
  legislationData,
} from "./components/Dashboard/DashboardSlice";

function App() {
  const legislationStateData: object[] = useSelector(legislationData);
  const favouriteData: object[] = useSelector(getFavourites);
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          className='header-logo'
          src='/legislation-logo.svg'
          alt='dashboard-logo'
        />
      </header>
      <main>
        <TabsComponent
          tabTitles={["Legislation", "Favourites"]}
          tabContent={[
            <DashboardTable
              key={nanoid()}
              title={"Legislation Dashboard"}
              data={legislationStateData}
            />,
            <DashboardTable
              key={nanoid()}
              title={"Favourites"}
              data={favouriteData}
            />,
          ]}
        />
        <BillModal />
      </main>
    </div>
  );
}

export default App;
