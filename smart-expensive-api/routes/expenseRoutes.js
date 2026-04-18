const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const auth = require("../middleware/auth");


// ➜ CREATE (ajouter dépense)
router.post("/", auth, async (req, res) => {
  try {
    const { amount, category } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ msg: "Amount and category required" });
    }

    const expense = new Expense({
      userId: req.user.id,
      amount,
      category,
    });

    await expense.save();

    res.status(201).json(expense);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ➜ READ (toutes les dépenses du user)
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense
      .find({ userId: req.user.id })
      .sort({ date: -1 });

    res.json(expenses);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//==> GET by id 

router.get("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➜ UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    res.json(expense);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// ➜ DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    res.json({ msg: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;