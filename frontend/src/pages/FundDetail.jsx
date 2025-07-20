import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MapPin,
  Users,
  Calendar,
  Heart,
  Share2,
  Flag,
  ArrowLeft,
  Plus,
  Upload,
  Edit,
} from "lucide-react";
import { mockFunds } from "../data/mockData";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { backendDomain } from "../App";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import PaymentModal from "../components/PaymentModal";
import { FundContext } from "../context/FundContext";



const FundDetail = () => {
  const { id } = useParams();
  const {funds} = useContext(FundContext);
  const [fund, setFund] = useState();
  const { user, verifyUser } = useContext(AuthContext);
  useEffect(() => {
    setFund(funds.find((f) => f._id === id));
  }, [funds]);
  useEffect(() => {
    if (user && user.favorites.some((favId) => favId.toString() === id)) {
      setUserFav(true);
    }
  }, [user]);

  const [userFav, setUserFav] = useState(false);
  const [preview, setPreview] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Add to favorite
  const addFavorite = async () => {
    if (user == null) {
      toast.info(
        "You must be logged in before adding this camping to your favorites."
      );
    } else {
      await axios
        .patch(`${backendDomain}/addFav`, { userId: user._id, campaignId: id })
        .then((res) => {
          if (res.data.success) {
            setUserFav(true);
            verifyUser();
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };
  const removeFavorite = async () => {
    await axios
      .patch(`${backendDomain}/removeFav`, {
        userId: user._id,
        campaignId: id,
      })
      .then((res) => {
        if (res.data.success) {
          setUserFav(false);
          verifyUser();
        } else {
          toast.error(res.data.message);
        }
      });
  };

  if (!fund) {
    return (
      <div className="min-h-screen  dark:bg-linear-to-br bg-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-colors flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Campaign not found
          </h2>
          <Link to="/funds" className="text-emerald-600 hover:text-emerald-700">
            ← Back to all campaigns
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (fund.currentAmount / fund.targetAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(fund.endDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  const handleDonate = ()=>{
  if(user){
    if(user._id===fund.organizer._id){
      toast.warn("Self-donations aren't allowed!")
    }else{
      setShowPaymentModal(true);
    }
  }else{
    toast.info("You must login before proceeding donation!");
  }
}
const handleShare = (social) => {
  const urlToShare = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Support this amazing cause!");
  let url = "";

  switch (social) {
    case "facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}&quote=${text}`;
      break;
    case "twitter":
      url = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${text}`;
      break;
    case "whatsapp":
      url = `https://wa.me/?text=${text}%20${urlToShare}`;
      break;
    default:
      console.warn("Unsupported social platform:", social);
      return;
  }
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-linear-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-colors ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/funds"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all campaigns
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative  bg-white dark:bg-dark-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-dark-700">
              <div className="relative">
                <img
                  src={fund.imageUrl}
                  alt={fund.title}
                  className="w-full h-64 object-cover"
                />
                {preview.length > 0 ? (
                  <>
                    <div className="absolute bottom-3 right-4 cursor-pointer">
                      <div className="backdrop-blur-xs flex flex-row bg-white/70 dark:bg-dark-800/70 border border-gray-300 dark:border-dark-900 text-gray-700 dark:text-white rounded-md p-1 shadow-md mr-1 hover:border-emerald-600 dark:hover:border-dark-900 hover:text-emerald-600 hover:bg-emerald-100 dark:hover:bg-dark-900/70 transition-colors duration-200 items-center">
                        <Upload className="w-4 h-4 mr-2" />{" "}
                        <p className="text-sm m-0 p-0">Upload</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {user && fund.organizer._id == user._id ? (
                <>
                  <div className="absolute top-2 right-4 flex flex-row   cursor-pointer">
                    <label>
                      <div className="backdrop-blur-xs bg-white/70 border dark:bg-dark-800/70 border-gray-300 dark:border-dark-800 text-gray-700 dark:text-white rounded-full p-1 shadow-md mr-1 hover:border-emerald-600 dark:hover:border-dark-900 hover:text-emerald-600  hover:bg-emerald-100 dark:hover:bg-dark-900/70 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          // onChange={updateImage}
                        />
                      </div>
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-linear-to-r from-emerald-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {fund.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            url: window.location.href,
                          });
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-rose-900/20">
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {fund.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-dark-400 mb-6">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                    {fund.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-emerald-400" />
                    {fund.donors.length} donors
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-400" />
                    {(daysLeft > 0 && fund.status) ? `${daysLeft} days left` : "Campaign ended"}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Our Story
                  </h2>
                  <p className="text-gray-700 dark:text-white leading-relaxed mb-6">
                    {fund.story}
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Campaign Organizer
                  </h2>
                  <p className="text-gray-700 dark:text-white">
                    {fund.organizer.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Updates Section */}
            {fund.updates.length >= 0 && (
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md mt-8 p-6 border border-gray-100 dark:border-dark-900">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Updates
                  </h2>
                  {user && fund.organizer._id == user._id ? (
                    <Link
                      to={`/update/${id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                      <Plus />
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="space-y-6">
                  {fund.updates.map((update, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-emerald-500 pl-4 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-r-lg"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {update.title}
                      </h3>
                      <p className="text-sm text-emerald-600 mb-2">
                        {update.date.split("T")[0]}
                      </p>
                      <p className="text-gray-700 dark:text-white">
                        {update.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100 dark:border-dark-900">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    ₹{fund.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-dark-400">
                    of ₹{fund.targetAmount.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-linear-to-r from-emerald-600 to-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>

                <div className="text-sm text-gray-600 dark:text-dark-400">
                  {progressPercentage.toFixed(1)}% funded
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fund.donors.length}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-dark-400">
                    donors
                  </div>
                </div>

                <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white ">
                    {(daysLeft > 0 && fund.status) ? daysLeft : 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-dark-400">
                    days left
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {fund.status ? (
                  <>
                    <button onClick={handleDonate} className="w-full bg-linear-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      Donate Now
                    </button>
                    {!userFav ? (
                      <button
                        onClick={addFavorite}
                        className="w-full border-2 border-emerald-600 text-emerald-600 py-3 px-4 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Favorites
                      </button>
                    ) : (
                      <button
                        onClick={removeFavorite}
                        className="w-full border-2 border-rose-600 text-rose-600  py-3 px-4 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-rose-900/20 transition-colors flex items-center justify-center"
                      >
                        <FaHeart className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </button>
                    )}
                  </>
                ) : (
                  <div className="w-full bg-stone-600 dark:bg-stone-700 text-white py-3 px-4 rounded-xl font-semibold cursor-not-allowed text-center shadow-inner transition-all duration-200">
                    Campaign Ended
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-600">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Share this campaign
                </h3>
                <div className="flex justify-center space-x-3">
                  <button onClick={()=>{handleShare("facebook")}} className="p-3 bg-blue-100 dark:bg-blue-900/30  text-blue-600 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <FaFacebookF className="h-4 w-4" />
                  </button>
                  <button onClick={()=>{handleShare("whatsapp")}} className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                    <FaWhatsapp className="h-4 w-4" />
                  </button>
                  <button onClick={()=>{handleShare("twitter")}} className="p-3 bg-gray-200 dark:bg-gray-900/30 text-black dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-900/70 transition-colors">
                    <FaXTwitter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        fund={fund}
      />
    </div>
  );
};

export default FundDetail;
