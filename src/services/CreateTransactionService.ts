import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (typeof value !== 'number')
      throw Error('Value field should be a number!');

    if (type !== 'income' && type !== 'outcome')
      throw Error('Type field should be "income" or "outcome" ');

    const balanceTotal = this.transactionsRepository.getBalance().total;

    if (type === 'outcome' && value > balanceTotal)
      throw Error('You should not spend more than you have');
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
