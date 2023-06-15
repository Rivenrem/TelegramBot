export interface ISuggestion {
    data: [
        {
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
                lon: string;
                lat: string;
            };

            otm: string;
        },
    ];
}

export interface IPlace {
    name: string;
    rate: string;
    wikipedia_extracts: {
        title: string;
        text: string;
    };
    otm: string;
    point: {
        lat: number;
        lon: number;
    };
    preview: {
        source: string;
    };
}

export interface ISuggestionLimitData {
    count: number;
}
