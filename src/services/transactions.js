const { Transaction } = require('../model');

const addTrans = (ownerId, body) => {
  const result = Transaction.create(ownerId, body);
  return result;
};

const getAllTrans = (
  ownerId,
  { page = 1, limit = 5, sortBy = 'date', transType },
) => {
  const query = transType ? { transType: `${transType}` } : null;

  return Transaction.paginate(
    {
      owner: ownerId,
      query,
    },
    {
      page,
      limit,
      sort: { [`${sortBy}`]: 1 },
      populate: [
        {
          path: 'categoryId',
          select: 'categoryName',
        },
        {
          path: 'owner',
          select: ['name', 'email'],
        },
      ],
    },
  );
};

const getTransById = (ownerId, transId) => {
  const result = Transaction.findOne({
    _id: transId,
    owner: ownerId,
  });
  return result;
};

const updateTransaction = (ownerId, transId, newData) => {
  return Transaction.findByIdAndUpdate(
    { _id: transId, owner: ownerId },
    { ...newData },
    {
      new: true,
    },
  );
};

const deleteTransaction = (ownerId, transId) => {
  return Transaction.findByIdAndDelete({ _id: transId, owner: ownerId });
};

module.exports = {
  addTrans,
  getAllTrans,
  getTransById,
  updateTransaction,
  deleteTransaction,
};