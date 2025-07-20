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
  const nData = {
    type: "system",
    title: "Campaign added to favorites",
    message: `You added "${campaign.title}" campaign to your favorites`,
    icon: "Heart",
    color: "from-pink-500 to-rose-600",
    actionUrl: `/fund/${campaign._id}`,
  };
  user.notifications.push(nData);
  user.favorites.push(campaign);
  await user.save();
  res.json({ success: true, user });
};

export const removeFav = async (req, res) => {
  const { userId, campaignId } = req.body;
  if (!userId || !campaignId)
    return res.json({
      success: false,
      message: "User ID and Campaign ID are required.",
    });
  try {
    const user = await User.findById(userId);
    const campaign = await Fund.findById(campaignId);
    if (!user) {
      return res.json({ success: false, message: "Invalid User!" });
    }
    if (!campaign) {
      returnres.json({ success: false, message: "Invalid Campaign!" });
    }
    const nData = {
      type: "system",
      title: "Campaign removed from favorites",
      message: `You removed "${campaign.title}" campaign from your favorites`,
      icon: "HeartOff",
      color: "from-gray-500 to-gray-700",
      actionUrl: `/fund/${campaign._id}`,
    };
    user.notifications.push(nData);
    user.favorites.pull(campaignId);
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const read = async (req, res) => {
  const { uId, nId } = req.body;
  if (!uId || !nId)
    return res.json({ success: false, message: "Missing Information." });
  try {
    const user = await User.findById(uId);
    if (!user) return res.json({ success: false, message: "Invalid User" });
    const notify = user.notifications.find((n) => n._id == nId);
    notify.read = true;
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
export const unRead = async (req, res) => {
  const { uId, nId } = req.body;
  if (!uId || !nId)
    return res.json({ success: false, message: "Missing Information." });
  try {
    const user = await User.findById(uId);
    if (!user) return res.json({ success: false, message: "Invalid User" });
    const notify = user.notifications.id(nId);
    notify.read = false;
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
export const dNotify = async (req, res) => {
  const { uId, nId } = req.body;
  if (!uId || !nId)
    return res.json({ success: false, message: "Missing Information." });
  try {
    const user = await User.findById(uId);
    if (!user) return res.json({ success: false, message: "Invalid User" });
    const prev = user.notifications.length;
    const notify = user.notifications.remove(nId);
    if (notify.length < prev) {
      await user.save();
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Notification not found" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};


export const readAll = async (req, res) => {
  const { uId} = req.body;
  if (!uId)
    return res.json({ success: false, message: "Missing Information." });
  try {
    const user = await User.findById(uId);
    if (!user) return res.json({ success: false, message: "Invalid User" });
    const notify = user.notifications;
    if (notify.length>0) {
      notify.forEach((notification) => {notification.read=true});
      await user.save();
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Notification not found" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const dNotifyAll = async (req, res) => {
  const { uId} = req.body;
  if (!uId)
    return res.json({ success: false, message: "Missing Information." });
  try {
    const user = await User.findById(uId);
    if (!user) return res.json({ success: false, message: "Invalid User" });
    const notify = user.notifications;
    if (notify.length>0) {
      user.notifications=[];
      await user.save();
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Notifications not found" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};