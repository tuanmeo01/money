import React, { FC, ReactElement } from "react";
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

import "./Footer.scss";

const Footer: FC = (): ReactElement => {
    return (
        <div className={"footer-wrapper"}>
            <Row>
                <Col span={12}>
                    <Typography.Title level={3}>Cake shop</Typography.Title>
                    <Typography.Text>0846696888</Typography.Text>
                    <Typography.Text className={"mt-12"}>
                        from 08:00 to 20:00 without breaks and weekends
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <div className={"footer-wrapper-social"}>
                        <Typography.Title level={3}>Social networks</Typography.Title>
                        <a href="">
                            <LinkedinOutlined />
                        </a>
                        <a href="#">
                            <FacebookOutlined />
                        </a>
                        <a href="#">
                            <TwitterOutlined />
                        </a>
                    </div>
                </Col>
            </Row>
            <Row className={"footer-wrapper-copyright"}>
                <Typography.Text>© Copy right 2023</Typography.Text>
            </Row>
        </div>
    );
};

export default Footer;
