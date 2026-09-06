import type { Category, EventItem } from "../types";

export const CATEGORIES: Category[] = ["Market", "Music", "Sports", "Volunteer"];

/** Feed shown on the Home screen ("Events Around You"). */
export const FEED_EVENTS: EventItem[] = [
  {
    id: "naga-sunday-market",
    title: "Naga Sunday Market",
    category: "Market",
    monthLabel: "AUG",
    day: "23",
    dateLine: "Sun, Aug 23 · 10:00 AM",
    location: "Plaza Rizal, Naga City",
    going: 12,
    hosting: true,
  },
  {
    id: "acoustic-avenue",
    title: "Acoustic Nights at the Avenue",
    category: "Music",
    monthLabel: "AUG",
    day: "25",
    dateLine: "Tue, Aug 25 · 6:30 PM",
    location: "Avenue Square, Magsaysay Ave",
    going: 45,
  },
  {
    id: "naga-river-cleanup",
    title: "Naga River Clean-up Drive",
    category: "Volunteer",
    monthLabel: "AUG",
    day: "29",
    dateLine: "Sat, Aug 29 · 8:00 AM",
    location: "Naga River Esplanade",
    going: 8,
  },
  {
    id: "frisbee-friendly",
    title: "Weekend Frisbee Friendly",
    category: "Sports",
    monthLabel: "SEP",
    day: "02",
    dateLine: "Wed, Sep 02 · 5:00 PM",
    location: "Metro Naga Sports Complex",
    going: 19,
  },
];

/** Schedule entries used on the Calendar screen. */
export const SCHEDULE = [
  {
    date: "August 23",
    items: [
      {
        title: "Naga Sunday Market",
        time: "10:00 AM - 2:00 PM",
        location: "Plaza Rizal, Naga City",
      },
      {
        title: "Sunset Yoga at the Plaza",
        time: "5:30 PM - 6:30 PM",
        location: "Plaza Quezon, Naga City",
      },
    ],
  },
];

/** Events the current user is attending (Profile screen). */
export const GOING_LIST = [
  {
    title: "Acoustic Nights at the Avenue",
    meta: "Aug 25 · 6:30 PM",
    location: "Avenue Square, Magsaysay Ave",
  },
  {
    title: "Naga River Clean-up Drive",
    meta: "Aug 29 · 8:00 AM",
    location: "Naga River Esplanade",
  },
];

/** Map bottom-sheet mini cards. */
export const MAP_CARDS = [
  { title: "Naga Sunday Market", location: "Plaza Rizal, Naga City", category: "Market" as Category },
  { title: "Acoustic Nights", location: "Magsaysay Ave", category: "Music" as Category },
  { title: "Frisbee Friendly", location: "Metro Naga Sports Complex", category: "Sports" as Category },
];

/** Recent scans on the QR check-in screen. */
export const RECENT_CHECKINS = [
  { id: "CMN-29402", ago: "2 min ago" },
  { id: "CMN-08341", ago: "10 min ago" },
  { id: "CMN-77321", ago: "24 min ago" },
];

/** Attendance roster. */
export const ATTENDEES = [
  { name: "Maria Santos", id: "CMN-29402", status: "IN" as const },
  { name: "Jose dela Cruz", id: "CMN-08341", status: "IN" as const },
  { name: "Andrea Reyes", id: "CMN-77321", status: "IN" as const },
  { name: "Paolo Mendoza", id: "CMN-49018", status: "IN" as const },
  { name: "Kristine Bautista", id: "CMN-88102", status: "IN" as const },
  { name: "Miguel Torres", id: "CMN-31045", status: "PENDING" as const },
  { name: "Angela Villanueva", id: "CMN-99120", status: "PENDING" as const },
  { name: "Carlo Aquino", id: "CMN-10492", status: "PENDING" as const },
];

export const USER = {
  name: "Andrei Santos",
  firstName: "Andrei",
  email: "andrei.santos@community.com",
  memberSince: "Member since Mar 2024",
  initials: "AS",
  membershipId: "CMN-40217",
};
