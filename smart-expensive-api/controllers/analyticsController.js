// controllers/analyticsController.js

import Expense from "../models/Expense.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatted = data.map(item => ({
      name: months[item._id - 1],
      amount: item.total
    }));

    res.json(formatted);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};