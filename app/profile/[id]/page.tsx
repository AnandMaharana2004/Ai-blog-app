"use client";

import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';

// Using lucide-react for icons as in the previous version and your template
import { User, Mail, Lock, Camera, Save, X, AlertCircle, CheckCircle, Pencil, Users, UserPlus, FileText, CalendarDays, Eye, ThumbsUp } from 'lucide-react';
import Footer from '@/components/footer';

// --- Mock Data (as provided in your template) ---
// In a real app, this would come from an API
const dummyUserProfile = {
  id: 'user123',
  username: 'johndoe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Software developer and tech enthusiast. I love building things with React and TypeScript.',
  profilePic: 'https://placehold.co/128x128/7C3AED/FFFFFF?text=JD',
  profileBanner: 'https://placehold.co/1200x300/e2e8f0/64748b?text=Cover+Image',
  followers: 12500,
  following: 340,
  postsCount: 98,
};

const dummyUserPosts = Array.from({ length: 12 }, (_, i) => ({
  id: `post${i + 1}`,
  title: `Exploring the Alps: A Hiker's Journey ${i + 1}`,
  thumbnail: `https://placehold.co/400x300/a78bfa/ffffff?text=Post+${i + 1}`,
  views: Math.floor(Math.random() * 20000) + 1000,
  likes: Math.floor(Math.random() * 5000) + 100,
  publishDate: new Date(2023, 11 - i, 28 - i).toISOString(),
}));

// --- Prop Types for Components ---
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ElementType;
  readOnly?: boolean;
}

