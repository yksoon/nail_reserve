import React, { useEffect, useMemo, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { CommonErrModule, CommonNotify } from "etc/lib/Common";
import { useSetRecoilState } from "recoil";
import { isSpinnerAtom } from "etc/lib/recoils/atoms";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-paste-smart";
import ImageResize from "quill-image-resize";
import apiPath from "etc/lib/path/apiPath";
import { successCode } from "etc/lib/resultCode";
import { Link } from "react-router-dom";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";
import { boardType } from "etc/lib/static";
import { forEach } from "react-bootstrap/ElementChildren";

Quill.register("modules/imageResize", ImageResize);

const NoticeBoardModal = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    /**
     * 상세보기 데이터
     */
    const modData = props.modData;
    const isModData = Object.keys(modData).length !== 0;

    const handleModalClose = props.handleModalClose;
    const handleNeedUpdate = props.handleNeedUpdate;

    /**
     * states
     */
    const [fileList, setFileList] = useState([]);
    const [boardData, setBoardData] = useState("");

    /**
     * refs
     */
    const refs = {
        showYn: useRef(null),
        subject: useRef(null),
        subTitle: useRef(null),
        content: useRef(null),
        inputAttachmentFile: useRef(null),
    };

    const quillRef = useRef();

    useEffect(() => {
        isModData && setDefaultValue();
    }, [modData]);

    /**
     * 수정일경우 디폴트 세팅
     */
    const setDefaultValue = () => {
        refs.subject.current.value = modData.subject ?? "";
        // refs.subTitle.current.value = modData.subTitle ?? "";
        refs.showYn.current.value = modData.showYn ?? "";

        setFileList(modData.fileInfo);

        const editor = quillRef.current.getEditor();
        // const range = editor.getSelection();
        const range = quillRef.current?.getEditor().getSelection()?.index;

        const content = modData.content;

        editor.clipboard.dangerouslyPasteHTML(0, content);
    };

    /**
     * 등록/수정
     * @param method
     */
    const regModBoard = (method) => {
        if (validation()) {
            CommonNotify({
                type: "confirm",
                hook: alert,
                message:
                    method === "reg"
                        ? "공지사항을 등록하시겠습니까?"
                        : method === "mod"
                        ? "공지사항을 수정하시겠습니까?"
                        : "",
                callback: () => doRegModBoard(),
            });

            const doRegModBoard = () => {
                setIsSpinner(true);

                let url;
                if (method === "reg") {
                    // 게시판관리 - 등록
                    // /v1/_board/
                    // POST_MULTI
                    url = apiPath.api_admin_reg_board;
                } else if (method === "mod") {
                    // 게시판관리 - 수정
                    // /v1/board/
                    // PUT_MULTI
                    url = apiPath.api_admin_mod_board;
                }

                const formData = new FormData();

                let fileArr = [];

                const data = {
                    showYn: refs.showYn.current.value,
                    boardType: boardType.notice,
                    categoryType: "900",
                    boardIdx: method === "mod" ? modData.boardIdx : "",
                    subject: refs.subject.current.value,
                    // subTitle: refs.subTitle.current.value,
                    content: boardData,
                };

                // 기본 formData append
                for (const key in data) {
                    formData.append(key, data[key]);
                }

                // 파일 formData append
                // fileArr = Array.from(refs.inputAttachmentFile.current.files);
                // let len = fileArr.length;
                // for (let i = 0; i < len; i++) {
                //     formData.append("attachmentFile", fileArr[i]);
                // }

                fileArr = Array.from(refs.inputAttachmentFile.current.files);
                let len = fileArr.length;
                for (let i = 0; i < len; i++) {
                    formData.append(
                        `attachmentOrgFile[${i}].attachmentFile`,
                        fileArr[i],
                    );
                    formData.append(`attachmentOrgFile[${i}].priority`, i);
                }

                const restParams = {
                    method:
                        method === "reg"
                            ? "post_multi"
                            : method === "mod"
                            ? "put_multi"
                            : "",
                    url: url,
                    data: formData,
                    err: err,
                    admin: "Y",
                    callback: (res) => responseLogic(res),
                };

                CommonRestAPI(restParams);

                const responseLogic = (res) => {
                    let resultCode = res.headers.resultcode;
                    if (resultCode === successCode.success) {
                        setIsSpinner(false);

                        CommonNotify({
                            type: "alert",
                            hook: alert,
                            message:
                                method === "reg"
                                    ? "공지사항 등록이 완료 되었습니다"
                                    : method === "mod"
                                    ? "공지사항 수정이 완료 되었습니다"
                                    : "",
                            callback: () => handleNeedUpdate(),
                        });
                    } else {
                        setIsSpinner(false);

                        CommonNotify({
                            type: "alert",
                            hook: alert,
                            message: "잠시 후 다시 시도해주세요",
                        });
                    }
                };
            };
        }
    };

    const validation = () => {
        const noti = (ref, msg) => {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: msg,
                callback: () => focus(),
            });

            const focus = () => {
                ref && ref.current.focus();
            };
        };

        if (!refs.showYn.current.value) {
            noti(refs.showYn, "노출여부를 선택해주세요");

            return false;
        }

        if (!refs.subject.current.value) {
            noti(refs.subject, "제목을 입력해주세요");

            return false;
        }

        if (!boardData) {
            noti(quillRef, "내용을 입력해주세요");

            return false;
        }

        return true;
    };

    /**
     * 첨부파일 삭제
     */
    const resetFileList = () => {
        // 각각 배열에 담긴 데이터가 있을 경우에만 초기화
        if (fileList.length) {
            setFileList((prevFileList) => [...prevFileList].splice(0, 0));
        }
        if (refs.inputAttachmentFile.current.files.length) {
            refs.inputAttachmentFile.current.value = "";
        }
    };

    /**
     * 삭제
     */
    const clickRemove = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "삭제하시겠습니까?",
            callback: () => doRemove(),
        });

        const doRemove = () => {
            setIsSpinner(true);

            const url = `${apiPath.api_admin_remove_board}${modData.boardIdx}`;

            const restParams = {
                method: "delete",
                url: url,
                data: {},
                err: err,
                admin: "Y",
                callback: (res) => responsLogic(res),
            };

            CommonRestAPI(restParams);

            const responsLogic = (res) => {
                const resultCode = res.headers.resultcode;
                if (resultCode === successCode.success) {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "삭제가 완료 되었습니다",
                        callback: () => pageUpdate(),
                    });
                } else {
                    setIsSpinner(false);

                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "잠시 후 다시 시도해주세요",
                    });
                }

                const pageUpdate = () => {
                    handleNeedUpdate();
                };
            };
        };
    };

    // 이미지 업로드 시 미리보기
    const readURL = (input, imageType) => {
        // console.log(input.files);

        if (input.files.length > 5) {
            CommonNotify({
                type: "alert",
                hook: alert,
                message: "파일첨부는 5개까지 가능합니다.",
            });

            input.value = "";

            return false;
        } else {
            for (let i = 0; i < input.files.length; i++) {
                if (isNotFileImage(input.files[i])) {
                    CommonNotify({
                        type: "alert",
                        hook: alert,
                        message: "이미지 파일은 에디터 내에서 첨부 가능합니다.",
                    });

                    input.value = "";

                    return false;
                }
            }
        }
    };

    function isNotFileImage(file) {
        if (file) {
            return file && file["type"].split("/")[0] === "image";
        }
    }

    /**
     * 에디터 이미지 핸들러
     */
    const imageHandler = () => {
        const input = document.createElement("input");

        input.setAttribute("type", "file");
        input.setAttribute("multiple", "true");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const inputFiles = input.files;
            const length = inputFiles.length;

            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();

            if (isFileImage(inputFiles)) {
                for (let i = 0; i < length; i++) {
                    let file = inputFiles[i];

                    let IMG_URL;
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        IMG_URL = reader.result;

                        editor?.clipboard.dangerouslyPasteHTML(
                            range.index,
                            `<img src="${IMG_URL}" alt="" />`,
                        );
                    };
                }
            } else {
                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: "이미지만 업로드 가능합니다.",
                });

                input.value = "";

                return false;
            }
        });
    };

    /**
     * 이미지 파일인지 확인
     * @param file
     * @returns {*|boolean}
     */
    function isFileImage(file) {
        if (file) {
            for (let i = 0; i < file.length; i++) {
                return file[i] && file[i]["type"].split("/")[0] === "image";
            }
        }
    }

    // 에디터 설정
    // Quill 에디터에서 사용하고싶은 모듈들을 설정한다.
    // useMemo를 사용해 modules를 만들지 않는다면 매 렌더링 마다 modules가 다시 생성된다.
    // 그렇게 되면 addrange() the given range isn't in document 에러가 발생한다.
    // -> 에디터 내에 글이 쓰여지는 위치를 찾지 못하는듯
    const quillModules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }], // 글자 크기 옵션 추가
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    [{ align: [] }], // 텍스트 정렬 옵션
                    // ["link"],
                    ["image"],
                    [{ color: [] }, { background: [] }],
                    ["clean"],
                ],
                handlers: {
                    // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
                    image: imageHandler,
                    // link: linkHandler,
                },
            },
            clipboard: {
                allowed: {
                    tags: [
                        "a",
                        "b",
                        "strong",
                        "u",
                        "s",
                        "i",
                        "p",
                        "br",
                        "ul",
                        "ol",
                        "li",
                        "span",
                        "img",
                    ],
                    attributes: ["href", "rel", "target", "class"],
                },
                keepSelection: true,
                substituteBlockElements: true,
                magicPasteLinks: true,
                hooks: {
                    uponSanitizeElement(node, data, config) {
                        console.log(node);
                    },
                },
                matchVisual: false,
                sanitizeOptions: {
                    allowedAttributes: {
                        "*": ["style", "class", "id"],
                        a: ["href", "name", "target"],
                        img: ["src", "width"],
                    },
                },
            },
            ImageResize: {
                parchment: Quill.import("parchment"),
            },
        };
    }, []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "image",
        "color",
        "background",
        "link",
        "align",
        "size",
    ];

    return (
        <>
            <div className="admin">
                <table className="table_bb">
                    <Colgroup />
                    <tbody>
                        <tr>
                            <th>
                                노출여부 <span className="red">*</span>
                            </th>
                            <td>
                                <select
                                    name=""
                                    className="w180"
                                    ref={refs.showYn}
                                >
                                    <option>- 선택 -</option>
                                    <option value="Y">노출</option>
                                    <option value="N">비노출</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                제목 <span className="red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    className="input wp100"
                                    ref={refs.subject}
                                />
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <th>부제목</th>*/}
                        {/*    <td>*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            className="input wp100"*/}
                        {/*            ref={refs.subTitle}*/}
                        {/*        />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        <tr>
                            <th>
                                내용 <span className="red">*</span>
                            </th>
                            {/*<td>*/}
                            {/*    <textarea*/}
                            {/*        className="input wp100"*/}
                            {/*        ref={refs.contentKo}*/}
                            {/*    />*/}
                            {/*</td>*/}

                            <td>
                                <div className="editor">
                                    <ReactQuill
                                        ref={quillRef}
                                        theme="snow"
                                        value={boardData}
                                        onChange={(e) => {
                                            setBoardData(e);
                                            // console.log(e);
                                        }}
                                        modules={quillModules}
                                        formats={formats}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>파일</th>
                            <td>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <input
                                        type="file"
                                        ref={refs.inputAttachmentFile}
                                        onChange={(e) =>
                                            readURL(e.target, "origin")
                                        }
                                        id="inputAttachmentFile"
                                        multiple
                                    />
                                    <Link
                                        to=""
                                        className="subbtn off"
                                        onClick={resetFileList}
                                    >
                                        초기화
                                    </Link>
                                </div>
                                <div>
                                    {fileList.length !== 0 &&
                                        fileList.map((item, idx) => (
                                            <div key={`fileList_${idx}`}>
                                                <Link
                                                    to={`${apiPath.api_file}${item.filePathEnc}`}
                                                    className="yks_file_btn"
                                                >
                                                    <img
                                                        src="/img/common/file.svg"
                                                        alt=""
                                                        style={{
                                                            width: "20px",
                                                        }}
                                                    />
                                                    {item.fileNameOrg}
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="subbtn_box">
                    {isModData ? (
                        <>
                            <Link
                                to=""
                                className="subbtn del"
                                onClick={clickRemove}
                            >
                                삭제
                            </Link>
                            <Link
                                to=""
                                className="subbtn on"
                                onClick={() => regModBoard("mod")}
                            >
                                수정
                            </Link>
                        </>
                    ) : (
                        <Link
                            to=""
                            className="subbtn on"
                            onClick={() => regModBoard("reg")}
                        >
                            등록
                        </Link>
                    )}
                    <Link
                        to=""
                        className="subbtn off"
                        onClick={handleModalClose}
                    >
                        취소
                    </Link>
                </div>
            </div>
        </>
    );
};

const Colgroup = () => {
    return (
        <>
            <colgroup>
                <col width="20%" />
                <col width="*" />
            </colgroup>
        </>
    );
};

export default NoticeBoardModal;
