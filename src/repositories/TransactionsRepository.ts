import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const total = 0;

    const balance = transactions.reduce(
      (accumulator, { type, value }) => {
        const isIncome = type === 'income';

        if (isIncome) {
          accumulator.income += Number(value);
          accumulator.total += Number(value);
        } else {
          accumulator.outcome += Number(value);
          accumulator.total -= Number(value);
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;
