
import TransactionCategory from './TransactionCategory';

type CategoryTotal = {
    total: number,
    percentOfIncome: number,
    category: TransactionCategory | null
}

export default CategoryTotal;

/*
    public int Total { get; set; }
    public float PercentOfIncome { get; set; }
    public DateTime Date { get; set; }
    public TblCategory? Category { get; set; }
*/