import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, Shield, Palette, Bell, Lock, Camera, Check, AlertTriangle } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

// Simple Toggle Switch Component
const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-zinc-100 font-medium text-sm">{label}</p>
      {description && <p className="text-zinc-500 text-xs mt-0.5">{description}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        enabled ? "bg-violet-600" : "bg-zinc-700"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          enabled ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  </div>
);

export const SettingsPage = () => {
  const { user } = useSelector(state => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [saveError, setSaveError] = useState('');

  // Form States
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [appearanceData, setAppearanceData] = useState({
    theme: 'dark',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    newFollowers: true,
    comments: true,
    likes: false,
    systemUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    allowTagging: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      setSaveError('Name is required');
      return;
    }
    setSaveError('');
    console.log("Saving profile:", profileData);
    // TODO: dispatch action
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setSaveError('All password fields are required');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveError('New passwords do not match');
      return;
    }
    setSaveError('');
    console.log("Saving password:", passwordData);
    // TODO: dispatch action
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Profile Settings</h2>
              <p className="text-zinc-400 text-sm mb-6">Manage your public identity on ImagineX.</p>
            </div>
            
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
                <div className="relative group cursor-pointer">
                  <div className="h-24 w-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-white mb-2 text-center sm:text-left">Profile Picture</p>
                  <Button type="button" variant="secondary" size="sm">Change Avatar</Button>
                </div>
              </div>

              {saveError && activeTab === 'profile' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> {saveError}
                </div>
              )}

              <div className="space-y-4">
                <Input 
                  label="Display Name" 
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  placeholder="Your name"
                />
                <Input 
                  label="Email Address" 
                  value={user?.email || 'user@example.com'}
                  disabled
                  className="bg-zinc-900/50 text-zinc-500"
                />
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Bio</label>
                  <textarea 
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell us a little about yourself..."
                    className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        );

      case 'account':
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Account Security</h2>
              <p className="text-zinc-400 text-sm mb-6">Manage your password and account status.</p>
            </div>

            <form onSubmit={handlePasswordSave} className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
              <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
              
              {saveError && activeTab === 'account' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> {saveError}
                </div>
              )}

              <div className="space-y-4">
                <Input 
                  label="Current Password" 
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
                <Input 
                  label="New Password" 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
                <Input 
                  label="Confirm New Password" 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit">Update Password</Button>
              </div>
            </form>

            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
              <h3 className="text-lg font-medium text-red-500 mb-2">Danger Zone</h3>
              <p className="text-zinc-400 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <Button type="button" variant="danger">Delete Account</Button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Appearance</h2>
              <p className="text-zinc-400 text-sm mb-6">Customize how ImagineX looks on your device.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">Theme</label>
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <button 
                    onClick={() => setAppearanceData({...appearanceData, theme: 'dark'})}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors",
                      appearanceData.theme === 'dark' ? "bg-violet-600/20 border-violet-500 text-violet-300" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"
                    )}
                  >
                    Dark
                    {appearanceData.theme === 'dark' && <Check className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={() => setAppearanceData({...appearanceData, theme: 'light'})}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors opacity-50 cursor-not-allowed",
                      appearanceData.theme === 'light' ? "bg-violet-600/20 border-violet-500 text-violet-300" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                    )}
                    disabled
                  >
                    Light (Soon)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">Language</label>
                <select 
                  value={appearanceData.language}
                  onChange={(e) => setAppearanceData({...appearanceData, language: e.target.value})}
                  className="w-full max-w-xs h-10 bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
              <p className="text-zinc-400 text-sm mb-6">Choose what you want to be notified about.</p>
            </div>

            <div className="space-y-2 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 divide-y divide-zinc-800/50">
              <Toggle 
                enabled={notifications.newFollowers} 
                onChange={(val) => setNotifications({...notifications, newFollowers: val})}
                label="New Followers"
                description="Receive a notification when someone follows you."
              />
              <Toggle 
                enabled={notifications.comments} 
                onChange={(val) => setNotifications({...notifications, comments: val})}
                label="Comments on Posts"
                description="Receive a notification when someone comments on your creations."
              />
              <Toggle 
                enabled={notifications.likes} 
                onChange={(val) => setNotifications({...notifications, likes: val})}
                label="Likes on Posts"
                description="Receive a notification when someone likes your creations."
              />
              <Toggle 
                enabled={notifications.systemUpdates} 
                onChange={(val) => setNotifications({...notifications, systemUpdates: val})}
                label="System Updates"
                description="Important updates about the ImagineX platform."
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Privacy</h2>
              <p className="text-zinc-400 text-sm mb-6">Control who can see your content and activity.</p>
            </div>

            <div className="space-y-2 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 divide-y divide-zinc-800/50">
              <Toggle 
                enabled={privacy.privateAccount} 
                onChange={(val) => setPrivacy({...privacy, privateAccount: val})}
                label="Private Account"
                description="Only approved followers can see your creations."
              />
              <Toggle 
                enabled={privacy.showOnlineStatus} 
                onChange={(val) => setPrivacy({...privacy, showOnlineStatus: val})}
                label="Show Online Status"
                description="Let others see when you are active on ImagineX."
              />
              <Toggle 
                enabled={privacy.allowTagging} 
                onChange={(val) => setPrivacy({...privacy, allowTagging: val})}
                label="Allow Tagging"
                description="Let other users tag you in their posts or comments."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Settings</h1>
            <p className="text-zinc-400">Manage your account preferences and settings.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Sidebar / Top Navigation */}
            <div className="w-full lg:w-64 shrink-0">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar border-b lg:border-b-0 lg:border-r border-zinc-800 lg:pr-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSaveError('');
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal w-full",
                        activeTab === tab.id 
                          ? "bg-violet-600/10 text-violet-400" 
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full pb-10">
              {renderContent()}
            </div>
            
          </div>
        </div>
      </main>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
