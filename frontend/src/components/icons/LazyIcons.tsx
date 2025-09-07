'use client';

import { Suspense, lazy } from 'react';

// Lazy load individual icons to improve tree-shaking
const Building2 = lazy(() => import('lucide-react').then(mod => ({ default: mod.Building2 })));
const BarChart3 = lazy(() => import('lucide-react').then(mod => ({ default: mod.BarChart3 })));
const Calendar = lazy(() => import('lucide-react').then(mod => ({ default: mod.Calendar })));
const Users = lazy(() => import('lucide-react').then(mod => ({ default: mod.Users })));
const MessageSquare = lazy(() => import('lucide-react').then(mod => ({ default: mod.MessageSquare })));
const Settings = lazy(() => import('lucide-react').then(mod => ({ default: mod.Settings })));
const Shield = lazy(() => import('lucide-react').then(mod => ({ default: mod.Shield })));
const Globe = lazy(() => import('lucide-react').then(mod => ({ default: mod.Globe })));
const Smartphone = lazy(() => import('lucide-react').then(mod => ({ default: mod.Smartphone })));
const Headphones = lazy(() => import('lucide-react').then(mod => ({ default: mod.Headphones })));
const FileText = lazy(() => import('lucide-react').then(mod => ({ default: mod.FileText })));
const TrendingUp = lazy(() => import('lucide-react').then(mod => ({ default: mod.TrendingUp })));
const Wifi = lazy(() => import('lucide-react').then(mod => ({ default: mod.Wifi })));
const Lock = lazy(() => import('lucide-react').then(mod => ({ default: mod.Lock })));
const Bell = lazy(() => import('lucide-react').then(mod => ({ default: mod.Bell })));
const ChevronRight = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight })));
const ChevronDown = lazy(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })));
const Home = lazy(() => import('lucide-react').then(mod => ({ default: mod.Home })));
const Search = lazy(() => import('lucide-react').then(mod => ({ default: mod.Search })));
const Plus = lazy(() => import('lucide-react').then(mod => ({ default: mod.Plus })));
const Menu = lazy(() => import('lucide-react').then(mod => ({ default: mod.Menu })));
const X = lazy(() => import('lucide-react').then(mod => ({ default: mod.X })));
const LogOut = lazy(() => import('lucide-react').then(mod => ({ default: mod.LogOut })));
const User = lazy(() => import('lucide-react').then(mod => ({ default: mod.User })));
const HelpCircle = lazy(() => import('lucide-react').then(mod => ({ default: mod.HelpCircle })));
const DollarSign = lazy(() => import('lucide-react').then(mod => ({ default: mod.DollarSign })));
const Clock = lazy(() => import('lucide-react').then(mod => ({ default: mod.Clock })));
const AlertTriangle = lazy(() => import('lucide-react').then(mod => ({ default: mod.AlertTriangle })));
const Phone = lazy(() => import('lucide-react').then(mod => ({ default: mod.Phone })));
const Mail = lazy(() => import('lucide-react').then(mod => ({ default: mod.Mail })));
const CheckCircle = lazy(() => import('lucide-react').then(mod => ({ default: mod.CheckCircle })));
const XCircle = lazy(() => import('lucide-react').then(mod => ({ default: mod.XCircle })));
const Eye = lazy(() => import('lucide-react').then(mod => ({ default: mod.Eye })));
const Star = lazy(() => import('lucide-react').then(mod => ({ default: mod.Star })));
const MapPin = lazy(() => import('lucide-react').then(mod => ({ default: mod.MapPin })));
const Send = lazy(() => import('lucide-react').then(mod => ({ default: mod.Send })));
const Paperclip = lazy(() => import('lucide-react').then(mod => ({ default: mod.Paperclip })));
const Smile = lazy(() => import('lucide-react').then(mod => ({ default: mod.Smile })));
const Flag = lazy(() => import('lucide-react').then(mod => ({ default: mod.Flag })));
const CreditCard = lazy(() => import('lucide-react').then(mod => ({ default: mod.CreditCard })));
const Download = lazy(() => import('lucide-react').then(mod => ({ default: mod.Download })));
const MoreVertical = lazy(() => import('lucide-react').then(mod => ({ default: mod.MoreVertical })));

