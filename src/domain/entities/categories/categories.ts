import type { ICategories } from './categories.interface';

export class Categories implements ICategories {
    public static instance: Categories;
    public categories: string[];

    private constructor() {}

    public static getInstance(): Categories {
        if (!Categories.instance) {
            Categories.instance = new Categories();
        }
        return Categories.instance;
    }

    addCategoria(newCategoria: string): void{
        if (!this.categories.includes(newCategoria)) {
            this.categories.push(newCategoria);
          }
        }
      
    getCategories(): string[] {
        return this.categories;
    }
}
