import React, { useContext, useState } from "react";
import {
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Save,
  Eye,
  ArrowLeft,
  Pencil,
  Trash,
  IndianRupee,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { backendDomain } from "../../App";
import { toast } from "react-toastify";
import { FundContext } from "../../context/FundContext";

const CreateCampaign = () => {
  const { user, verifyUser } = useContext(AuthContext);
  const { updateFunds } = useContext(FundContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    story: "",
    category: "Health",
    targetAmount: "",
    endDate: "",
    location: "",
    imageUrl: null,
    tags: [],
    beneficiaryInfo: "",
    fundUsage: "",
    expectedImpact: "",
  });

  const [newTag, setNewTag] = useState("");

  const categories = [
    "Health",
    "Education",
    "Environment",
    "Emergency",
    "Animals",
    "Community",
    "Disaster Relief",
    "Medical",
    "Children",
    "Elderly Care",
    "Food Security",
    "Clean Water",
  ];

  const steps = [
    {
      number: 1,
      title: "Basic Information",
      description: "Campaign title, category, and goal",
    },
    {
      number: 2,
      title: "Story & Details",
      description: "Tell your story and add details",
    },
    {
      number: 3,
      title: "Media & Location",
      description: "Add images and location",
    },
    {
      number: 4,
      title: "Review & Publish",
      description: "Review and publish your campaign",
    },
  ];

  const handleInputChange = (field, value) => {
    if (field == "description") {
      setCampaignData((prev) => ({
        ...prev,
        [field]: value.slice(0, 200),
      }));
    } else {
      setCampaignData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !campaignData.tags.includes(newTag.trim())) {
      setCampaignData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setCampaignData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setCampaignData((prev) => ({
        ...prev,
        imageUrl: file,
      }));
    } else {
      toast.warn("File is too large or not supported.");
    }
  };

  const removeImage = () => {
    setCampaignData((prev) => ({
      ...prev,
      imageUrl: null,
    }));
    setPreview("");
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const imageInput = campaignData.imageUrl;
      if (imageInput) {
        formData.append("image", imageInput);
      }

      const dataToSend = { ...campaignData };
      delete dataToSend.imageUrl;
      formData.append("data", JSON.stringify(dataToSend));

      await axios
        .post(`${backendDomain}/create/${user._id}`, formData)
        .then((res) => {
          if (res.data.success) {
            verifyUser();
            updateFunds();
          }
        });
    } catch (err) {
      toast.error(err.message);
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    navigate("/raiser/campaigns");
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          campaignData.title &&
          campaignData.category &&
          campaignData.targetAmount
        );
      case 2:
        return campaignData.description && campaignData.story;
      case 3:
        return campaignData.location && campaignData.endDate;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/raiser/campaigns"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to campaigns
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-200 mb-4">
            Create New Campaign
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-400">
            Share your cause with the world and start making a difference today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-dark-900 overflow-x-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.number
                        ? "bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-dark-200"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.number
                          ? "text-emerald-600"
                          : "text-gray-500 dark:text-dark-200"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-300">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.number
                        ? "bg-emerald-500"
                        : "bg-gray-200 dark:bg-dark-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-dark-900">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-200 mb-6">
                Basic Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={campaignData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Give your campaign a compelling title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                    Category *
                  </label>
                  <select
                    value={campaignData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                    Fundraising Goal *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={campaignData.targetAmount}
                      onChange={(e) =>
                        handleInputChange("targetAmount", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  value={campaignData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Briefly describe what your campaign is about (this will appear in search results)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {campaignData.description.length}/200 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Story & Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-200 mb-6">
                Tell Your Story
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Campaign Story *
                </label>
                <textarea
                  rows={8}
                  value={campaignData.story}
                  onChange={(e) => handleInputChange("story", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell the full story of your campaign. What problem are you solving? Why is it important? How will donations help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  How will funds be used?
                </label>
                <textarea
                  rows={4}
                  value={campaignData.fundUsage}
                  onChange={(e) =>
                    handleInputChange("fundUsage", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Break down how the donated money will be spent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Expected Impact
                </label>
                <textarea
                  rows={4}
                  value={campaignData.expectedImpact}
                  onChange={(e) =>
                    handleInputChange("expectedImpact", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Describe the positive impact this campaign will have"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Beneficiary Information
                </label>
                <textarea
                  rows={3}
                  value={campaignData.beneficiaryInfo}
                  onChange={(e) =>
                    handleInputChange("beneficiaryInfo", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Who will benefit from this campaign?"
                />
              </div>
            </div>
          )}

          {/* Step 3: Media & Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-200 mb-6">
                Media & Location
              </h2>

              {!campaignData.imageUrl ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2 ">
                    Campaign Image
                    <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 dark:text-dark-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-dark-300 mb-2">
                        Upload a compelling image for your campaign
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-400">
                        PNG, JPG up to 5MB
                      </p>
                      <div className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        Choose File
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden"
                          onChange={updateImage}
                        />
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <>
                  <div className="relative group border-2 border-gray-300 dark:border-dark-600 rounded-xl text-center hover:border-emerald-400 transition-colors overflow-hidden max-h-48">
                    <img
                      src={preview}
                      alt="Selected"
                      className="w-full h-48 rounded-lg object-cover"
                    />
                    <div className="absolute top-2 right-4 flex flex-row  opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                      <label>
                        <div className="backdrop-blur-xs text-gray-700 rounded-full p-1 shadow-md mr-1 hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-100 transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={updateImage}
                          />
                        </div>
                      </label>
                      <div
                        onClick={removeImage}
                        className=" text-gray-700 rounded-full p-1 shadow-md hover:border-rose-600 hover:text-rose-600 hover:bg-rose-100 transition-colors duration-200"
                      >
                        <Trash className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={campaignData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                    Campaign End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      value={campaignData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-400 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaignData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-green-600"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800 dark:hover:text-green-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pb-6">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={addTag}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-200 mb-6">
                Review Your Campaign
              </h2>

              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                    Title
                  </h3>
                  <p className="text-gray-700 dark:text-dark-400">
                    {campaignData.title}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                      Category
                    </h3>
                    <p className="text-gray-700 dark:text-dark-400">
                      {campaignData.category}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                      Goal
                    </h3>
                    <p className="text-gray-700 dark:text-dark-400">
                      ₹{parseInt(campaignData.targetAmount).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                      Location
                    </h3>
                    <p className="text-gray-700 dark:text-dark-400">
                      {campaignData.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                      End Date
                    </h3>
                    <p className="text-gray-700 dark:text-dark-400">
                      {new Date(campaignData.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-dark-400">
                    {campaignData.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                    Story
                  </h3>
                  <p className="text-gray-700 dark:text-dark-400 line-clamp-3">
                    {campaignData.story}
                  </p>
                </div>

                {campaignData.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-100">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {campaignData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-green-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50 dark:bg-dark-800 border border-emerald-200 dark:border-emerald-600/50 mb-6 rounded-xl p-6">
                <h3 className="font-semibold text-emerald-900 dark:text-green-600 mb-2">
                  Ready to Launch?
                </h3>
                <p className="text-emerald-700 dark:text-green-700 text-sm">
                  Once published, your campaign will be live and visible to
                  potential donors. You can edit most details later, but the
                  fundraising goal cannot be changed.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-between pt-8 mt-2 border-t border-gray-200 dark:border-dark-600">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border mb-5 border-gray-300 text-gray-700 dark:border-dark-600 dark:text-dark-400 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              <button className="cursor-not-allowed px-6 py-3 border border-emerald-300 text-emerald-600 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Publish Campaign</span>
                      <span className="inline sm:hidden">Publish</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
