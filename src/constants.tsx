import { Tv, Monitor, Zap, Film, Smartphone, TabletSmartphone, Laptop, Box, Cpu, Clock, Trophy, Headset, Globe, Euro, Map, Languages, Star } from 'lucide-react';
import React from 'react';

export type Channel = {
  name: string;
  flag?: string;
  icon?: string | React.ReactNode;
};

export type ChannelCategory = {
  id: string;
  name: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  special?: boolean;
  locked?: boolean;
  channels: Channel[];
};

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  {
    id: 'north_america',
    name: 'North America',
    sub: 'USA, Canada & Caribbean',
    icon: <Globe className="h-5 w-5" />,
    color: 'text-primary',
    channels: [
      { name: 'United States of America', flag: '🇺🇸' },
      { name: 'Canada', flag: '🇨🇦' },
      { name: 'Caribbean', flag: '🏝️' },
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    sub: 'Western, Central, and Eastern Europe',
    icon: <Euro className="h-5 w-5" />,
    color: 'text-secondary',
    channels: [
      { name: 'Albania', flag: '🇦🇱' },
      { name: 'Belgium', flag: '🇧🇪' },
      { name: 'Bulgaria', flag: '🇧🇬' },
      { name: 'Czech', flag: '🇨🇿' },
      { name: 'Estonia', flag: '🇪🇪' },
      { name: 'France', flag: '🇫🇷' },
      { name: 'Germany', flag: '🇩🇪' },
      { name: 'Greece', flag: '🇬🇷' },
      { name: 'Hungary', flag: '🇭🇺' },
      { name: 'Italy', flag: '🇮🇹' },
      { name: 'Latvia', flag: '🇱🇻' },
      { name: 'Lithuania', flag: '🇱🇹' },
      { name: 'Malta', flag: '🇲🇹' },
      { name: 'Netherlands', flag: '🇳🇱' },
      { name: 'Poland', flag: '🇵🇱' },
      { name: 'Portugal', flag: '🇵🇹' },
      { name: 'Romania', flag: '🇷🇴' },
      { name: 'Slovenia', flag: '🇸🇮' },
      { name: 'Spain', flag: '🇪🇸' },
      { name: 'Swiss/Austria', flag: '🇨🇭' },
      { name: 'Ukraine', flag: '🇺🇦' },
      { name: 'United Kingdom', flag: '🇬🇧' },
      { name: 'Yugoslavia', flag: '🇷🇸' },
    ]
  },
  {
    id: 'asia',
    name: 'Asia',
    sub: 'Pan-Asian broadcasting networks',
    icon: <Languages className="h-5 w-5" />,
    color: 'text-tertiary',
    channels: [
      { name: 'Afghanistan', flag: '🇦🇫' },
      { name: 'Armenia', flag: '🇦🇲' },
      { name: 'Azerbaijan', flag: '🇦🇿' },
      { name: 'China/HK', flag: '🇨🇳' },
      { name: 'Georgia/Kazach', flag: '🇬🇪' },
      { name: 'India', flag: '🇮🇳' },
      { name: 'India Punjab', flag: '🇮🇳' },
      { name: 'Indonesia', flag: '🇮🇩' },
      { name: 'Iran', flag: '🇮🇷' },
      { name: 'Israel', flag: '🇮🇱' },
      { name: 'Japan', flag: '🇯🇵' },
      { name: 'Korea', flag: '🇰🇷' },
      { name: 'Kurdistan', flag: '☀️' },
      { name: 'Malaysia', flag: '🇲🇾' },
      { name: 'Myanmar', flag: '🇲🇲' },
      { name: 'Pakistan', flag: '🇵🇰' },
      { name: 'Philippines', flag: '🇵🇭' },
      { name: 'Singapore', flag: '🇸🇬' },
      { name: 'Taiwan', flag: '🇹🇼' },
      { name: 'Tajikistan', flag: '🇹🇯' },
      { name: 'Thailand', flag: '🇹🇭' },
      { name: 'Turkey', flag: '🇹🇷' },
      { name: 'Uzbekistan', flag: '🇺🇿' },
      { name: 'Vietnam', flag: '🇻🇳' },
    ]
  },
  {
    id: 'oceania',
    name: 'Oceania',
    sub: 'Australia & New Zealand',
    icon: <Map className="h-5 w-5" />,
    color: 'text-primary',
    channels: [
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'New Zealand', flag: '🇳🇿' },
    ]
  },
  {
    id: 'south_america',
    name: 'South America',
    sub: 'South America & Latin Regions',
    icon: <Map className="h-5 w-5" />,
    color: 'text-white',
    channels: [
      { name: 'Brazil', flag: '🇧🇷' },
      { name: 'Latino', flag: '🌎' },
      { name: 'Suriname', flag: '🇸🇷' },
    ]
  },
  {
    id: 'scandinavia',
    name: 'Scandinavia / Nordic',
    sub: 'Northern Europe',
    icon: <Map className="h-5 w-5" />,
    color: 'text-secondary',
    channels: [
      { name: 'SCA - Denmark', flag: '🇩🇰' },
      { name: 'SCA - Finland', flag: '🇫🇮' },
      { name: 'SCA - Iceland', flag: '🇮🇸' },
      { name: 'SCA - Norway', flag: '🇳🇴' },
      { name: 'SCA - Sweden', flag: '🇸🇪' },
    ]
  },
  {
    id: 'africa_me_regional',
    name: 'Africa / Middle East / Regional',
    sub: 'Africa, Middle East & Eurasia',
    icon: <Globe className="h-5 w-5" />,
    color: 'text-tertiary',
    channels: [
      { name: 'Africa', flag: '🌍' },
      { name: 'Arabic', flag: '☪️' },
      { name: 'Russia', flag: '🇷🇺' },
    ]
  },
  {
    id: 'special',
    name: 'Special Channels',
    sub: 'Premium 4K and specialized live content',
    icon: <Star className="h-5 w-5 fill-primary" />,
    color: 'text-primary',
    special: true,
    channels: [
      { name: '24/7 English', flag: '🇬🇧' },
      { name: '4K UHD 3840P', flag: '4K' },
      { name: 'Formule 1 + MotoGP', flag: '🏍️' },
      { name: 'Horse Racing', flag: '🏇' },
      { name: 'Music Concerts', flag: '🎵' },
      { name: 'Sports Live', flag: '🏆' },
      { name: 'Viaplay PPV', flag: '🎬' },
      { name: 'World Cricket', flag: '🏏' },
      { name: 'Adults', flag: '🔞' }
    ]
  }
];

