import { Schema, model } from 'mongoose';

import type { ICategories } from './categories.interface';

const CategoriesSchema = new Schema ({
    categories: {required: true, type: [String]}
});

const CategoriesModel = model<ICategories>('Categories', CategoriesSchema);

export { CategoriesModel };