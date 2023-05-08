import { Select } from "antd";
import { FC, ReactElement } from "react";
import { SearchPerfume } from "../../types/types";

const searchByData = [
    { label: "Chọn danh mục tìm kiếm", value: SearchPerfume.BRAND },
    { label: "Tên", value: SearchPerfume.PERFUME_TITLE }
    // { label: "Chủ đề", value: SearchPerfume.TYPE }
];

type PropsType = {
    handleChangeSelect: (value: SearchPerfume) => void;
};

const SelectSearchData: FC<PropsType> = ({ handleChangeSelect }): ReactElement => {
    return (
        <Select defaultValue={SearchPerfume.BRAND} onChange={handleChangeSelect} style={{ width: 250 }}>
            {searchByData.map((value, index) => (
                <Select.Option key={index} value={value.value}>
                    {value.label}
                </Select.Option>
            ))}
        </Select>
        // <></>
    );
};

export default SelectSearchData;