export const STATS = [
  { value: '30K+', label: 'Channels', icon: <Tv className="h-6 w-6 text-blue-400" /> },
  { value: '160K+', label: 'Movies & Series', icon: <Film className="h-6 w-6 text-purple-400" /> },
  { value: 'HD / 4K', label: 'Ultra HD Quality', icon: <Monitor className="h-6 w-6 text-orange-400" /> },
  { value: '99.9%', label: 'Uptime', icon: <Zap className="h-6 w-6 text-green-400" /> }
];

export const PRICING = [
  {
    name: '1 Month',
    price: '15',
    period: '/mo',
    features: [
      'Premium Servers',
      'Customizable Channel list',
      '30000+ Global Live Channels',
      'PPV SPORTS/MOVIES/EVENTS INCLUDED',
      'NHL | NFL | NBA | MLS',
      'OVER 160,000+ MOVIES/TVSHOWS/XXX FILMS',
      'SAME DAY ACTIVATIONS',
      '3 day CATCH UP ',
      'EPG TV Guide 24/7',
      'Anti Buffering Technology 10.1',
      '99.9% Server Uptime',
      'All Devices are Supported',
      'SUPER EASY HOW-TO SETUPS'
    ],
    accent: 'text-blue-500'
  },
  {
    name: '3 Months',
    price: '35',
    period: '/3mo',
    sub: 'Save $10 ($11.66/mo)',
    features: [
      'Premium Servers',
      'Customizable Channel list',
      '30000+ Global Live Channels',
      'PPV SPORTS/MOVIES/EVENTS INCLUDED',
      'NHL | NFL | NBA | MLS',
      'OVER 160,000+ MOVIES/TVSHOWS/XXX FILMS',
      'SAME DAY ACTIVATIONS',
      '3 day CATCH UP ',
      'EPG TV Guide 24/7',
      'Anti Buffering Technology 10.1',
      '99.9% Server Uptime',
      'All Devices are Supported',
      'SUPER EASY HOW-TO SETUPS'
    ],
    accent: 'text-indigo-500'
  },
  {
    name: '6 Months',
    price: '60',
    period: '/6mo',
    sub: 'Save $30 ($10/mo)',
    popular: true,
    features: [
      'Premium Servers',
      'Customizable Channel list',
      '30000+ Global Live Channels',
      'PPV SPORTS/MOVIES/EVENTS INCLUDED',
      'NHL | NFL | NBA | MLS',
      'OVER 160,000+ MOVIES/TVSHOWS/XXX FILMS',
      'SAME DAY ACTIVATIONS',
      '3 day CATCH UP ',
      'EPG TV Guide 24/7',
      'Anti Buffering Technology 10.1',
      '99.9% Server Uptime',
      'All Devices are Supported',
      'SUPER EASY HOW-TO SETUPS'
    ],
    accent: 'text-purple-500'
  },
  {
    name: '12 Months',
    price: '100',
    period: '/yr',
    sub: 'Save $80 ($8.33/mo)',
    features: [
      'Premium Servers',
      'Customizable Channel list',
      '30000+ Global Live Channels',
      'PPV SPORTS/MOVIES/EVENTS INCLUDED',
      'NHL | NFL | NBA | MLS',
      'OVER 160,000+ MOVIES/TVSHOWS/XXX FILMS',
      'SAME DAY ACTIVATIONS',
      '3 day CATCH UP ',
      'EPG TV Guide 24/7',
      'Anti Buffering Technology 10.1',
      '99.9% Server Uptime',
      'All Devices are Supported',
      'SUPER EASY HOW-TO SETUPS'
    ],
    accent: 'text-pink-500'
  },
  {
    name: '24 Months',
    price: '160',
    period: '/2yr',
    sub: 'Save $200 ($6.66/mo)',
    features: [
      'Premium Servers',
      'Customizable Channel list',
      '30000+ Global Live Channels',
      'PPV SPORTS/MOVIES/EVENTS INCLUDED',
      'NHL | NFL | NBA | MLS',
      'OVER 160,000+ MOVIES/TVSHOWS/XXX FILMS',
      'SAME DAY ACTIVATIONS',
      '3 day CATCH UP ',
      'EPG TV Guide 24/7',
      'Anti Buffering Technology 10.1',
      '99.9% Server Uptime',
      'All Devices are Supported',
      'SUPER EASY HOW-TO SETUPS'
    ],
    accent: 'text-orange-500'
  }
];

