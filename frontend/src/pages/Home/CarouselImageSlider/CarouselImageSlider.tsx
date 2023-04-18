import React, { FC, ReactElement } from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../../constants/routeConstants";
import "./CarouselImageSlider.css";

export const sliderItems = [
    {
        id: "117",
        name: "Photo 1",
        url: "https://media.istockphoto.com/id/1443328378/vi/anh/m%C3%B3n-tr%C3%A1ng-mi%E1%BB%87ng-ng%E1%BB%8Dt-ng%C3%A0o-nhi%E1%BB%81u-mi%E1%BA%BFng-b%C3%A1nh-b%C3%A1nh-n%C6%B0%E1%BB%9Bng-x%E1%BB%91p-v%C3%A0-b%C3%A1nh-quy-tr%C3%AAn-b%E1%BA%A3ng-g%E1%BB%97.jpg?s=1024x1024&w=is&k=20&c=AfWNGeu2KGIz8n3DEAO3r67FQ7yKmDdklEqIdFhpYx4="
    },
    {
        id: "118",
        name: "Photo 2",
        url: "https://media.istockphoto.com/id/1443328378/vi/anh/m%C3%B3n-tr%C3%A1ng-mi%E1%BB%87ng-ng%E1%BB%8Dt-ng%C3%A0o-nhi%E1%BB%81u-mi%E1%BA%BFng-b%C3%A1nh-b%C3%A1nh-n%C6%B0%E1%BB%9Bng-x%E1%BB%91p-v%C3%A0-b%C3%A1nh-quy-tr%C3%AAn-b%E1%BA%A3ng-g%E1%BB%97.jpg?s=612x612&w=0&k=20&c=3YaWHohIIkJR2f2lCtZiwekzps9H-b24yM4ZnHiQWjA="
    }
];

const CarouselImageSlider: FC = (): ReactElement => {
    return (
        <Carousel autoplay>
            {sliderItems.map((item) => (
                <div key={item.id} className={"carousel-item-wrapper"}>
                    <Link to={`${PRODUCT}/${item.id}`} className={"carousel-link"} />
                    <img src={item.url} alt={item.name} style={{ width: "100%" }} />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselImageSlider;
