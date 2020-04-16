import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomesValue = incomes.reduce(
      (prev, current) => prev + current.value,
      0,
    );
    const outcomesValue = outcomes.reduce(
      (prev, current) => prev + current.value,
      0,
    );
    const balance = {
      income: incomesValue,
      outcome: outcomesValue,
      total: incomesValue - outcomesValue,
    };
    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
