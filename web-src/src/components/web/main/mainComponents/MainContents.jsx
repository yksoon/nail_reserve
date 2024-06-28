import Section01 from "components/web/main/mainComponents/mainContentsComponents/Section01";
import Section02 from "components/web/main/mainComponents/mainContentsComponents/Section02";
import Section03 from "components/web/main/mainComponents/mainContentsComponents/Section03";
import Section04 from "components/web/main/mainComponents/mainContentsComponents/Section04";
import Section05 from "components/web/main/mainComponents/mainContentsComponents/Section05";
import Section06 from "components/web/main/mainComponents/mainContentsComponents/Section06";

const MainContents = (props) => {

    return (
        <>
            <div id="container">
                {/*section01*/}
                <Section01 />

                {/*section02*/}
                <Section02 />

                {/*section03*/}
                <Section03 />

                {/*section04*/}
                <Section04 />

                {/*section05*/}
                <Section05 />

                {/*section06*/}
                <Section06 />

            </div>
        </>
    );
};

export default MainContents;
