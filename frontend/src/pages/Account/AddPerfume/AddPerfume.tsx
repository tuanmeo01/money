import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addPerfume } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";
import { log } from "console";

type AddPerfumeData = {
    perfumeTitle: string;
    perfumer: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    perfumeGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    price: string;
};

const AddPerfume: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isPerfumeAdded = useSelector(selectIsPerfumeAdded);
    const ispPerfumeLoading = useSelector(selectIsAdminStateLoading);
    const perfumeErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isPerfumeAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Thêm sản phẩm",
                description: "Thành công!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isPerfumeAdded]);

    const onFormSubmit = (data: AddPerfumeData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "perfume",
            new Blob([JSON.stringify({ ...data, perfumeRating: 0 })], { type: "application/json" })
        );
        console.log(bodyFormData);

        dispatch(addPerfume(bodyFormData));
        // log cai body form data nay ma no k ra cgi
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={"Thêm sản phẩm"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Tên sản phẩm"}
                            name={"perfumeTitle"}
                            error={perfumeErrors.perfumeTitleError}
                            placeholder={"Nhập tên sản phẩm"}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={"Ngày sản xuất"}
                            name={"year"}
                            error={perfumeErrors.yearError}
                            placeholder={"Nhập ngày sản xuất"}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={"Kiểu bánh"}
                            name={"type"}
                            error={perfumeErrors.typeError}
                            placeholder={"Nhập kiểu bánh"}
                            disabled={ispPerfumeLoading}
                        />
                        <AddFormInput
                            title={"Loại bánh"}
                            name={"perfumeGender"}
                            error={perfumeErrors.perfumeGenderError}
                            placeholder={"Loại bánh"}
                            disabled={ispPerfumeLoading}
                        />

                        <AddFormInput
                            title={"Giá"}
                            name={"price"}
                            error={perfumeErrors.priceError}
                            placeholder={"Nhập giá"}
                            disabled={ispPerfumeLoading}
                        />
                    </Col>
                    {
                        <Col span={12}>
                            <AddFormInput
                                title={"Brand"}
                                name={"perfumer"}
                                error={perfumeErrors.perfumerError}
                                placeholder={"Enter the brand"}
                                disabled={ispPerfumeLoading}
                            />
                            // button upload ảnh
                            <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </Col>
                    }
                </Row>
                <IconButton title={"Add"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddPerfume;
