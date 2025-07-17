import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@causeconnect.com',
      description: 'Send us an email and we\'ll respond within 24 hours',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm EST',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Impact Street, San Francisco, CA 94102',
      description: 'Our headquarters are open for visits',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Monday - Friday: 8am - 6pm EST',
      description: 'Weekend support available for urgent issues',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const faqCategories = [
    {
      icon: HelpCircle,
      title: 'General Questions',
      description: 'Learn about CauseConnect and how it works',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'For Fundraisers',
      description: 'Get help creating and managing your campaigns',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: MessageCircle,
      title: 'For Donors',
      description: 'Questions about donations and transactions',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-emerald-600 via-green-600 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Get in
              <span className="block bg-linear-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-100 leading-relaxed">
              Have questions? Need help? We're here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How to Reach Us</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">Choose the best way to get in touch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-linear-to-br from-gray-50 to-emerald-50 dark:from-dark-700 dark:to-emerald-900/20 border border-gray-100 dark:border-dark-600 hover:shadow-lg transition-shadow">
                <div className={`bg-linear-to-br ${info.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                <p className="text-emerald-600 font-semibold mb-2">{info.details}</p>
                <p className="text-gray-600 dark:text-dark-300 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-dark-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-dark-300">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="fundraiser">Fundraiser Help</option>
                      <option value="donor">Donor Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-colors resize-none"
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6 mb-8">
                {faqCategories.map((category, index) => (
                  <div key={index} className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-linear-to-br ${category.color} rounded-xl w-12 h-12 flex items-center justify-center shadow-lg`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
                        <p className="text-gray-600 dark:text-dark-300 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Need Immediate Help?</h3>
                <p className="text-gray-600 dark:text-dark-300 mb-4">
                  For urgent issues or technical emergencies, you can reach our priority support line.
                </p>
                <button className="bg-linear-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-colors">
                  Emergency Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">We'd love to meet you in person</p>
          </div>
          
          <div className="bg-gray-200 dark:bg-dark-700 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 dark:text-dark-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-dark-300">Interactive map would be integrated here</p>
              <p className="text-sm text-gray-500 dark:text-dark-400 mt-2">123 Impact Street, San Francisco, CA 94102</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;