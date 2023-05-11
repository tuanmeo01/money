import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Table } from "antd";
import { InfoCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

import {
    selectIsOrderLoaded,
    selectIsOrderLoading,
    selectOrder,
    selectOrderItems
} from "../../../redux-toolkit/order/order-selector";
import { fetchOrderById, fetchOrderItemsByOrderId } from "../../../redux-toolkit/order/order-thunks";
import { resetOrderState } from "../../../redux-toolkit/order/order-slice";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import Spinner from "../../../components/Spinner/Spinner";
import AccountDataItem from "../../../components/AccountDataItem/AccountDataItem";
import { OrderItemResponse } from "../../../types/types";
import "./ManageUserOrder.css";

const ManageUserOrder: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const order = useSelector(selectOrder);
    const orderItems = useSelector(selectOrderItems);
    const isOrderLoading = useSelector(selectIsOrderLoading);
    const isOrderLoaded = useSelector(selectIsOrderLoaded);
    const { id, email, firstName, lastName, totalPrice, postIndex, phoneNumber, date, city, address } = order;

    useEffect(() => {
        dispatch(fetchOrderById(params.id));

        return () => {
            dispatch(resetOrderState());
        };
    }, []);

    useEffect(() => {
        if (isOrderLoaded) {
            dispatch(fetchOrderItemsByOrderId(params.id));
        }
    }, [isOrderLoaded]);

    return (
        <>
            {isOrderLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <ContentTitle title={`Đơn hàng #${id}`} titleLevel={4} icon={<ShoppingOutlined />} />
                    </div>
                    <Row>
                        <Col span={24}>
                            <Card>
                                <Row gutter={32}>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Thông tin khách hàng"} titleLevel={5} />
                                        <AccountDataItem title={"Tên"} text={firstName} />
                                        <AccountDataItem title={"Họ"} text={lastName} />
                                        <AccountDataItem title={"Thành phố"} text={city} />
                                        <AccountDataItem title={"Địa chỉ"} text={address} />
                                        <AccountDataItem title={"Email"} text={email} />
                                        <AccountDataItem title={"Số điện thoại"} text={phoneNumber} />
                                        {/* <AccountDataItem title={"Post index"} text={postIndex} /> */}
                                    </Col>
                                    <Col span={12}>
                                        <InfoCircleOutlined className={"manage-user-icon"} />
                                        <ContentTitle title={"Thông tin đơn hàng"} titleLevel={5} />
                                        <AccountDataItem title={"ID đơn hàng"} text={id} />
                                        <AccountDataItem title={"Ngày"} text={date} />
                                        <ContentTitle title={`Order summary: ${totalPrice}.0 `} titleLevel={4} />
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 16 }}>
                                    <Col span={24}>
                                        <Table
                                            rowKey={"id"}
                                            pagination={false}
                                            dataSource={orderItems}
                                            columns={[
                                                {
                                                    title: "ID",
                                                    dataIndex: "id",
                                                    key: "id"
                                                },
                                                // {
                                                //     title: "Perfume Brand",
                                                //     dataIndex: "perfumer",
                                                //     key: "perfumer",
                                                //     render: (_, order: OrderItemResponse) => order.perfume.perfumer
                                                // },
                                                {
                                                    title: "Tên sản phẩm",
                                                    dataIndex: "perfumeTitle",
                                                    key: "perfumeTitle",
                                                    render: (_, order: OrderItemResponse) => order.perfume.perfumeTitle
                                                },
                                                {
                                                    title: "Số lượng",
                                                    dataIndex: "quantity",
                                                    key: "quantity"
                                                },
                                                {
                                                    title: "Giá",
                                                    dataIndex: "price",
                                                    key: "price",
                                                    render: (_, order: OrderItemResponse) => `${order.perfume.price}.0 `
                                                },
                                                {
                                                    title: "Tổng cộng",
                                                    dataIndex: "amount",
                                                    key: "amount",
                                                    render: (_, order: OrderItemResponse) => `${order.amount}.0 `
                                                }
                                            ]}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ManageUserOrder;
