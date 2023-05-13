import { PlusSquareOutlined } from "@ant-design/icons";
import React, { FC, ReactElement, useState } from "react";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import { ADMIN_ADD } from "../../../constants/urlConstants";
import { AddProduct } from "../../../types/types";
import RequestService from "../../../utils/request-service";
import { notification } from "antd";
import "./index.css";
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
    file: string;
};

const AddPerfume: FC = (): ReactElement => {
    const [product, setProduct] = useState<AddProduct>({
        perfumeTitle: "",
        year: "",
        country: "",
        type: "",
        perfumeGender: "",
        price: "",
        file: ""
    });
    const [image, setImage] = useState<File | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("perfumeTitle", product.perfumeTitle);
        formData.append("country", product.country);
        formData.append("type", product.type);
        formData.append("perfumeGender", product.perfumeGender);
        formData.append("price", product.price);
        if (image) {
            formData.append("file", image, image.name);
        }
        console.log(formData);
        try {
            const response = await RequestService.post(ADMIN_ADD, formData, true, "multipart/form-data");
            console.log(response.data.filename);
            if (response) {
                window.scrollTo(0, 0);
                notification.success({
                    message: "Thêm sản phẩm",
                    description: "Thành công!"
                });
            }
            return response.data;
        } catch (error) {}

        // Reset form fields and image state
        setProduct({
            perfumeTitle: "",
            year: "",
            country: "",
            type: "",
            perfumeGender: "",
            price: "",
            file: ""
        });
        setImage(null);
    };

    return (
        <>
            <ContentTitle title={"Thêm sản phẩm"} titleLevel={4} icon={<PlusSquareOutlined />} />

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="perfumeTitle" className="form-label">
                        Tên bánh
                    </label>
                    <input
                        type="text"
                        id="perfumeTitle"
                        name="perfumeTitle"
                        value={product.perfumeTitle}
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
                        value={product.price}
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
                        value={product.type}
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
                        value={product.perfumeGender}
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
                        value={product.country}
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

                <button type="submit" className="form-button">
                    Lưu
                </button>
            </form>
        </>
    );
};

export default AddPerfume;
