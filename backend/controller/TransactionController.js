import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import Fund from "../models/fund.js";

export const newTransaction = async (req, res) => {
  const tData = req.body;
  if (!tData.fundId || !tData.donorId) {
    return res.json({
      success: false,
      message: "Campaign ID and Donor ID may missing.",
    });
  }
  try {
    const fund = await Fund.findById(tData.fundId).populate("organizer");
    const donor = await User.findById(tData.donorId);
    if (!fund) {
      return res.json({ success: false, message: "Campaign not found!" });
    }
    if (!donor) {
      return res.json({ success: false, message: "Donor not found!" });
    }
    const organizer = await User.findById(fund.organizer._id);
    if (!organizer) {
      return res.json({
        success: true,
        message: "Server error, try again later!",
      });
    }
    const transaction = new Transaction({ ...tData });
    transaction.fund = fund._id;
    transaction.donor = donor._id;
    transaction.organizer = organizer._id;
    fund.currentAmount += tData.amount;
    fund.donors.push(donor._id);
    donor.transaction.push(transaction._id);
    donor.totalDonated += tData.amount;
    donor.supported.push(fund._id);
    organizer.totalRaised += tData.amount;
    organizer.transaction.push(transaction._id);

    await transaction.save();
    await fund.save();
    const dNotify = {
      type: "donation",
      title: "Donation Successful",
      message: `You donated ₹${tData.amount} to the campaign "${fund.title}"`,
      icon: "CheckCircle",
      color: "from-emerald-500 to-green-600",
      actionUrl: "/transactions",
    };
    donor.notifications.push(dNotify);
    await donor.save();
    const oNotify = {
      type: "donation",
      title: "New donation received",
      message: `${donor.name} donated ₹${tData.amount} to your campaign "${fund.title}"`,
      icon: "IndianRupee",
      color: "from-green-500 to-emerald-600",
      actionUrl: "/raiser/donations",
    };
    organizer.notifications.push(oNotify);
    await organizer.save();
    return res.status(201).json({
      success: true,
      message: "Transaction completed successfully.",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: err.message,
    });
  }
};

export const transactionInfo = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.json({ success: false, message: "UserId missing!" });
  try {
    const donorTransactions = await Transaction.find({ donor: id })
      .populate("donor")
      .populate("organizer")
      .populate("fund");
    const recieveTransactions = await Transaction.find({ organizer: id })
      .populate("donor")
      .populate("organizer")
      .populate("fund");
    if (!donorTransactions && !recieveTransactions) {
      return res.status(404).json({ message: "No transactions found." });
    }
    res
      .status(200)
      .json({ success: true, donorTransactions, recieveTransactions });
  } catch (err) {
    console.error("Transaction Info Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching transactions.",
      error: err.message,
    });
  }
};

export const sentThank = async (req, res) => {
  const { tId } = req.body;
  if (!tId) {
    return res.json({ success: false, message: "Missing Information" });
  }
  try {
    const txn = await Transaction.findById(tId);
    if (!txn) return res.json({ success: false, message: "Invalid Data" });
    const dId = txn.donor;
    const oId = txn.organizer;
    const donor = await User.findById(dId);
    const organizer = await User.findById(oId);

    txn.thanked = true;
    const dNotify = {
      type: "campaign",
      title: `New message from ${organizer.name} `,
      message: `We would love to say thanks for you donation in our campaigns`,
      icon: "Heart",
      color: "from-pink-500 to-rose-600",
      actionUrl: `/fund/${txn.fund}`,
    };
    const oNotify = {
      type: "donation",
      title: `Thank you message sent`,
      message: `You sent a thank you message to ${donor.name} for their donation.`,
      icon: "Heart",
      color: "from-pink-500 to-rose-600",
      actionUrl: `/raiser/donations`,
    };
    donor.notifications.push(dNotify);
    organizer.notifications.push(oNotify);
    await donor.save();
    await organizer.save();
    await txn.save();
    return res.json({success: true});
  } catch (err) {
    console.error("Transaction Info Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching transactions.",
      error: err.message,
    });
  }
};