// --- Reusable UI Components ---
type ButtonVariant = 'default' | 'outline';
type ButtonSize = 'default' | 'sm';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-600/90",
    outline: "border border-input bg-transparent hover:bg-gray-100",
  };
  const sizeClasses: Record<ButtonSize, string> = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md"
  };
  return <button type={type} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick}>{children}</button>;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, placeholder, icon: Icon, readOnly = false }) => (
  <div>
    {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
      </div>
      <input type={type} name={id} id={id} className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 pl-10 text-sm focus:ring-blue-500 focus:border-blue-500 ${readOnly ? 'bg-gray-100' : ''}`} placeholder={placeholder} value={value} onChange={onChange} readOnly={readOnly} />
    </div>
  </div>
);

// --- Main Unified Profile Page Component ---
const UserProfilePage = ({ currentUserId = 'user123' }) => {
  const isCurrentUser = currentUserId === dummyUserProfile.id;

  // State for viewing and editing
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(dummyUserProfile);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profilePic, setProfilePic] = useState<string | null>(profile.profilePic);
  const [coverImage, setCoverImage] = useState<string | null>(profile.profileBanner);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [activeEditTab, setActiveEditTab] = useState<'profile' | 'security'>('profile');

  // State for post filtering (from your template)
  const [activeFilter, setActiveFilter] = useState<'latest' | 'oldest' | 'most-popular'>('latest');

  // Memoized post filtering
  const filteredPosts = useMemo(() => {
    let sortedPosts = [...dummyUserPosts];
    switch (activeFilter) {
      case 'most-popular': return sortedPosts.sort((a, b) => b.views - a.views);
      case 'latest': return sortedPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      case 'oldest': return sortedPosts.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
      default: return sortedPosts;
    }
  }, [activeFilter]);

  // --- Event Handlers ---
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setProfile(p => ({ ...p, [e.target.name]: e.target.value }));
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPasswords(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (name === 'profilePic') setProfilePic(result);
        else if (name === 'coverImage') setCoverImage(result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification({ message: '', type: '' });

    if (activeEditTab === 'security' && passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setNotification({ message: 'New passwords do not match!', type: 'error' });
      return;
    }

    console.log("Profile updated:", { ...profile, profilePic, coverImage });
    if (activeEditTab === 'security' && passwords.newPassword) {
      console.log("Password changed successfully.");
    }

    setNotification({ message: 'Changes saved successfully!', type: 'success' });
    setIsEditing(false); // Exit editing mode on save
    setTimeout(() => setNotification({ message: '', type: '' }), 5000);
  };

  const handleCancel = () => {
    setProfile(dummyUserProfile); // Revert changes
    setProfilePic(dummyUserProfile.profilePic);
    setCoverImage(dummyUserProfile.profileBanner);
    setIsEditing(false);
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-16">
        {/* --- Profile Banner --- */}
        <div className="relative w-full h-48 sm:h-64 bg-gray-200 overflow-hidden">
          <img src={coverImage || ''} alt="Profile Banner" className="w-full h-full object-cover" />
          {isEditing && (
            <label htmlFor="coverImage" className="absolute top-4 right-4 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white">
              <Camera className="w-5 h-5 text-gray-700" />
              <input id="coverImage" name="coverImage" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
            </label>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          {/* --- Profile Header --- */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
                <div className="relative group -mt-16">
                  <img className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" src={profilePic || ''} alt={profile.username} />
                  {isEditing && (
                    <label htmlFor="profilePic" className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                      <input id="profilePic" name="profilePic" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-gray-600 text-sm">@{profile.username}</p>
                  {!isEditing && <p className="text-gray-600 text-sm max-w-lg mt-2">{profile.bio}</p>}
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-gray-700 text-sm">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {profile.followers.toLocaleString()} Followers</span>
                    <span className="flex items-center gap-1"><UserPlus className="w-4 h-4" /> {profile.following.toLocaleString()} Following</span>
                    <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {profile.postsCount.toLocaleString()} Posts</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 flex items-center gap-3">
                {isCurrentUser ? (
                  !isEditing && <Button onClick={() => setIsEditing(true)}><Pencil className="w-4 h-4 mr-2" />Edit Profile</Button>
                ) : (
                  <>
                    <Button>Follow</Button>
                    <Button variant="outline">Message</Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* --- EDITING FORM --- */}
          {isEditing && (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-8">
              {/* --- Edit Navigation Tabs --- */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                  <button type="button" onClick={() => setActiveEditTab('profile')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeEditTab === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Edit Profile</button>
                  <button type="button" onClick={() => setActiveEditTab('security')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeEditTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Security</button>
                </nav>
              </div>
              <div className="mt-6">
                {activeEditTab === 'profile' && (
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-3"><InputField id="fullName" label="Full Name" type="text" value={profile.fullName} onChange={handleProfileChange} placeholder="John Doe" icon={User} /></div>
                    <div className="sm:col-span-3"><InputField id="username" label="Username" type="text" value={profile.username} onChange={handleProfileChange} placeholder="yourusername" icon={User} /></div>
                    <div className="sm:col-span-6"><InputField id="email" label="Email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="you@example.com" icon={Mail} /></div>
                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea id="bio" name="bio" rows={3} className="mt-1 shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2" value={profile.bio} onChange={handleProfileChange} />
                    </div>
                  </div>
                )}
                {activeEditTab === 'security' && (
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6"><InputField id="currentPassword" label="Current Password" type="password" value={passwords.currentPassword} onChange={handlePasswordChange} placeholder="••••••••" icon={Lock} /></div>
                    <div className="sm:col-span-3"><InputField id="newPassword" label="New Password" type="password" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="••••••••" icon={Lock} /></div>
                    <div className="sm:col-span-3"><InputField id="confirmPassword" label="Confirm Password" type="password" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="••••••••" icon={Lock} /></div>
                  </div>
                )}
              </div>
              {/* --- Action Buttons --- */}
              <div className="pt-8 flex justify-between items-center">
                <div>
                  {notification.message && <div className={`flex items-center gap-2 text-sm ${notification.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}{notification.message}</div>}
                </div>
                <div className="flex gap-x-3">
                  <Button type="button" variant="outline" onClick={handleCancel}><X className="w-4 h-4 mr-2" />Cancel</Button>
                  <Button type="submit"><Save className="w-4 h-4 mr-2" />Save Changes</Button>
                </div>
              </div>
            </form>
          )}

          {/* --- PROFILE CONTENT (Posts, About, etc.) --- */}
          {!isEditing && (
            <>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-2"><Button variant="outline" className="font-semibold text-blue-600">Posts</Button></div>
                  <div className="flex flex-wrap justify-center sm:justify-end gap-2">
                    <Button variant={activeFilter === 'latest' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('latest')}>Latest</Button>
                    <Button variant={activeFilter === 'most-popular' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('most-popular')}>Most Popular</Button>
                    <Button variant={activeFilter === 'oldest' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('oldest')}>Oldest</Button>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group">
                    <div className="relative w-full h-48 bg-gray-200"><img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mt-2 space-x-3">
                        <span className="flex items-center gap-1"><Eye size={14} /> {post.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={14} /> {post.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;

