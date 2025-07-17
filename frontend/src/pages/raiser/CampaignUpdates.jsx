import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Heart, Share2, Calendar, Image, Save } from 'lucide-react';
import { mockFunds } from '../../data/mockData';
import { AuthContext } from '../../context/AuthContext';

const CampaignUpdates = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  
  // Find the campaign
  const campaign = mockFunds.find(fund => fund._id === id);
  
  // Mock updates data - in real app, this would come from API
  const [updates, setUpdates] = useState([
    {
      id: '1',
      title: 'Construction Progress Update',
      content: 'Great news! We\'ve completed 60% of the well construction. The drilling team has reached the water table at 45 feet depth, and water quality tests show excellent results. We expect to complete the project within the next 2 weeks.',
      date: '2024-02-20',
      imageUrl: 'https://images.pexels.com/photos/1142975/pexels-photo-1142975.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 234,
      likes: 45
    },
    {
      id: '2',
      title: 'Halfway to Our Goal!',
      content: 'Thanks to your incredible support, we\'ve reached 50% of our fundraising goal! This means we can now purchase all the necessary equipment and materials. Every donation brings us closer to providing clean water to 500 families.',
      date: '2024-02-15',
      views: 189,
      likes: 67
    },
    {
      id: '3',
      title: 'Project Kickoff',
      content: 'We\'re excited to announce that our clean water project has officially begun! Our team has arrived on-site and conducted initial surveys. The local community is thrilled and ready to support the construction process.',
      date: '2024-02-01',
      views: 156,
      likes: 38
    }
  ]);

  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Campaign not found</h2>
          <Link to="/raiser/campaigns" className="text-emerald-600 hover:text-emerald-700">
            ← Back to campaigns
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateUpdate = () => {
    if (!newUpdate.title || !newUpdate.content) return;

    const update = {
      id: Date.now().toString(),
      ...newUpdate,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0
    };

    setUpdates([update, ...updates]);
    setNewUpdate({ title: '', content: '', imageUrl: '' });
    setShowCreateModal(false);
  };

  const handleDeleteUpdate = (updateId) => {
    setUpdates(updates.filter(update => update.id !== updateId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8 transition-colors">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Campaign Updates</h1>
              <p className="text-lg text-gray-600 dark:text-dark-300">{campaign.title}</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-linear-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-colors shadow-lg flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Post Update
            </button>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 mb-8 border border-gray-100 dark:border-dark-700">
          <div className="flex items-center space-x-4">
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{campaign.title}</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-dark-400">Raised:</span>
                  <span className="font-semibold text-emerald-600 ml-1">
                    ${campaign.currentAmount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-dark-400">Donors:</span>
                  <span className="font-semibold text-gray-900 dark:text-white ml-1">{campaign.donors}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-dark-400">Updates:</span>
                  <span className="font-semibold text-gray-900 dark:text-white ml-1">{updates.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          {updates.map((update) => (
            <div key={update.id} className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{update.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-dark-400 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(update.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {update.views} views
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {update.likes} likes
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingUpdate(update)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUpdate(update.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {update.imageUrl && (
                <img
                  src={update.imageUrl}
                  alt="Update"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-700 dark:text-dark-300 leading-relaxed">{update.content}</p>
            </div>
          ))}

          {updates.length === 0 && (
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-12 text-center border border-gray-100 dark:border-dark-700">
              <Calendar className="h-16 w-16 text-gray-300 dark:text-dark-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No updates yet</h3>
              <p className="text-gray-600 dark:text-dark-300 mb-6">
                Keep your supporters engaged by sharing regular updates about your campaign progress.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Post Your First Update
              </button>
            </div>
          )}
        </div>

        {/* Create Update Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-dark-600">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Post Campaign Update</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                    Update Title
                  </label>
                  <input
                    type="text"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="Give your update a compelling title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                    Update Content
                  </label>
                  <textarea
                    rows={6}
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Share your progress, milestones, or any important information with your supporters..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                    Add Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                    <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-dark-300 text-sm">Upload a photo to make your update more engaging</p>
                    <button className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Choose File
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-dark-300 py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateUpdate}
                    disabled={!newUpdate.title || !newUpdate.content}
                    className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Post Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignUpdates;