import React, { forwardRef, useRef } from "react";

const DepartmentLicenseComponent = forwardRef((props, ref) => {
    const {
        mdLicensesNumber,
        organizationNameKo,
        departmentNameKo,
        specializedNameKo,
    } = ref;

    const userInfo = props.userInfo;

    return (
        <>
            <div>
                <h5>면허번호</h5>
                <input
                    type="text"
                    className="input w370 hold"
                    defaultValue={userInfo.md_licenses_number}
                    ref={mdLicensesNumber}
                    readOnly
                />
            </div>
            <div className="flex">
                <div>
                    <h5>소속 기관</h5>
                    <input
                        type="text"
                        className="input w280"
                        defaultValue={userInfo.organization_name_ko}
                        ref={organizationNameKo}
                    />
                </div>
                <div>
                    <h5>전공과</h5>
                    <input
                        type="text"
                        className="input w280"
                        defaultValue={userInfo.department_name_ko}
                        ref={departmentNameKo}
                    />
                </div>
                <div>
                    <h5>전공분야</h5>
                    <input
                        type="text"
                        className="input w280"
                        defaultValue={userInfo.specialized_name_ko}
                        ref={specializedNameKo}
                    />
                </div>
            </div>
        </>
    );
});

export default DepartmentLicenseComponent;
