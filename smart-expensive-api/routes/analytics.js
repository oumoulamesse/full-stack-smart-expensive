const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// 📊 GET ANALYTICS
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await Expense.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = data.map(item => ({
      name: months[item._id - 1],
      amount: item.total
    }));

    res.json(formatted);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;