import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    // const projects.filter(project => project.title.includes(title))

    const transactionsIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const transactionsOutCome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const sumOfIncome = transactionsIncome.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const sumOfOutcome = transactionsOutCome.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const balance = {
      income: sumOfIncome,
      outcome: sumOfOutcome,
      total: sumOfIncome - sumOfOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
