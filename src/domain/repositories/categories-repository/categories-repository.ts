import { Categories } from "~/domain/entities";

export class CategoriesRepository implements ICategories {
  
    private constructor() {}
  
    public static getInstance(): Promise<IReview> {
      if (!Categories.instance) {
        Categories.instance = new CategoriesRepository();
      }
      return CategoriesRepository.instance;
    }
  
    public async addCategoria(categoria: string): Promise<void> {
      if (!this.categories.includes(categoria)) {
        this.categories.push(categoria);
      }
    }
  
    public async getCategories(): Promise<string[]> {
      return this.categories;
    }
  }
  