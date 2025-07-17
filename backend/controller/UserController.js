import User from "../models/user.js";
import Fund from "../models/fund.js";

export const addFav = async (req, res) => {
  const { userId, campaignId } = req.body;
  if (!userId || !campaignId)
    return res.json({
      success: false,
      message: "User ID and Campaign ID are required.",
    });
  const user = await User.findById(userId);
  const campaign = await Fund.findById(campaignId);
  if (!user) {
    return res.json({ success: false, message: "Invalid User!" });
  }
  if (!campaign) {
    return res.json({ success: false, message: "Invalid Campaign!" });
  }
  if (user.favorites.some((favId) => favId.toString() === campaignId)) {
    return res.json({ success: false, message: "Already in favourites" });
  }
  user.favorites.push(campaign);
  user.save();
  res.json({success: true, user });
};

export const removeFav = async (req, res) => {
  const { userId, campaignId } = req.body;
  if (!userId || !campaignId)
    return res.json({
      success: false,
      message: "User ID and Campaign ID are required.",
    });
  const user = await User.findById(userId);
  const campaign = await Fund.findById(campaignId);
  if (!user) {
    return res.json({ success: false, message: "Invalid User!" });
  }
  if (!campaign) {
    returnres.json({ success: false, message: "Invalid Campaign!" });
  }
  user.favorites.pull(campaignId);
  await user.save();

  res.json({success: true, user });
};
