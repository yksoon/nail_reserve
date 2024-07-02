import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import {
    DateCalendar,
    LocalizationProvider,
    StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import { CommonOpenUrl } from "etc/lib/Common";

const CustomPickersDay = styled("div")(({ theme, selected, isSpecial }) => ({
    ...theme.typography.caption,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2px",
    borderRadius: "50%",
    backgroundColor: isSpecial
        ? "#f50057" // 특정 날짜의 배경색
        : selected
        ? theme.palette.primary.main // 선택된 날짜의 기본 배경색
        : "inherit", // 기본 배경색
    color: isSpecial
        ? theme.palette.common.white // 특정 날짜의 텍스트 색상
        : selected
        ? theme.palette.common.white // 선택된 날짜의 텍스트 색상
        : "inherit", // 기본 텍스트 색상
}));

const MainContents = (props) => {
    // 달력 세팅
    const today = new Date();
    // 현재 달의 첫 번째 날
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    // 다음 달의 마지막 날
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    const specialDate = dayjs("2024-07-07"); // 특정 날짜 설정

    const renderDay = (day, selectedDate, pickersDayProps) => {
        const isSpecialDate = dayjs(day).isSame(specialDate, "day");
        return (
            <CustomPickersDay
                {...pickersDayProps}
                selected={pickersDayProps.selected}
                isSpecial={isSpecialDate}
            >
                {day.format("D")}
            </CustomPickersDay>
        );
    };

    return (
        <>
            <div id="container">
                <Box display="flex" justifyContent="flex-end" mt={5}>
                    <Box
                        className="index_openkakao_btn"
                        onClick={(e) => CommonOpenUrl("https://naver.com", e)}
                    >
                        <div className="index_openkakao_img_div">
                            <img
                                src="./img/common/kakao.png"
                                className="index_openkakao_img"
                                alt=""
                            />
                        </div>
                        <div className="index_openkakao_text_div">KakaoCh</div>
                    </Box>
                </Box>
                <Box mt={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            defaultValue={dayjs(today)}
                            disablePast={true}
                            slots={{ calendarHeader: CustomCalendarHeader }}
                            minDate={minDate}
                            maxDate={maxDate}
                            renderDay={renderDay}
                            sx={{
                                "& .MuiBadge-badge": {
                                    // Adjustment for recordMade badge
                                    fontSize: "0.7em",
                                    paddingTop: "4px",
                                },
                                // '& .MuiPickersBasePicker-pickerView': {
                                //     maxHeight: '800px',
                                //   },

                                "& .MuiDayCalendar-header": {
                                    // Needed for weekday (ie S M T W T F S )adjustments (and padding if wanted)
                                    // Adjusts spacing between
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    width: "100%",
                                    margin: "2px, 0",
                                    // paddingTop: '1em',
                                    // paddingBottom: "1em",
                                },
                                "& .MuiDayCalendar-weekContainer": {
                                    // Adjusts spacing between days (ie 1, 2, 3.. 27, 28)
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    width: "100%",
                                    margin: 0,
                                },
                                "& .MuiDayCalendar-weekDayLabel": {
                                    // Grows width/height of day buttons
                                    width: "calc(100% - 4px)",
                                    height: "calc(100% - 4px)",
                                    aspectRatio: "1",
                                    // height: 'auto',

                                    fontSize: "1.0em",
                                },
                                "& .MuiPickersDay-dayWithMargin": {
                                    // Grows width/height of day buttons
                                    width: "calc(100% - 4px)",
                                    height: "calc(100% - 4px)",
                                    aspectRatio: "1",
                                    // height: 'auto',

                                    fontSize: "1.0em",
                                },
                                "& .MuiBadge-root": {
                                    // Parent of button management
                                    aspectRatio: 1,
                                    width: "10%",
                                    display: "flex",
                                    alignContent: "center",
                                    justifyContent: "center",
                                },
                                // "& .MuiDayCalendar-weekDayLabel": {
                                //     // Manages size of weekday labels
                                //     aspectRatio: 1,
                                //     width: "calc(10% - 4px)", // deals with margin
                                //     fontSize: "1.0em",
                                // },
                                "& .MuiPickersCalendarHeader-label": {
                                    // Manages month/year size
                                    fontSize: "1.3em",
                                },
                                "& .MuiDayCalendar-monthContainer": {
                                    // Not sure if needed, currently works tho
                                    width: "100%",
                                },
                                "& .MuiPickersFadeTransitionGroup-root-MuiDateCalendar-viewTransitionContainer":
                                    {
                                        // Handles size of week row parent, 1.6 aspect is good for now
                                        aspectRatio: "1.6",
                                        overflow: "hidden",
                                    },
                                "& .MuiDayCalendar-slideTransition": {
                                    // Handles size of week row parent, 1.6 aspect is good for now
                                    aspectRatio: 1.6,
                                    width: "100%",
                                    overflow: "hidden",
                                },
                                "& .MuiDayCalendar-loadingContainer": {
                                    width: "100%",
                                    aspectRatio: 1.6,
                                },
                                "& .MuiDayCalendarSkeleton-root": {
                                    width: "100%",
                                },
                                "& .MuiDayCalendarSkeleton-week": {
                                    width: "100%",
                                },
                                "& .MuiDayCalendarSkeleton-daySkeleton": {
                                    width: "calc(10% - 4px) !important", // Deals with the margin calcs
                                    aspectRatio: "1 !important",
                                    height: "auto !important",
                                },
                                height: "100%",
                                width: "100%",
                                maxHeight: "100%",
                                "& .MuiPickersDay-root.Mui-selected": {
                                    backgroundColor: "transparent", // 선택된 날짜의 배경색을 투명하게 설정
                                    color: "inherit", // 선택된 날짜의 텍스트 색상을 기본 색상으로 설정
                                    border: "none", // 선택된 날짜의 테두리를 없앰
                                },
                                "& .MuiPickersDay-root.Mui-selected:hover": {
                                    backgroundColor: "transparent", // 호버 상태에서도 배경색을 투명하게 유지
                                },
                                "& .MuiPickersDay-root.Mui-selected:focus": {
                                    backgroundColor: "transparent", // 포커스 상태에서도 배경색을 투명하게 유지
                                },
                                "& .MuiPickersDay-root.MuiPickersDay-today": {
                                    border: "1px solid #707070", // 오늘 날짜는 기본 테두리를 유지
                                },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </div>
        </>
    );
};

const CustomCalendarHeader = (props) => {
    const { currentMonth, onMonthChange } = props;

    const selectNextMonth = () =>
        onMonthChange(currentMonth.add(1, "month"), "left");
    // const selectNextYear = () =>
    //     onMonthChange(currentMonth.add(1, "year"), "left");
    const selectPreviousMonth = () =>
        onMonthChange(currentMonth.subtract(1, "month"), "right");
    // const selectPreviousYear = () =>
    //     onMonthChange(currentMonth.subtract(1, "year"), "right");

    const CustomCalendarHeaderRoot = styled("div")({
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
        alignItems: "center",
    });

    // 현재 달과 다음 달 계산
    const today = dayjs();
    const firstDayOfThisMonth = today.startOf("month");
    const lastDayOfNextMonth = today.add(1, "month").endOf("month");

    return (
        <CustomCalendarHeaderRoot>
            <Stack spacing={1} direction="row">
                {/*<IconButton onClick={selectPreviousYear} title="Previous year">*/}
                {/*    <KeyboardDoubleArrowLeftIcon />*/}
                {/*</IconButton>*/}
                {/*<IconButton*/}
                {/*    onClick={selectPreviousMonth}*/}
                {/*    title="Previous month"*/}
                {/*>*/}
                {/*    <ChevronLeft />*/}
                {/*</IconButton>*/}
                {currentMonth.isAfter(firstDayOfThisMonth) ? (
                    <IconButton
                        onClick={selectPreviousMonth}
                        title="Previous month"
                    >
                        <ChevronLeft />
                    </IconButton>
                ) : (
                    <div style={{ width: 40 }} />
                )}
            </Stack>
            <Typography variant="body2">
                {currentMonth.format("MMMM YYYY")}
            </Typography>
            <Stack spacing={1} direction="row">
                {/*<IconButton onClick={selectNextMonth} title="Next month">*/}
                {/*    <ChevronRight />*/}
                {/*</IconButton>*/}
                {/*<IconButton onClick={selectNextYear} title="Next year">*/}
                {/*    <KeyboardDoubleArrowRightIcon />*/}
                {/*</IconButton>*/}
                {currentMonth.isBefore(lastDayOfNextMonth, "month") ? (
                    <IconButton onClick={selectNextMonth} title="Next month">
                        <ChevronRight />
                    </IconButton>
                ) : (
                    <div style={{ width: 40 }} />
                )}
            </Stack>
        </CustomCalendarHeaderRoot>
    );
};

export default MainContents;
