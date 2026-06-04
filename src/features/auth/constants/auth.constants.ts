// Projectil repeated static values centralized in one file

import {
  Users,
  Target,
  Megaphone,
  BarChart3,
  Calendar,
  MessageSquare,
} from 'lucide-react';


export const AUTH_ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
}

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'crm_user',
}

export const MIN_SWIPE_DISTANCE = 50;

export const AUTH_CONTENT_SLIDES = [
    {
      icon: Target,
      title: "Track Leads & Deals",
      description: "Monitor your sales pipeline and convert more leads into customers with powerful tracking tools."
    },
    {
      icon: Megaphone,
      title: "Manage Campaigns",
      description: "Launch and manage marketing campaigns across multiple channels from a single dashboard."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team. Assign tasks, share updates, and close deals faster."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get actionable insights with detailed reports and custom dashboards."
    },
    {
      icon: Calendar,
      title: "Schedule Activities",
      description: "Never miss a follow-up. Schedule calls, meetings, and tasks with reminders."
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Connect with customers via WhatsApp, SMS, and email all in one place."
    }
  ];