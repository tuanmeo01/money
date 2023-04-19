import React, { FC, ReactElement, useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import ContentTitle from "../../components/ContentTitle/ContentTitle";

const Contacts: FC = (): ReactElement => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentWrapper>
            <ContentTitle icon={<InfoCircleOutlined />} title={"Thông tin liên hệ"} />
            <Row gutter={32}>
                <Col span={12}>
                    <div>
                        <Typography.Text strong>{"Điện thoại: "}</Typography.Text>
                        <Typography.Text>0846696888</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text strong>{"E-mail: "}</Typography.Text>
                        <Typography.Text>ptrangcake@gmail.com</Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Giờ làm việc</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            Chúng tôi mở của từ 8h00 đến 18h00 hàng ngày, không kể cuối tuần. <br />
                            Đơn hàng online chúng tôi nhận 24/24h.
                        </Typography.Text>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Vận chuyển</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text>
                            Chúng tôi sử dụng dịch vụ vận chuyển hoả tốc, tốt nhất hiện nay.
                        </Typography.Text>
                    </div>
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Contacts;
