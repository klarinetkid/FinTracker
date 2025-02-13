import TransactionCategory from '../types/TransactionCategory';
import BaseService from './baseService';

class CategoryService extends BaseService {

    getCategories(): Promise<TransactionCategory[]> {
        return this.get<TransactionCategory[]>("/Category/List")
    }

}

export default new CategoryService();