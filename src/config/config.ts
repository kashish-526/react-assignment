export type Environment = "development" | "staging" | "production";

export interface IConfig {
    apiUrl: string;
    environment: Environment;
}

const config: IConfig = {
    apiUrl: import.meta.env.VITE_API_DATA_BASEURL || "",
    environment: (import.meta.env.VITE_ENV as Environment) || "development"
};

export default config;
