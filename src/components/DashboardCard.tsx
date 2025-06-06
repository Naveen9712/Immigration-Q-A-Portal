import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp, ThumbsDown, Bell, Menu, Search, Plus, Navigation, User, X, Mail } from 'lucide-react';

interface Post {
  id: number;
  user: string;
  avatar: string;
  question: string;
  timestamp: string;
  views: string;
  likes: number;
  comments: number;
  shares: number;
  aiResponse: string;
  aiLikes: number;
  aiDislikes: number;
}

interface AiVotes {
  [key: number]: 'like' | 'dislike' | null;
}

const ImmigrationHomepage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      question: "How long does it typically take to get a work visa approved for the US? I'm a software engineer from Brazil and my company wants to sponsor me.",
      timestamp: "09:15 AM, 15 May, 2025",
      views: "8.2k views",
      likes: 45,
      comments: 12,
      shares: 8,
      aiResponse: "For software engineers from Brazil, H-1B work visa processing typically takes 3-6 months for regular processing, or 1-15 days for premium processing (additional $2,805 fee). Your employer must first file the petition, and approval depends on the annual cap and your qualifications.",
      aiLikes: 127,
      aiDislikes: 8
    },
    {
      id: 2,
      user: "Ahmed Hassan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      question: "Can I bring my spouse and children when immigrating to Canada through Express Entry? What documents do I need for them?",
      timestamp: "11:30 AM, 14 May, 2025",
      views: "12.5k views",
      likes: 78,
      comments: 23,
      shares: 15,
      aiResponse: "Yes, you can include your spouse and dependent children in your Express Entry application. Required documents include: marriage certificate, birth certificates for children, medical exams, police clearances, and proof of language proficiency for your spouse if claiming points.",
      aiLikes: 203,
      aiDislikes: 12
    },
    {
      id: 3,
      user: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      question: "What's the difference between EB-1, EB-2, and EB-3 green cards? Which one should I apply for as a research scientist?",
      timestamp: "02:45 PM, 13 May, 2025",
      views: "15.7k views",
      likes: 92,
      comments: 31,
      shares: 22,
      aiResponse: "As a research scientist, you may qualify for EB-1A (extraordinary ability) if you have significant achievements, EB-1B (outstanding researcher) if backed by an employer, or EB-2 with advanced degree. EB-1 has no country caps and faster processing, while EB-2 may require PERM labor certification.",
      aiLikes: 284,
      aiDislikes: 15
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [aiVotes, setAiVotes] = useState<AiVotes>({});
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAiVote = (postId: number, voteType: 'like' | 'dislike') => {
    const currentVote = aiVotes[postId];
    let newVote: 'like' | 'dislike' | null = null;
    
    if (currentVote === voteType) {
      newVote = null;
    } else {
      newVote = voteType;
    }
    
    setAiVotes({ ...aiVotes, [postId]: newVote });
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        let newLikes = post.aiLikes;
        let newDislikes = post.aiDislikes;
        
        if (currentVote === 'like' && newVote !== 'like') newLikes--;
        if (currentVote === 'dislike' && newVote !== 'dislike') newDislikes--;
        if (newVote === 'like' && currentVote !== 'like') newLikes++;
        if (newVote === 'dislike' && currentVote !== 'dislike') newDislikes++;
        
        return { ...post, aiLikes: newLikes, aiDislikes: newDislikes };
      }
      return post;
    }));
  };

  const handleComingSoonClick = () => {
    setShowComingSoonModal(true);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowComingSoonModal(false);
        setEmailSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  const ComingSoonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Coming Soon!</h3>
          <button 
            onClick={() => setShowComingSoonModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {!emailSubmitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-2">
                Our advanced AI Q&A feature is currently under testing to provide you with the most accurate immigration guidance.
              </p>
              <p className="text-sm text-gray-500">
                Get notified when it's ready!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleEmailSubmit(e)}
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Notify Me
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">All Set!</h4>
            <p className="text-gray-600">
              We'll notify you via email once the feature is available.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen max-w-sm mx-auto relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IM</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">immigub</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleComingSoonClick}>
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <Menu className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Groups Section */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Groups</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {[
            { name: "F-1", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", color: "border-blue-500" },
            { name: "H1B", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face", color: "border-green-500" },
            { name: "Green Card", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", color: "border-purple-500" },
            { name: "Citizenship", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", color: "border-orange-500" },
            { name: "EB-1", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", color: "border-red-500" }
          ].map((group, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full border-2 ${group.color} p-0.5`}>
                <img src={group.avatar} alt={group.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-xs text-gray-600 font-medium">{group.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Shortcuts</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <button 
            onClick={handleComingSoonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-blue-600 transition-colors"
          >
            Find Lawyer
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-green-600 transition-colors"
          >
            Document Check
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-purple-600 transition-colors"
          >
            Status Track
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium whitespace-nowrap hover:bg-orange-600 transition-colors"
          >
            Market Place
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            {/* User Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{post.user}</span>
                    <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Question */}
            <p className="text-gray-800 mb-3 leading-relaxed">{post.question}</p>

            {/* Post Stats */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>{post.timestamp}</span>
              <span>{post.views}</span>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-1 transition-colors ${
                  likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
              <button className="text-blue-500 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>

            {/* AI Response Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="text-sm font-semibold text-blue-700">AI Assistant Response</span>
                <div className="flex-1"></div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Beta</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.aiResponse}</p>
              
              {/* AI Response Voting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAiVote(post.id, 'like')}
                    className={`flex items-center space-x-1 transition-all duration-200 ${
                      aiVotes[post.id] === 'like' 
                        ? 'text-green-600 transform scale-105' 
                        : 'text-gray-500 hover:text-green-600'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${aiVotes[post.id] === 'like' ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.aiLikes}</span>
                  </button>
                  <button
                    onClick={() => handleAiVote(post.id, 'dislike')}
                    className={`flex items-center space-x-1 transition-all duration-200 ${
                      aiVotes[post.id] === 'dislike' 
                        ? 'text-red-600 transform scale-105' 
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${aiVotes[post.id] === 'dislike' ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.aiDislikes}</span>
                  </button>
                </div>
                <span className="text-xs text-blue-600 font-medium">Was this helpful?</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-3 px-4">
          <button className="flex flex-col items-center space-y-1 text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs font-medium">Post</span>
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Navigation className="w-6 h-6" />
            <span className="text-xs font-medium">Journey</span>
          </button>
          <button 
            onClick={handleComingSoonClick}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Bottom padding to prevent content from being hidden behind navigation */}
      <div className="h-20"></div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && <ComingSoonModal />}
    </div>
  );
};

export default ImmigrationHomepage;