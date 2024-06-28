import React from "react";
import { Helmet } from "react-helmet-async";

const SEOMetaTag = (props) => {
    const globalLanguage = props.globalLanguage;

    return (
        <>
            <Helmet>
                {globalLanguage === "ko" && (
                    <title>메디씨티 - 전문 의료인을 위한 포털 서비스</title>
                )}
                {globalLanguage === "ko" && (
                    <meta
                        name="description"
                        content="메디씨티는 의사, 간호사 및 모든 의료 전문가를 위한 다양한 맞춤형 서비스를 제공합니다. 전문 의료인의 요구에 완벽하게 부응하는 메디씨티와 함께하세요."
                    />
                )}
                {globalLanguage === "en" && (
                    <title>
                        MediCity - Portal Service for Healthcare Professionals
                    </title>
                )}
                {globalLanguage === "en" && (
                    <meta
                        name="description"
                        content="MediCity offers a variety of customized services for doctors, nurses, and all healthcare professionals. Join MediCity to perfectly fulfill the needs of professional healthcare providers."
                    />
                )}
                {globalLanguage === "id" && (
                    <title>
                        MediCity - Portal Layanan untuk Tenaga Kesehatan
                        Professional
                    </title>
                )}
                {globalLanguage === "id" && (
                    <meta
                        name="description"
                        content="MediCity memberikan berbagai layanan yang untuk dokter, perawat, dan semua tenaga medis professional. Bergabunglah dengan MediCity untuk memberikan layanan kesehatan secara profesional."
                    />
                )}
            </Helmet>
        </>
    );
};

export default SEOMetaTag;
