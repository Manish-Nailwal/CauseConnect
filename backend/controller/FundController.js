import User from "../models/user.js";
import Fund from "../models/fund.js";

export const CreateFund = async (req, res) => {
  const organizer = req.params.id;
  try {
    const campaignData = JSON.parse(req.body.data);

    const newCampaign = new Fund({ ...campaignData });
    if (req.file) {
      newCampaign.imageUrl = req.file.path;
    } else {
      newCampaign.imageUrl =
        "https://res.cloudinary.com/dojqjc99q/image/upload/v1752219286/YouTube_Banner_-_Fundraising_for_Community_Support_qioorg.png";
    }
    newCampaign.organizer = organizer;
    newCampaign.currentAmount = 0;
    const campaign = await newCampaign.save();
    const user = await User.findById(organizer);
    user.campaigns.push(campaign);
    const notify = {
      type: "campaign",
      title: "Your Campaign Is Live!",
      message:
        "Congratulations! Your new campaign is now live and ready to receive support. Let’s make an impact together!",
      icon: "Megaphone", 
      color: "from-indigo-500 to-purple-600",
      actionUrl: `/campaigns/${campaign._id}`,
    };
    user.notifications.push(notify);
    await user.save();
    res.status(201).json({ success: true,data: campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Campaign wasn't created." });
  }
};

export const AllFunds = async (req, res) => {
  try {
    await autoExpireFunds();
    const allFunds = await Fund.find({});
    if (allFunds.length == 0) {
      return res.json(allFunds);
    }
    for (let fund of allFunds) {
      fund.checkStatus();
    }
    const funds = await Fund.find({}).populate("organizer");
    return res.json(funds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching funds" });
  }
};

export const FundInfo = async (req, res) => {
  try {
    await autoExpireFunds();
    const fund = await Fund.findById(req.params.id).populate("organizer");
    if (!fund) {
      return res.status(404).json({ message: "Fund not found" });
    }
    res.json(fund);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching fund info" });
  }
};

export const getFunds = async (req, res) => {
  const { id, fund } = req.query;
  await autoExpireFunds();
  const user = await User.findById(id).populate(fund);
  res.json(user[fund]);
};

const autoExpireFunds = async () => {
  const now = new Date();
  await Fund.updateMany(
    { endDate: { $lt: now }, status: true },
    { $set: { status: false } }
  );
};
