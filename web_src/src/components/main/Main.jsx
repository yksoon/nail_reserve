import { React, useEffect, useState, useLayoutEffect, useRef } from "react";

import Header from "components/common/Header";
import Footer from "components/common/Footer";

import MainCarousel from "./crousel/MainCarousel";
import MainMenu from "./content/MainMenu";
import MainHotel from "./content/MainHotel";
import MainBanner from "./content/MainBanner";
import MainNews from "./content/MainNews";
import MainBoard from "./content/MainBoard";

// import Login from "common/js/Login";
import styles from "common/css/style/Main/Main.module.css";

function Main() {
    //   const handleModalOpen = () => {
    //     const [isOpen, setIsOpen] = useState(false);
    //     const [modalTitle, setModalTitle] = useState("");
    //     const [modalContent, setModalContent] = useState([]);

    //     setIsOpen(true);
    // };

    const refs = {
        inputId: useRef(null),
    };

    return (
        <>
            <Header ref={refs} />

            <MainCarousel />

            <div className={`content ${styles.mainContent}`}>
                <MainMenu ref={refs} />

                <MainHotel />

                <MainBanner />

                <MainNews />

                <MainBoard />
            </div>

            {/* <CommonAlert
                isOpen={isOpen}
                handleModalClose={handleModalClose}
                content={modalContent}
                title={modalTitle}
            /> */}
            <Footer />
        </>
    );
}

export default Main;
