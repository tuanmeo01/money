import { PerfumePrice } from "../../types/types";

export const perfumer: Array<{ name: string }> = [
    { name: "Cake1" },
    { name: "Cake2" },
    { name: "Cake3" },
    { name: "Cake4" },
    { name: "Cake5" }
];

export const gender: Array<{ name: string }> = [{ name: "male" }, { name: "female" }];

export const price: Array<PerfumePrice> = [
    { id: 1, name: "any", array: [1, 9999] },
    { id: 2, name: "15 - 25 $", array: [15, 25] },
    { id: 3, name: "25 - 40 $", array: [25, 40] },
    { id: 4, name: "40 - 90 $", array: [40, 90] },
    { id: 5, name: "90 - 175+ $", array: [90, 250] }
];
