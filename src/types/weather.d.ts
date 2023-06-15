export interface IWeatherData {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        temp_f: number;
        condition: {
            text: string;
            icon: string;
        };
        uv: number;
    };
}
