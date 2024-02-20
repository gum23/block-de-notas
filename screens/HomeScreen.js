import React from "react";

import TasksList from '../components/TasksList.js';
import Layout from '../components/Layout.js'

const HomeScreen = () => {
  
  return (
    <Layout>
      <TasksList />
    </Layout>
  );
};

export default HomeScreen;
