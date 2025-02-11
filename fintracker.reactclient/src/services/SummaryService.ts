import Summary from '../types/Summary';
import BaseService from './baseService';

class SummaryService extends BaseService {

    getAvailableYears(): Promise<number[]> {
        return this.get<number[]>('/Summary/GetAvailableYears')
    }

    getYearSummaries(year: number): Promise<Summary[]> {
        return this.get<Summary[]>(`/Summary/GetYear?year=${year}`)
    }
}

export default new SummaryService();