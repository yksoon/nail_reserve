import { CommonErrModule, CommonRest, CommonSpinner2 } from "common/js/Common";
import { successCode } from "common/js/resultCode";
import useAlert from "hook/useAlert";
import useConfirm from "hook/useConfirm";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { isSpinnerAtom } from "recoils/atoms";
import { apiPath } from "webPath";

const CertResult = (props) => {
  const { alert } = useAlert();
  const { confirm } = useConfirm();
  const err = CommonErrModule();
  const [isSpinner, setIsSpinner] = useRecoilState(isSpinnerAtom);

  const params = useParams();
  const cert_idx = params.cert_idx;

  const location = useLocation();
  const queryString = location.search;

  useEffect(() => {
    sendResult();
  }, []);

  const sendResult = () => {
    setIsSpinner(true);

    const url = `${apiPath.api_auth_cert_recieve_result}${cert_idx}${queryString}`;

    // 파라미터
    const restParams = {
      method: "get",
      url: url,
      data: {},
      err: err,
      callback: (res) => responseLogic(res),
    };

    CommonRest(restParams);

    const responseLogic = (res) => {
      const result_code = res.headers.result_code;

      if (result_code === successCode.success) {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    };
  };

  return <>{isSpinner && <CommonSpinner2 />}</>;
};

export default CertResult;
