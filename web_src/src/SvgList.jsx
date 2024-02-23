
import React, {useEffect, useState} from "react";
const SvgList = () => {
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        const importAll = (r) => {
            return r.keys().map(r);
        };

        // 이미지 폴더 내의 모든 이미지 가져오기
        const images = importAll(require.context('/public/img/icon', false, /\.(png|jpe?g|svg)$/));

        console.log(images)
        setImageFiles(images);
    }, []);

    return (
        <div>
            <h1>이미지 목록</h1>
            <div>
                {imageFiles.map((image, index) => (
                    <span><img src={image} alt={`Image ${index}`} /></span>
                ))}
            </div>
        </div>
    )
}

export default SvgList