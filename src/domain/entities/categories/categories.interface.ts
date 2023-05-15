export interface ICategories {
    categories: string[];

    addCategoria: (newCategoria: string) => void;
    getCategories: () => string[];
}