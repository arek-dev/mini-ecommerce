import React from "react";
import styles from "./MainPage.module.scss";
import mainImage from "../../images/background1.jpg";

class MainPage extends React.Component {
  render() {
    return (
      <>
        <section className={styles["main__wrap"]}>
          <div className={styles["main__description"]}>
            <img src={mainImage} alt="main image" className={styles["main__image"]}/>
            <div className={styles["main__title"]}>
              <h2 className={styles["main__title-heading"]}>Please select one of the categories</h2>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default MainPage;
