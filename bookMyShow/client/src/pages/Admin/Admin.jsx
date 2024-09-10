import React from "react";

import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";

function Admin() {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },

    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];

  return (
    <div>
      <h1>Welcome to Admin panel!</h1>

      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}

export default Admin;
