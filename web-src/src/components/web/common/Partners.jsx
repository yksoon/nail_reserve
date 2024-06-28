import React from "react";
import { Link } from "react-router-dom";
import { CommonOpenUrl } from "etc/lib/Common";

const Partners = () => {
    const partners = [
        {
            url: "https://www.airmacau.com.mo",
            path: "/img/web/partner/partner01.png",
        },
        {
            url: "https://www.ktreehotel.com/",
            path: "/img/web/partner/partner02.png",
        },
        {
            url: "http://www.jjinhomme.co.kr/",
            path: "/img/web/partner/partner03.png",
        },
        {
            url: "http://mercureulsan.com",
            path: "/img/web/partner/partner04.png",
        },
        {
            url: "https://mjh.or.kr/main/",
            path: "/img/web/partner/partner05.png",
        },
        {
            url: "https://www.marriott.com/en-us/hotels/jktwi-the-westin-jakarta/overview/",
            path: "/img/web/partner/partner06.png",
        },
        {
            url: "https://all.accor.com/hotel/0533/index.ko.shtml",
            path: "/img/web/partner/partner07.png",
        },
        {
            url: "https://www.themulia.com/jakarta/",
            path: "/img/web/partner/partner08.png",
        },
        {
            url: "https://www.saeviteye.com/",
            path: "/img/web/partner/partner09.png",
        },
        { url: "https://ncc.re.kr/", path: "/img/web/partner/partner10.png" },
        {
            url: "https://www.glad-hotels.com/maisongladjeju/index.do",
            path: "/img/web/partner/partner11.png",
        },
        {
            url: "http://www.grace-hospital.com/",
            path: "/img/web/partner/partner12.png",
        },
        { url: "www.cashtree.id", path: "/img/web/partner/partner13.png" },
        {
            url: "http://www.jnplaw.co.kr/",
            path: "/img/web/partner/partner14.png",
        },
        {
            url: "https://www.nhimc.or.kr/",
            path: "/img/web/partner/partner15.png",
        },
        {
            url: "https://www.artbuddy.co.kr/",
            path: "/img/web/partner/partner16.png",
        },
        {
            url: "https://www.allmytour.com/",
            path: "/img/web/partner/partner17.png",
        },
        { url: "www.mayfield.co.kr", path: "/img/web/partner/partner18.png" },
        {
            url: "https://www.instagram.com/cheongdam_kclinic",
            path: "/img/web/partner/partner19.png",
        },
        {
            url: "http://cmscompany.co.kr/",
            path: "/img/web/partner/partner20.png",
        },
        { url: "https://www.rsui.com", path: "/img/web/partner/partner21.png" },
        {
            url: "https://www.ayana.com",
            path: "/img/web/partner/partner22.png",
        },
        { url: "https://gtdc.or.kr/", path: "/img/web/partner/partner23.png" },
        {
            url: "https://ojuk.gtdc.or.kr/",
            path: "/img/web/partner/partner24.jpg",
        },
        { url: "/", path: "/img/web/partner/partner25.jpg" },
    ];

    return (
        <>
            <ul className="partner">
                {partners.map((item, idx) => (
                    <li key={`partner_${idx}`}>
                        <Link
                            to=""
                            onClick={(e) => {
                                CommonOpenUrl(item.url, e);
                            }}
                        >
                            <img src={item.path} alt="" />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Partners;
