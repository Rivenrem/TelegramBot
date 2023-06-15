export interface ICallback {
    text: string;
}

export interface ICoordinatesData {
    status: string;
    lat: string;
    lon: string;
}

export interface IPhotoData {
    hits: [
        {
            webformatURL: string;
        },
    ];
}
