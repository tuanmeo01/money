import { PerfumePrice } from "../../types/types";

export const perfumeTitle: Array<{ name: string }> = [
    { name: "Cake1" },
    { name: "Cake2" },
    { name: "Cake3" },
    { name: "Cake4" },
    { name: "Cake5" }
];

export const gender: Array<{ name: string }> = [{ name: "Kem" }, { name: "Xốp" }];

export const price: Array<PerfumePrice> = [
    { id: 1, name: "Tất cả", array: [1, 9999] },
    { id: 2, name: "100.000đ - 200.000đ", array: [100, 200] },
    { id: 3, name: "200.000đ - 300.000đ", array: [200, 300] },
    { id: 4, name: "300.000đ - 400.000đ", array: [300, 400] },
    { id: 5, name: "400.000đ- 500.000+đ", array: [400, 500] }
];
