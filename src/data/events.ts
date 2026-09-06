import type { Category, EventItem } from "../types";

export const CATEGORIES: Category[] = ["Market", "Music", "Sports", "Volunteer"];

/** Feed shown on the Home screen ("Events Around You"). */
export const FEED_EVENTS: EventItem[] = [
  {
    id: "farmers-market",
    title: "Sunday Farmers Market",
    category: "Market",
    monthLabel: "AUG",
    day: "23",
    dateLine: "Sun, Aug 23 · 10:00 AM",
    location: "Oakwood Community Park",
    going: 12,
    hosting: true,
  },
  {
    id: "acoustic-sessions",
    title: "Acoustic Backyard Sessions",
    category: "Music",
    monthLabel: "AUG",
    day: "25",
    dateLine: "Tue, Aug 25 · 6:30 PM",
    location: "The Local Brew Garden",
    going: 45,
  },
  {
    id: "park-cleanup",
    title: "Community Park Clean-up",
    category: "Volunteer",
    monthLabel: "AUG",
    day: "29",
    dateLine: "Sat, Aug 29 · 8:00 AM",
    location: "Greenwood Nature Reserve",
    going: 8,
  },
  {
    id: "frisbee-match",
    title: "Friendly Frisbee Match",
    category: "Sports",
    monthLabel: "SEP",
    day: "02",
    dateLine: "Wed, Sep 02 · 5:00 PM",
    location: "Eastside Soccer Fields",
    going: 19,
  },
];

/** Schedule entries used on the Calendar screen. */
export const SCHEDULE = [
  {
    date: "August 23",
    items: [
      {
        title: "Sunday Farmers Market",
        time: "10:00 AM - 2:00 PM",
        location: "Oakwood Community Park",
      },
      {
        title: "Park Sunset Yoga Session",
        time: "5:30 PM - 6:30 PM",
        location: "Oakwood Lawn A",
      },
    ],
  },
];

/** Events the current user is attending (Profile screen). */
export const GOING_LIST = [
  {
    title: "Acoustic Backyard Sessions",
    meta: "Aug 25 · 6:30 PM",
    location: "The Local Brew Garden",
  },
  {
    title: "Community Park Clean-up",
    meta: "Aug 29 · 8:00 AM",
    location: "Greenwood Nature Reserve",
  },
];

/** Map bottom-sheet mini cards. */
export const MAP_CARDS = [
  { title: "Sunday Farmers Market", location: "Oakwood Community Park", category: "Market" as Category },
  { title: "Acoustic Sessions", location: "Local Brew Garden", category: "Music" as Category },
  { title: "Frisbee Match", location: "Eastside Soccer Fields", category: "Sports" as Category },
];

/** Recent scans on the QR check-in screen. */
export const RECENT_CHECKINS = [
  { id: "CMN-29402", ago: "2 min ago" },
  { id: "CMN-08341", ago: "10 min ago" },
  { id: "CMN-77321", ago: "24 min ago" },
];

/** Attendance roster. */
export const ATTENDEES = [
  { name: "Jane Cooper", id: "CMN-29402", status: "IN" as const },
  { name: "Wade Warren", id: "CMN-08341", status: "IN" as const },
  { name: "Esther Howard", id: "CMN-77321", status: "IN" as const },
  { name: "Cameron Williamson", id: "CMN-49018", status: "IN" as const },
  { name: "Jenny Wilson", id: "CMN-88102", status: "IN" as const },
  { name: "Kristin Watson", id: "CMN-31045", status: "PENDING" as const },
  { name: "Albert Flores", id: "CMN-99120", status: "PENDING" as const },
  { name: "Leslie Alexander", id: "CMN-10492", status: "PENDING" as const },
];

export const USER = {
  name: "Jordan Diaz",
  firstName: "Jordan",
  email: "jordan.diaz@community.com",
  memberSince: "Member since Mar 2024",
  initials: "JD",
  membershipId: "CMN-40217",
};
