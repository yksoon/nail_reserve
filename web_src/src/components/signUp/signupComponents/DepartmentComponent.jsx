import React, { forwardRef } from "react";

const DepartmentComponent = forwardRef((props, ref) => {
    const { organization_name_ko, department_name_ko, specialized_name_ko } =
        ref;

    return (
        <>
            <div>
                <h5>소속 기관</h5>
                <input
                    type="text"
                    className="input w280"
                    ref={organization_name_ko}
                />
            </div>
            <div>
                <h5>전공과</h5>
                <input
                    type="text"
                    className="input w280"
                    ref={department_name_ko}
                />
            </div>
            <div>
                <h5>전공분야</h5>
                <input
                    type="text"
                    className="input w280"
                    ref={specialized_name_ko}
                />
            </div>
        </>
    );
});

export default DepartmentComponent;
