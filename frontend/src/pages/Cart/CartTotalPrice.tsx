import React, { FC, ReactElement } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { selectTotalPrice } from "../../redux-toolkit/cart/cart-selector";

const CartTotalPrice: FC = (): ReactElement => {
    const totalPrice = useSelector(selectTotalPrice);

    return <Typography.Title level={3}>Tổng tiền {totalPrice}.000 vnđ</Typography.Title>;
};

export default CartTotalPrice;
