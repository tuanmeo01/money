import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Typography } from "antd";

import { selectPerfumes } from "../../../redux-toolkit/perfumes/perfumes-selector";
import { fetchPerfumesByIds } from "../../../redux-toolkit/perfumes/perfumes-thunks";
import { resetPerfumesState } from "../../../redux-toolkit/perfumes/perfumes-slice";
import PerfumeCardsSliderItem from "./PerfumeCardsSliderItem/PerfumeCardsSliderItem";
import "./PerfumeCardsSlider.css";

export const perfumesIds = [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128];

const PerfumeCardsSlider: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);

    useEffect(() => {
        // GraphQL example
        // dispatch(fetchPerfumesByIdsQuery(perfumesId));
        dispatch(fetchPerfumesByIds(perfumesIds));

        return () => {
            dispatch(resetPerfumesState());
        };
    }, []);

    return (
        <div className={"perfume-cards-slider"}>
            <Typography.Title level={3} className={"perfume-cards-slider-title"}>
                Đề xuất
            </Typography.Title>
            <Carousel autoplay>
                <PerfumeCardsSliderItem perfumes={perfumes.slice(0, 4)} />
                <PerfumeCardsSliderItem perfumes={perfumes.slice(4, 8)} />
                <PerfumeCardsSliderItem perfumes={perfumes.slice(8, 12)} />
            </Carousel>
        </div>
    );
};

export default PerfumeCardsSlider;
