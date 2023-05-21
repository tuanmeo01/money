import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    AuthErrors,
    ReviewError,
    ReviewRequest,
    UserResponse,
    UserEditErrors,
    UserEditRequest,
    UserResetPasswordRequest
} from "../../types/types";
import RequestService from "../../utils/request-service";
import {
    AUTH_EDIT_PASSWORD,
    USERS_EDIT,
    USERS_GRAPHQL_INFO,
    USERS_INFO,
    USERS_REVIEW
} from "../../constants/urlConstants";
import { userByQuery } from "../../utils/graphql-query/users-query";
import { notification } from "antd";

export const fetchUserInfo = createAsyncThunk<UserResponse>("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS_INFO, true);
    return response.data;
});

export const updateUserInfo = createAsyncThunk<UserResponse, UserEditRequest, { rejectValue: UserEditErrors }>(
    "user/updateUserInfo",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(USERS_EDIT, request, true);
            window.scrollTo(0, 0);
            notification.success({
                message: "Thành công!",
                description: "Cập nhật thông tin"
            });
            return response.data;
        } catch (error) {
            notification.error({
                message: "Lỗi!",
                description: "Cập nhật thông tin"
            });
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const updateUserPassword = createAsyncThunk<string, UserResetPasswordRequest, { rejectValue: AuthErrors }>(
    "user/updateUserPassword",
    async (request, thunkApi) => {
        try {
            const response = await RequestService.put(AUTH_EDIT_PASSWORD, request, true);
            alert("Sửa thành công!");

            return response.data;
        } catch (error) {
            alert(error);

            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const addReviewToPerfume = createAsyncThunk<{}, ReviewRequest, { rejectValue: ReviewError }>(
    "user/addReviewToPerfume",
    async (request, thunkApi) => {
        try {
            alert("Thêm thành công!");

            return await RequestService.post(USERS_REVIEW, request);
        } catch (error) {
            alert(error);
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

// GraphQL query
export const fetchUserInfoByQuery = createAsyncThunk<UserResponse, string>(
    "user/fetchUserInfoByQuery",
    async (userId) => {
        const response = await RequestService.post(USERS_GRAPHQL_INFO, { query: userByQuery(userId) }, true);
        return response.data.data.user;
    }
);