export const PLATFORMS = [
  { name: 'Android', icon: <Smartphone className="h-4 w-4" /> },
  { name: 'iPhone / iPad', icon: <TabletSmartphone className="h-4 w-4" /> },
  { name: 'Smart TV', icon: <Tv className="h-4 w-4" /> },
  { name: 'Firestick', icon: <Zap className="h-4 w-4" /> },
  { name: 'Windows', icon: <Monitor className="h-4 w-4" /> },
  { name: 'macOS', icon: <Laptop className="h-4 w-4" /> },
  { name: 'MAG Box', icon: <Box className="h-4 w-4" /> },
  { name: 'Enigma2', icon: <Cpu className="h-4 w-4" /> },
];

export const SUBSCRIPTION_FEATURES = [
  {
    title: 'Live Channels',
    desc: 'Sports, news, entertainment, and international channels from 50+ countries - updated continuously.',
    icon: <Tv className="h-6 w-6 text-blue-400" />,
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Movies & Series',
    desc: 'Full on-demand VOD library including the latest movies, TV series, documentaries, and kids content.',
    icon: <Film className="h-6 w-6 text-purple-400" />,
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: '3-Day Catch-up Playback',
    desc: 'Missed a live broadcast? Rewind up to 3 days on supported channels and watch at your own pace.',
    icon: <Clock className="h-6 w-6 text-orange-400" />,
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    title: 'Pay-Per-View Events',
    desc: 'Live TPV sporting events including boxing, UFC, and WWE-included without any extra charges.',
    icon: <Trophy className="h-6 w-6 text-red-500" />,
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'FHD, 4K & 8K Quality',
    desc: 'Adaptive bitrate streaming automatically delivers the best quality your connection can handle.',
    icon: <Monitor className="h-6 w-6 text-emerald-400" />,
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: '24/7 Real Support',
    desc: 'Live chat and Telegram support around the clock. Real people - no bots, no queues.',
    icon: <Headset className="h-6 w-6 text-cyan-400" />,
    borderColor: 'border-cyan-500',
    bgColor: 'bg-cyan-500/10'
  }
];
