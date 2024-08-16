import axios from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError, Method } from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "";
const $axios = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 1,
});
