import { Moment } from 'moment';
import Breakdown from '../types/Breakdown';
import BaseService from './baseService';

class BreakdownService extends BaseService {

    getBreakdown(start: Moment, end: Moment): Promise<Breakdown> {
        const params = {
            start: start.format("yyyy-MM-DD"),
            end: end.format("yyyy-MM-DD")
        } 
        return this.get<Breakdown>(`/Breakdown`, { params })
    }
}

export default new BreakdownService();