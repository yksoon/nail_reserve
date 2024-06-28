import React, { useEffect, useMemo, useRef, useState } from "react";
import useConfirm from "hook/useConfirm";
import useAlert from "hook/useAlert";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Pagination } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBar from "components/admin/common/SearchBar";
import { isSpinnerAtom } from "etc/lib/recoils/atoms";
import apiPath from "etc/lib/path/apiPath";
import { boardType } from "etc/lib/static";
import { CommonRestAPI } from "etc/lib/CommonRestAPI";
import {
    CommonConsole,
    CommonErrModule,
    CommonNotify,
    CommonParseHTMLString,
} from "etc/lib/Common";
import { successCode } from "etc/lib/resultCode";
import CommonModal from "etc/lib/CommonModalMiddleware";

// ------------------- import End --------------------

const ContentsBoardManage = (props) => {
    const { confirm } = useConfirm();
    const { alert } = useAlert();
    const err = CommonErrModule();
    const setIsSpinner = useSetRecoilState(isSpinnerAtom);

    const isRefresh = props.isRefresh;

    // 리스트
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [checkItems, setCheckItems] = useState([]);

    // 모달
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const [modData, setModData] = useState({});

    // 테이블 세팅
    const [sorting, setSorting] = useState([]);
    const columnHelper = createColumnHelper();

    // 검색어
    const searchKeyword = useRef(null);

    useEffect(() => {
        getBoardList(1, 10, "");
    }, [isNeedUpdate, isRefresh]);

    // 리스트 가져오기
    const getBoardList = (pageNum, pageSize, searchKeyword) => {
        setIsSpinner(true);

        // /v1/_boards
        // POST
        const url = apiPath.api_admin_boards;
        const data = {
            pageNum: pageNum,
            pageSize: pageSize,
            searchKeyword: searchKeyword,
            boardType: boardType.etc, // 기타
        };

        // 파라미터
        const restParams = {
            method: "post",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
            admin: "Y",
        };

        CommonRestAPI(restParams);

        // 완료 로직
        const responsLogic = (res) => {
            let resultCode = res.headers.resultcode;

            // 성공
            if (
                resultCode === successCode.success ||
                resultCode === successCode.noData
            ) {
                let resultInfo = res.data.resultInfo;
                let pageInfo = res.data.pageInfo;

                setBoardList(resultInfo);
                setPageInfo(pageInfo);

                setIsSpinner(false);
            } else {
                // 에러
                CommonConsole("log", res);

                setIsSpinner(false);
            }
        };
    };

    // 검색
    const doSearch = () => {
        const keyword = searchKeyword.current.value;

        getBoardList(1, 10, keyword);
    };

    // 모달창 닫기
    const handleModalClose = () => {
        CommonNotify({
            type: "confirm",
            hook: confirm,
            message: "입력된 정보가 초기화 됩니다. 창을 닫으시겠습니까?",
            callback: () => close(),
        });

        const close = () => {
            setModalTitle("");
            setModData({});
            setIsOpen(false);
        };
    };

    // 리스트 새로고침
    const handleNeedUpdate = () => {
        setModalTitle("");
        setModData({});
        setIsOpen(false);
        setIsNeedUpdate(!isNeedUpdate);
    };

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            boardList.forEach((el) => idArray.push(el.boardIdx));
            setCheckItems(idArray);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    };

    // 페이지네이션 이동
    const handleChange = (e, value) => {
        getBoardList(value, 10, searchKeyword.current.value);
    };

    // 공지사항 정보 상세
    const detailBoard = (idx) => {
        setIsSpinner(true);

        const url = apiPath.api_admin_get_board + idx;
        const data = {};

        // 파라미터
        const restParams = {
            method: "get",
            url: url,
            data: data,
            err: err,
            callback: (res) => responsLogic(res),
        };

        CommonRestAPI(restParams);

        const responsLogic = (res) => {
            if (res.headers.resultcode === successCode.success) {
                const resultInfo = res.data.resultInfo;
                setModData(resultInfo);

                modBoard();

                setIsSpinner(false);
            } else {
                setIsSpinner(false);

                CommonNotify({
                    type: "alert",
                    hook: alert,
                    message: res.headers.resultmessageko,
                });
            }
        };
    };

    // 공지사항 등록 모달
    const regBoard = () => {
        setModalTitle("컨텐츠 등록하기");
        setIsOpen(true);
    };

    // 공지사항 상세 모달
    const modBoard = () => {
        setModalTitle("컨텐츠 상세보기");
        setIsOpen(true);
    };

    // 삭제
    const clickRemove = () => {
        //선택여부 확인
        checkItems.length === 0
            ? CommonNotify({
                  type: "alert",
                  hook: alert,
                  message: "삭제할 항목을 선택해주세요",
              })
            : CommonNotify({
                  type: "confirm",
                  hook: confirm,
                  message: "선택된 항목을 삭제 하시겠습니까?",
                  callback: () => removeBoard(),
              });
    };

    const removeBoard = async () => {
        let checkItemsStr = checkItems.join();
        setIsSpinner(true);

        const url = `${apiPath.api_admin_remove_board}${checkItemsStr}`;

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
                setCheckItems([]);
                handleNeedUpdate();
            };
        };
    };

    // --------------------------------- 테이블 세팅 -------------------------------------

    // 컬럼 세팅
    const columns = useMemo(() => [
        {
            accessorKey: "boardIdx",
            cell: (info) => (
                <input
                    type="checkbox"
                    name={`boardIdx_${info.getValue()}`}
                    id={info.getValue()}
                    value={info.getValue()}
                    onChange={(e) =>
                        handleSingleCheck(e.target.checked, info.getValue())
                    }
                    checked={checkItems.includes(info.getValue())}
                />
            ),
            header: () => (
                <input
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={
                        checkItems &&
                        boardList.length !== 0 &&
                        checkItems.length === boardList.length
                    }
                />
            ),
            enableSorting: false,
            colWidth: "3%",
        },

        columnHelper.accessor((row) => row.subTitle, {
            id: "subTitle",
            cell: (info) => info.getValue(),
            header: "구분",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "7%",
        }),

        columnHelper.accessor((row) => row.subject, {
            id: "subject",
            cell: (info) => info.getValue().replaceAll("&amp;", "&"),
            header: "제목",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "25%",
        }),

        columnHelper.accessor((row) => row.content, {
            id: "content",
            cell: (info) => CommonParseHTMLString(info.getValue()),
            header: "내용",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "*",
        }),

        columnHelper.accessor((row) => row.showYn, {
            id: "showYn",
            cell: (info) => (info.getValue() === "Y" ? "노출" : "비노출"),
            header: "노출여부",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "10%",
        }),

        columnHelper.accessor((row) => row.regUserNameKo, {
            id: "regUserNameKo",
            cell: (info) => info.getValue(),
            header: "등록자",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "10%",
        }),

        columnHelper.accessor((row) => row.regDttm.split(" ")[0], {
            id: "regDttm",
            cell: (info) => info.getValue(),
            header: "등록일",
            sortingFn: "alphanumericCaseSensitive",
            colWidth: "10%",
        }),

        columnHelper.accessor(
            (row) => (
                <Link
                    to=""
                    className="tablebtn"
                    onClick={() => detailBoard(row.boardIdx)}
                >
                    상세보기
                </Link>
            ),
            {
                id: "viewDetail",
                cell: (info) => info.getValue(),
                header: "상세보기",
                enableSorting: false,
                colWidth: "5%",
            },
        ),
    ]);

    const data = useMemo(() => boardList, [boardList]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <>
            <div className="content">
                <div className="title">
                    <h3>게시판 관리 - 컨텐츠 관리</h3>
                </div>
                <div className="con_area">
                    {/*검색 바*/}
                    <SearchBar
                        searchKeyword={searchKeyword}
                        search={false}
                        doSearch={doSearch}
                        regBoard={regBoard}
                        // downloadExcel={downloadExcel}
                        clickRemove={clickRemove}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                        }}
                    >
                        총 : <b>&nbsp; {pageInfo && pageInfo.total} &nbsp;</b>{" "}
                        건
                    </div>

                    <div className="adm_table">
                        <table className="table_a">
                            <colgroup>
                                {columns.length !== 0 &&
                                    columns.map((item, idx) => (
                                        <col
                                            key={`table_head_${idx}`}
                                            width={item.colWidth}
                                        />
                                    ))}
                            </colgroup>
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <div
                                                            {...{
                                                                className:
                                                                    header.column.getCanSort()
                                                                        ? "cursor-pointer select-none table_sort"
                                                                        : "",
                                                                onClick:
                                                                    header.column.getToggleSortingHandler(),
                                                            }}
                                                        >
                                                            {flexRender(
                                                                header.column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext(),
                                                            )}
                                                            {header.column.getCanSort() &&
                                                                ({
                                                                    asc: (
                                                                        <div className="sort_asc">
                                                                            <ArrowDropUpIcon />
                                                                            <ArrowDropDownIcon />
                                                                        </div>
                                                                    ),
                                                                    desc: (
                                                                        <div className="sort_desc">
                                                                            <ArrowDropUpIcon />
                                                                            <ArrowDropDownIcon />
                                                                        </div>
                                                                    ),
                                                                }[
                                                                    header.column.getIsSorted()
                                                                ] ?? (
                                                                    <div>
                                                                        <ArrowDropUpIcon />
                                                                        <ArrowDropDownIcon />
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {boardList.length !== 0 ? (
                                    table.getRowModel().rows.map((row) => (
                                        <tr key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <td
                                                        key={cell.id}
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                            textOverflow:
                                                                "ellipsis", // 넘치는 텍스트에 ... 처리
                                                            overflow: "hidden", // 넘치는 영역 숨김
                                                            maxWidth: "200px",
                                                        }}
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                ))}
                                        </tr>
                                    ))
                                ) : (
                                    <>
                                        <tr>
                                            <td
                                                colSpan="100%"
                                                style={{ height: "55px" }}
                                            >
                                                <b>데이터가 없습니다.</b>
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {Object.keys(pageInfo).length !== 0 &&
                        pageInfo.total !== 0 && (
                            <div className="pagenation">
                                <Pagination
                                    count={pageInfo.pages}
                                    onChange={handleChange}
                                    shape="rounded"
                                    color="primary"
                                />
                            </div>
                        )}
                </div>
            </div>
            <CommonModal
                isOpen={isOpen}
                title={modalTitle}
                width={"1400"}
                handleModalClose={handleModalClose}
                component={"ContentsBoardModal"}
                handleNeedUpdate={handleNeedUpdate}
                modData={modData}
            />
        </>
    );
};

export default ContentsBoardManage;
