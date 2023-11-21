export declare const fetchData: (url: string) => Promise<{
    colorTags: string;
    carTypeTag: string;
    carBrandTag: string;
} | undefined>;
interface Data {
    name: string;
    confidence: number;
}
export declare const filterDataFromImage: (data: Data[]) => Promise<{
    colorTags: string;
    carTypeTag: string;
    carBrandTag: string;
} | undefined>;
interface CarModelType {
    image: string;
    brand: string;
    color: string;
    price: number;
    type: string;
}
interface Tags {
    colorTags?: string | undefined;
    carTypeTag?: string | undefined;
    carBrandTag?: string | undefined;
}
export declare const fetchSimilarCars: (tags: Tags) => Promise<CarModelType[]>;
export {};
