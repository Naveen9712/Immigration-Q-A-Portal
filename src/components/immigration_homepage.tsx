import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp, ThumbsDown, Bell, Menu, Search, Plus, Navigation, User, X, Mail, Sparkles } from 'lucide-react';

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
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b142?w=150&h=150&fit=crop&crop=face",
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
  const [isLoading, setIsLoading] = useState(true);
  const [postsVisible, setPostsVisible] = useState<Set<number>>(new Set());

  // Simulate loading and staggered post appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      posts.forEach((post, index) => {
        setTimeout(() => {
          setPostsVisible(prev => new Set([...prev, post.id]));
        }, index * 200);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [posts]);

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
      }, 2500);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 animate-pulse">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  const ComingSoonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-auto shadow-2xl transform animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-500 animate-spin" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Coming Soon!
            </h3>
          </div>
          <button 
            onClick={() => setShowComingSoonModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 transform"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {!emailSubmitted ? (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Bell className="w-10 h-10 text-blue-600 animate-bounce" />
              </div>
              <p className="text-gray-700 mb-3 font-medium">
                Our advanced AI Q&A feature is currently under testing to provide you with the most accurate immigration guidance.
              </p>
              <p className="text-sm text-gray-500">
                Be the first to know when it's ready! ✨
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleEmailSubmit()}
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Notify Me 🔔
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">All Set! 🎉</h4>
            <p className="text-gray-600">
              We'll notify you via email once the feature is available.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-sm">IM</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              immigub
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-400 animate-pulse" />
            <Menu className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen max-w-sm mx-auto relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm sticky top-0 z-40 animate-slideDown">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
            <span className="text-white font-bold text-sm">IM</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            immigub
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleComingSoonClick}
            className="relative transform hover:scale-110 transition-all duration-200 hover:rotate-12"
          >
            <Bell className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </button>
          <Menu className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Groups Section */}
      <div className="bg-white px-4 py-5 border-b border-gray-200 animate-slideUp">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Groups</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { name: "F-1", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", color: "from-blue-500 to-blue-600" },
            { name: "H1B", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face", color: "from-green-500 to-green-600" },
            { name: "Green Card", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face", color: "from-purple-500 to-purple-600" },
            { name: "Citizenship", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", color: "from-orange-500 to-orange-600" },
            { name: "EB-1", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", color: "from-red-500 to-red-600" }
          ].map((group, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer group animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${group.color} p-0.5 transform group-hover:scale-110 transition-all duration-200 shadow-lg group-hover:shadow-xl`}>
                <img src={group.avatar} alt={group.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-xs text-gray-600 font-semibold group-hover:text-gray-800 transition-colors">
                {group.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="bg-white px-4 py-5 border-b border-gray-200 animate-slideUp" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Shortcuts</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { text: "Find Lawyer", color: "from-blue-500 to-blue-600", delay: "0ms" },
            { text: "Document Check", color: "from-green-500 to-green-600", delay: "100ms" },
            { text: "Status Track", color: "from-purple-500 to-purple-600", delay: "200ms" },
            { text: "Market Place", color: "from-orange-500 to-orange-600", delay: "300ms" }
          ].map((shortcut, index) => (
            <button 
              key={index}
              onClick={handleComingSoonClick}
              className={`px-5 py-3 bg-gradient-to-r ${shortcut.color} text-white rounded-full text-sm font-semibold whitespace-nowrap hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 animate-fadeIn`}
              style={{ animationDelay: shortcut.delay }}
            >
              {shortcut.text}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-5 p-4 pb-24">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className={`bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform ${
              postsVisible.has(post.id) ? 'animate-slideUp opacity-100' : 'opacity-0 translate-y-10'
            }`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* User Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{post.user}</span>
                    <button className="text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors transform hover:scale-105">
                      Follow
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 transform">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Question */}
            <p className="text-gray-800 mb-4 leading-relaxed font-medium">{post.question}</p>

            {/* Post Stats */}
            <div className="flex justify-between items-center text-sm text-gray-500 mb-5">
              <span className="bg-gray-100 px-2 py-1 rounded-full">{post.views}</span>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-all duration-200 transform hover:scale-110 ${
                  likedPosts.has(post.id) 
                    ? 'text-red-500 animate-bounce' 
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                <span className="text-sm font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-200 transform hover:scale-110">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-200 transform hover:scale-110">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-semibold">{post.shares}</span>
              </button>
              <button className="text-blue-500 hover:text-blue-600 transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>

            {/* AI Response Section */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-5 border border-blue-100 shadow-inner">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  AI Assistant Response
                </span>
                <div className="flex-1"></div>
                <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-semibold animate-pulse">
                  Beta
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 font-medium">{post.aiResponse}</p>
              
              {/* AI Response Voting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleAiVote(post.id, 'like')}
                    className={`flex items-center space-x-2 transition-all duration-200 transform ${
                      aiVotes[post.id] === 'like' 
                        ? 'text-green-600 scale-110 animate-bounce' 
                        : 'text-gray-500 hover:text-green-600 hover:scale-110'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${aiVotes[post.id] === 'like' ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold">{post.aiLikes}</span>
                  </button>
                  <button
                    onClick={() => handleAiVote(post.id, 'dislike')}
                    className={`flex items-center space-x-2 transition-all duration-200 transform ${
                      aiVotes[post.id] === 'dislike' 
                        ? 'text-red-600 scale-110 animate-bounce' 
                        : 'text-gray-500 hover:text-red-600 hover:scale-110'
                    }`}
                  >
                    <ThumbsDown className={`w-5 h-5 ${aiVotes[post.id] === 'dislike' ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold">{post.aiDislikes}</span>
                  </button>
                </div>
                <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  Was this helpful?
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
        <div className="flex items-center justify-around py-4 px-4">
          {[
            { icon: 'home', label: 'Home', active: true },
            { icon: 'search', label: 'Search', active: false },
            { icon: 'plus', label: 'Post', active: false },
            { icon: 'navigation', label: 'Journey', active: false },
            { icon: 'user', label: 'Profile', active: false }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={!item.active ? handleComingSoonClick : undefined}
              className={`flex flex-col items-center space-y-1 transition-all duration-200 transform hover:scale-110 ${
                item.active ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              {item.icon === 'home' && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              )}
              {item.icon === 'search' && <Search className="w-6 h-6" />}
              {item.icon === 'plus' && <Plus className="w-6 h-6" />}
              {item.icon === 'navigation' && <Navigation className="w-6 h-6" />}
              {item.icon === 'user' && <User className="w-6 h-6" />}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && <ComingSoonModal />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImmigrationHomepage;