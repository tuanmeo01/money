import { Col, Layout, Pagination, RadioChangeEvent, Row, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import InputSearch from "../../components/InputSearch/InputSearch";
import PerfumeCardNoDelete from "../../components/PerfumeCard/PerfumerCardNoDelete";
import SelectSearchData from "../../components/SelectSearchData/SelectSearchData";
import Spinner from "../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";
import { useSearch } from "../../hooks/useSearch";
import { selectIsPerfumesLoading, selectPerfumes } from "../../redux-toolkit/perfumes/perfumes-selector";
import { resetPerfumesState } from "../../redux-toolkit/perfumes/perfumes-slice";
import { fetchPerfumesByFilterParams, fetchPerfumesByInputText } from "../../redux-toolkit/perfumes/perfumes-thunks";
import { FilterParamsType } from "../../types/types";
import "./Menu.css";
import { price } from "./MenuData";
import MenuRadioSection from "./MenuSection/MenuRadioSection";
import MenuSorter from "./MenuSorter/MenuSorter";

export enum CheckboxCategoryFilter {
    PERFUMERS = "PERFUMERS",
    GENDERS = "GENDERS",
    PERFUMETITLE = "PERFUMETITLE"
}

const Menu: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectPerfumes);
    const isPerfumesLoading = useSelector(selectIsPerfumesLoading);
    const location = useLocation<{ id: string }>();
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        perfumers: [],
        perfumeTitle: [],
        genders: [],
        prices: [1, 999],
        type: []
    });
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const perfumeData = location.state.id;

        if (perfumeData === "female" || perfumeData === "male") {
            dispatch(
                fetchPerfumesByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, perfumeData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, perfumeData] }));
        } else if (perfumeData === "all") {
            dispatch(fetchPerfumesByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchPerfumesByFilterParams({
                    ...filterParams,
                    perfumeTitle: [...filterParams.perfumeTitle, perfumeData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({
                ...prevState,
                perfumeTitle: [...prevState.perfumeTitle, perfumeData]
            }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetPerfumesState());
        };
    }, []);

    useEffect(() => {
        resetPagination();
    }, [filterParams, sortByPrice]);

    const onChangeCheckbox = (checkedValues: CheckboxValueType[], category: CheckboxCategoryFilter): void => {
        if (CheckboxCategoryFilter.PERFUMERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, perfumeTitle: [...(checkedValues as string[])] };
                dispatch(fetchPerfumesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        } else if (CheckboxCategoryFilter.GENDERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, genders: [...(checkedValues as string[])] };
                dispatch(fetchPerfumesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        }

        resetFields();
    };

    const onChangeRadio = (event: RadioChangeEvent): void => {
        setFilterParams((prevState) => {
            const filter = { ...prevState, prices: event.target.value };
            dispatch(fetchPerfumesByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
            return filter;
        });
        resetFields();
    };

    const handleChangeSortPrice = (event: RadioChangeEvent): void => {
        dispatch(fetchPerfumesByFilterParams({ ...filterParams, sortByPrice: event.target.value, currentPage: 0 }));
        setSortByPrice(event.target.value);
        resetFields();
    };

    const changePagination = (page: number, pageSize: number): void => {
        if (searchValue) {
            dispatch(
                fetchPerfumesByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchPerfumesByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1 }));
        }
        handleChangePagination(page, pageSize);
    };

    return (
        <Layout>
            <Layout.Content className={"login-content"}>
                <Typography.Title level={2}>Cakes</Typography.Title>
                <Row gutter={32}>
                    <Col span={6}>
                        {/* <MenuCheckboxSection
                            title={"Chủ đề"}
                            onChange={onChangeCheckbox}
                            data={perfumeTitle}
                            category={CheckboxCategoryFilter.PERFUMERS}
                            selectedValues={filterParams.perfumeTitle}
                        /> */}

                        {/* <MenuCheckboxSection
                            title={"Loại bánh"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                            selectedValues={filterParams.genders}
                        /> */}
                        <MenuRadioSection title={"Giá"} onChange={onChangeRadio} data={price} />
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={9}>
                                <SelectSearchData handleChangeSelect={handleChangeSelect} />
                            </Col>
                            <Col span={10}>
                                <InputSearch onSearch={onSearch} form={form} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Col span={16}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Col>
                            <Col span={8}>
                                <MenuSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
                            </Col>
                        </Row>
                        <Row gutter={[32, 32]}>
                            {isPerfumesLoading ? (
                                <Spinner />
                            ) : (
                                perfumes.map((perfume) => (
                                    <PerfumeCardNoDelete key={perfume.id} perfume={perfume} colSpan={8} />
                                ))
                            )}
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Pagination
                                current={currentPage}
                                pageSize={MAX_PAGE_VALUE}
                                total={totalElements}
                                showSizeChanger={false}
                                onChange={changePagination}
                            />
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu;
