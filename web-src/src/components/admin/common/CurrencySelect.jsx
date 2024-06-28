import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { countryBankAtom } from "etc/lib/recoils/atoms";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const CurrencySelect = (props) => {
    const onChange = props.onChange;
    const defaultValue = props.defaultValue ?? "";
    const mode = props.mode;

    const countryBank = useRecoilValue(countryBankAtom);

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        setCurrenciesFunc();
    }, [defaultValue]);

    const setCurrenciesFunc = () => {
        let options = [];
        // const currency = countryBank.filter(
        //     (e) => e.code_type === "CURRENCY_TYPE",
        // );
        const currency = countryBank["CURRENCY_TYPE"]

        for (let i = 0; i < currency.length; i++) {
            const value = currency[i].code_key;
            const currencyCode = currency[i].code_key.split("-")[1];
            let newObj = {};
            if (mode === "full") {
                newObj = {
                    value: value,
                    label: `${currencyCode}-${currency[i].code_value_ko} (${currency[i].code_value_en}) (+${value})`,
                    currencyCode: currencyCode,
                };
            } else if (mode === "en") {
                newObj = {
                    value: value,
                    label: `${currencyCode}-${currency[i].code_value_en} (+${value})`,
                    currencyCode: currencyCode,
                };
            } else if (mode === "ko") {
                newObj = {
                    value: value,
                    label: `${currencyCode}-${currency[i].code_value_ko} (+${value})`,
                    currencyCode: currencyCode,
                };
            } else {
                newObj = {
                    value: value,
                    label: `${currencyCode}-${currency[i].code_value_ko} (${currency[i].code_value_en})`,
                    currencyCode: currencyCode,
                };
            }

            options.push(newObj);
        }

        setCurrencies(options);
    };
    return (
        <>
            {currencies.length !== 0 && (
                <Autocomplete
                    id="country-select-demo"
                    // sx={{ width: 300 }}
                    size="small"
                    options={currencies}
                    value={
                        defaultValue
                            ? currencies.filter(
                                  (el) => el.value === defaultValue,
                              )[0]
                            : null
                    }
                    isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                    }
                    // disableCloseOnSelect
                    // autoHighlight
                    getOptionLabel={(option) => option.label}
                    onChange={(e, newValue) =>
                        onChange(e, newValue ? newValue.value : "")
                    }
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                        >
                            <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.currencyCode.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.currencyCode.toLowerCase()}.png`}
                                alt=""
                            />
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <>
                            <TextField
                                {...params}
                                // label="Choose a country"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                placeholder="통화 코드를 선택해주세요"
                            />
                        </>
                    )}
                />
            )}
        </>
    );
};

export default CurrencySelect;
