import React from 'react';
import { Heart, Users, Globe, Award, Shield, TrendingUp, Target, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+', color: 'from-blue-500 to-indigo-600' },
    { icon: Globe, label: 'Countries', value: '25+', color: 'from-green-500 to-emerald-600' },
    { icon: Heart, label: 'Campaigns', value: '1,200+', color: 'from-red-500 to-pink-600' },
    { icon: TrendingUp, label: 'Funds Raised', value: '$2.5M+', color: 'from-purple-500 to-indigo-600' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the importance of helping those in need.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Every donation is tracked and reported, ensuring complete transparency in how funds are used.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'We focus on creating measurable, lasting impact in communities around the world.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Using technology to make fundraising more efficient, accessible, and effective.',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former nonprofit director with 10+ years of experience in social impact.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Tech entrepreneur passionate about using technology for social good.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Operations expert ensuring smooth platform functionality and user experience.'
    },
    {
      name: 'David Kim',
      role: 'Head of Community',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Community builder focused on connecting donors with meaningful causes.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-emerald-600 via-green-600 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-r from-emerald-600/30 to-green-600/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About
              <span className="block bg-linear-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                CauseConnect
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-100 leading-relaxed">
              Empowering communities worldwide through transparent, impactful fundraising that connects hearts with causes that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 max-w-3xl mx-auto">
              To democratize fundraising and make it easier for anyone, anywhere to support causes they care about while ensuring every donation creates maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="People working together"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Making a Difference Together</h3>
              <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                Founded in 2023, CauseConnect was born from the belief that everyone deserves the opportunity to make a positive impact in the world. We've built a platform that removes barriers between generous hearts and meaningful causes.
              </p>
              <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                Our technology ensures that every dollar donated is tracked, every campaign is verified, and every impact is measured. We're not just a fundraising platform – we're a community of changemakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-br from-gray-50 to-emerald-50 dark:from-dark-900 dark:to-emerald-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">Numbers that tell our story</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-dark-800 shadow-md border border-gray-100 dark:border-dark-700">
                <div className={`bg-linear-to-br ${stat.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-dark-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-linear-to-br from-gray-50 to-emerald-50 dark:from-dark-700 dark:to-emerald-900/20 border border-gray-100 dark:border-dark-600">
                <div className={`bg-linear-to-br ${value.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300">The passionate people behind CauseConnect</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-dark-800 rounded-2xl shadow-md p-6 text-center border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-emerald-100 dark:ring-emerald-800"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-br from-emerald-600 via-green-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of changemakers who are creating positive impact every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg">
              Start Fundraising
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
              Explore Causes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;