// Icon wrapper with Suspense fallback
const IconWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Suspense fallback={<div className={`animate-pulse bg-gray-200 rounded ${className}`} />}>
    {children}
  </Suspense>
);

// Export lazy icons with fallbacks
export const LazyBuilding2 = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Building2 {...props} />
  </IconWrapper>
);

export const LazyBarChart3 = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <BarChart3 {...props} />
  </IconWrapper>
);

export const LazyCalendar = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Calendar {...props} />
  </IconWrapper>
);

export const LazyUsers = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Users {...props} />
  </IconWrapper>
);

export const LazyMessageSquare = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <MessageSquare {...props} />
  </IconWrapper>
);

export const LazySettings = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Settings {...props} />
  </IconWrapper>
);

export const LazyShield = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Shield {...props} />
  </IconWrapper>
);

export const LazyGlobe = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Globe {...props} />
  </IconWrapper>
);

export const LazySmartphone = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Smartphone {...props} />
  </IconWrapper>
);

export const LazyHeadphones = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Headphones {...props} />
  </IconWrapper>
);

export const LazyFileText = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <FileText {...props} />
  </IconWrapper>
);

export const LazyTrendingUp = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <TrendingUp {...props} />
  </IconWrapper>
);

export const LazyWifi = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Wifi {...props} />
  </IconWrapper>
);

export const LazyLock = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Lock {...props} />
  </IconWrapper>
);

export const LazyBell = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Bell {...props} />
  </IconWrapper>
);

export const LazyChevronRight = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <ChevronRight {...props} />
  </IconWrapper>
);

export const LazyChevronDown = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <ChevronDown {...props} />
  </IconWrapper>
);

export const LazyHome = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Home {...props} />
  </IconWrapper>
);

export const LazySearch = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Search {...props} />
  </IconWrapper>
);

export const LazyPlus = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Plus {...props} />
  </IconWrapper>
);

export const LazyMenu = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Menu {...props} />
  </IconWrapper>
);

export const LazyX = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <X {...props} />
  </IconWrapper>
);

export const LazyLogOut = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <LogOut {...props} />
  </IconWrapper>
);

export const LazyUser = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <User {...props} />
  </IconWrapper>
);

export const LazyHelpCircle = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <HelpCircle {...props} />
  </IconWrapper>
);

export const LazyDollarSign = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <DollarSign {...props} />
  </IconWrapper>
);

export const LazyClock = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Clock {...props} />
  </IconWrapper>
);

export const LazyAlertTriangle = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <AlertTriangle {...props} />
  </IconWrapper>
);

export const LazyPhone = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Phone {...props} />
  </IconWrapper>
);

export const LazyMail = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Mail {...props} />
  </IconWrapper>
);

export const LazyCheckCircle = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <CheckCircle {...props} />
  </IconWrapper>
);

export const LazyXCircle = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <XCircle {...props} />
  </IconWrapper>
);

export const LazyEye = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Eye {...props} />
  </IconWrapper>
);

export const LazyStar = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Star {...props} />
  </IconWrapper>
);

export const LazyMapPin = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <MapPin {...props} />
  </IconWrapper>
);

export const LazySend = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Send {...props} />
  </IconWrapper>
);

export const LazyPaperclip = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Paperclip {...props} />
  </IconWrapper>
);

export const LazySmile = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Smile {...props} />
  </IconWrapper>
);


export const LazyFlag = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Flag {...props} />
  </IconWrapper>
);

export const LazyCreditCard = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <CreditCard {...props} />
  </IconWrapper>
);

export const LazyDownload = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <Download {...props} />
  </IconWrapper>
);

export const LazyMoreVertical = (props: any) => (
  <IconWrapper className="h-5 w-5">
    <MoreVertical {...props} />
  </IconWrapper>
);
