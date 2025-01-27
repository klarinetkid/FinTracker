
import TransactionCategory from './TransactionCategory';

type CategoryTotal = {
    total: number, // TODO: int? float?
    percentOfIncome: number, // TODO: int? float?
    //date: Date // don't know if needed
    category: TransactionCategory | null
}

export default CategoryTotal;

/*
    public int Total { get; set; }
    public float PercentOfIncome { get; set; }
    public DateTime Date { get; set; }
    public TblCategory? Category { get; set; }
*/