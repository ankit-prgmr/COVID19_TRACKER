import React from "react";
import styles from "./App.module.css";
import coronaImage from "./images/image.png";
import TabComponent from "./components/Tab/TabComponent";

const App = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="COVID-19" />
      <TabComponent />
    </div>
  );
};

export default App;
