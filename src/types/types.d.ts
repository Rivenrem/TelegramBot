export interface ICallback {
    text: string;
}

export interface ISuggestion {
    xid: string;

    name: string;

    rate: string;

    preview?: {
        source: string;
    };

    wikipedia_extracts?: {
        title: string;
        text: string;
    };

    point: {
        lon: number;
        lat: number;
    };

    otm: string;
}
