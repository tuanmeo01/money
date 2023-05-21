import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Upload, notification } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RequestService from "../../../utils/request-service";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import IconButton from "../../../components/IconButton/IconButton";
import { ADMIN_EDIT } from "../../../constants/urlConstants";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsPerfumeEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { selectPerfume } from "../../../redux-toolkit/perfume/perfume-selector";
import { fetchPerfume } from "../../../redux-toolkit/perfume/perfume-thunks";
import { EditProduct, LoadingStatus } from "../../../types/types";
import "./EditPerfume.css";

type EditPerfumeData = {
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

const EditPerfume: FC = (): ReactElement => {
    const [product, setProduct] = useState<EditProduct>({
        perfumeTitle: "",
        year: "",
        country: "",
        type: "",
        perfumeGender: "",
        price: "",
        file: "",
        id: ""
    });
    const [image, setImage] = useState<File | null>(null);

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const perfumeData = useSelector(selectPerfume);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isPerfumeEdited = useSelector(selectIsPerfumeEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchPerfume(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (perfumeData) {
            form.setFieldsValue(perfumeData);
        }
    }, [perfumeData]);

    useEffect(() => {
        if (isPerfumeEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Perfume edited",
                description: "Perfume successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isPerfumeEdited]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    const onFormSubmit = async (data: EditPerfumeData): Promise<void> => {
        const formData = new FormData();
        formData.append("perfumeTitle", product.perfumeTitle);
        formData.append("country", product.country);
        formData.append("type", product.type);
        formData.append("perfumeGender", product.perfumeGender);
        formData.append("price", product.price);
        formData.append("id", params.id);

        if (image) {
            formData.append("file", image, image.name);
        }
        console.log(formData);
        try {
            const response = await RequestService.post(ADMIN_EDIT, formData, true, "multipart/form-data");
            if (response) {
                window.scrollTo(0, 0);
                notification.success({
                    message: "sửa sản phẩm",
                    description: "Thành công!"
                });
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }

        // Reset form fields and image state
        setProduct({
            perfumeTitle: "",
            year: "",
            country: "",
            type: "",
            perfumeGender: "",
            price: "",
            file: "",
            id: ""
        });
        setImage(null);
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"Chỉnh sửa sản phẩm"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <div className="form-group">
                            <label htmlFor="perfumeTitle" className="form-label">
                                Tên bánh
                            </label>
                            <input
                                type="text"
                                id="perfumeTitle"
                                name="perfumeTitle"
                                value={perfumeData.perfumeTitle}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price" className="form-label">
                                Giá
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={perfumeData.price}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type" className="form-label">
                                Chủ đề
                            </label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={perfumeData.type}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="perfumeGender" className="form-label">
                                Mô tả
                            </label>
                            <input
                                type="text"
                                id="perfumeGender"
                                name="perfumeGender"
                                value={perfumeData.perfumeGender}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country" className="form-label">
                                Loại bánh
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={perfumeData.country}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image" className="form-label">
                                Hình ảnh:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="form-input"
                            />
                        </div>
                        <div className={"edit-perfume-image-wrapper"}>
                            <img
                                className={"edit-perfume-image"}
                                src={perfumeData.filename}
                                alt={perfumeData.perfumeTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"Lưu"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditPerfume;
