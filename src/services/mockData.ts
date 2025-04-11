
import { AlertTriangle, FileText, MessageSquare, ThumbsUp, ThumbsDown, Users, Vote } from 'lucide-react';

export interface Neighborhood {
  id: string;
  name: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  status: 'new' | 'in-progress' | 'resolved';
  date: string;
  category: 'infrastructure' | 'safety' | 'parks' | 'traffic' | 'other';
  votes: number;
  comments: number;
}

export interface Legislation {
  id: string;
  title: string;
  summary: string;
  plainLanguageSummary: string;
  status: 'proposed' | 'in-committee' | 'voting-soon' | 'passed' | 'rejected';
  date: string;
  impactAreas: string[];
  votes: { yes: number; no: number };
}

export interface Representative {
  id: string;
  name: string;
  position: string;
  district: string;
  party: string;
  imageUrl: string;
  contact: {
    email: string;
    phone: string;
    office: string;
  };
  responseRate: number;
  upcomingEvents: string[];
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  neighborhood: string;
  organizer: string;
  date: string;
  participants: number;
  category: 'cleanup' | 'safety' | 'education' | 'community' | 'other';
}

export interface ImpactMetric {
  id: string;
  name: string;
  icon: any;
  value: number;
  change: number;
  description: string;
}

export const neighborhoods: Neighborhood[] = [
  { id: '1', name: 'Downtown' },
  { id: '2', name: 'Westside' },
  { id: '3', name: 'Northpark' },
  { id: '4', name: 'Eastview' },
  { id: '5', name: 'Southbay' },
];

export const issues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection of Main and Oak causing damage to vehicles.',
    neighborhood: 'Downtown',
    status: 'new',
    date: '2023-04-05',
    category: 'infrastructure',
    votes: 45,
    comments: 12
  },
  {
    id: '2',
    title: 'Broken streetlight on Elm Ave',
    description: 'Streetlight has been out for 2 weeks creating safety concerns at night.',
    neighborhood: 'Westside',
    status: 'in-progress',
    date: '2023-04-02',
    category: 'safety',
    votes: 32,
    comments: 8
  },
  {
    id: '3',
    title: 'Park playground equipment damaged',
    description: 'Swing set and slide at Central Park have damage making them unsafe for children.',
    neighborhood: 'Northpark',
    status: 'resolved',
    date: '2023-03-28',
    category: 'parks',
    votes: 67,
    comments: 24
  },
  {
    id: '4',
    title: 'Speeding concerns on Riverside Drive',
    description: 'Cars are regularly exceeding the speed limit near the elementary school.',
    neighborhood: 'Eastview',
    status: 'new',
    date: '2023-04-07',
    category: 'traffic',
    votes: 89,
    comments: 31
  },
  {
    id: '5',
    title: 'Graffiti on community center',
    description: 'New graffiti appeared on the south wall of the community center.',
    neighborhood: 'Southbay',
    status: 'in-progress',
    date: '2023-04-01',
    category: 'other',
    votes: 21,
    comments: 7
  },
];

export const legislation: Legislation[] = [
  {
    id: '1',
    title: 'Ordinance 2023-42: Zoning Amendment for Downtown Development',
    summary: 'An ordinance amending Chapter 17.30 of the Municipal Code related to downtown zoning districts, modifying permitted uses, building heights, and parking requirements to encourage mixed-use development.',
    plainLanguageSummary: 'This proposal would change rules about what can be built downtown. It would allow taller buildings, reduce required parking spaces, and make it easier to build apartments above stores and restaurants. The goal is to create more housing and businesses in the downtown area.',
    status: 'in-committee',
    date: '2023-03-15',
    impactAreas: ['Downtown', 'Housing', 'Business'],
    votes: { yes: 3, no: 2 }
  },
  {
    id: '2',
    title: 'Resolution 2023-15: Climate Action Plan Adoption',
    summary: 'A resolution adopting the 2023 Climate Action Plan as an element of the Comprehensive Plan and establishing greenhouse gas reduction targets of 50% by 2030 and carbon neutrality by 2050.',
    plainLanguageSummary: 'This plan sets goals for reducing pollution that causes climate change. It includes switching city vehicles to electric, installing more solar panels, planting trees, and encouraging walking and biking. The city aims to cut pollution in half by 2030 and reach zero emissions by 2050.',
    status: 'voting-soon',
    date: '2023-04-01',
    impactAreas: ['Environment', 'Transportation', 'Energy'],
    votes: { yes: 4, no: 1 }
  },
  {
    id: '3',
    title: 'Ordinance 2023-36: Parks and Recreation Fee Schedule',
    summary: 'An ordinance establishing fees for the use of city parks, recreation facilities, and program participation for the 2023-2024 fiscal year pursuant to Municipal Code Section 12.15.080.',
    plainLanguageSummary: 'This updates the prices for using city parks and joining recreation programs. Most fees will increase by about 3%. The proposal includes a new discount program for low-income residents and veterans. Youth sports programs will see smaller increases to keep them affordable for families.',
    status: 'passed',
    date: '2023-02-28',
    impactAreas: ['Parks', 'Recreation', 'Fees'],
    votes: { yes: 7, no: 0 }
  },
  {
    id: '4',
    title: 'Resolution 2023-18: Traffic Calming Implementation Plan',
    summary: 'A resolution approving the Traffic Calming Implementation Plan for fiscal year 2023-2024, authorizing the expenditure of $1.2 million for the design and construction of traffic calming measures throughout the city.',
    plainLanguageSummary: 'This plan would spend $1.2 million to make streets safer in neighborhoods with speeding problems. Projects include speed bumps, raised crosswalks, traffic circles, and narrower streets. Areas near schools and parks will get top priority, along with streets where accidents have happened.',
    status: 'proposed',
    date: '2023-04-05',
    impactAreas: ['Transportation', 'Safety', 'Budget'],
    votes: { yes: 2, no: 2 }
  },
  {
    id: '5',
    title: 'Ordinance 2023-39: Short-Term Rental Regulations',
    summary: 'An ordinance adding Chapter 5.80 to the Municipal Code establishing regulations for short-term rentals, including permitting requirements, operational standards, enforcement provisions, and associated fees.',
    plainLanguageSummary: 'This would create new rules for Airbnb and similar short-term rentals. Owners would need a permit, pay hotel taxes, have liability insurance, and follow noise and parking rules. The number of rentals would be limited in each neighborhood, and owners would need to live on-site for some types of rentals.',
    status: 'rejected',
    date: '2023-03-10',
    impactAreas: ['Housing', 'Tourism', 'Neighborhoods'],
    votes: { yes: 2, no: 5 }
  },
];

export const representatives: Representative[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Mayor',
    district: 'Citywide',
    party: 'Independent',
    imageUrl: 'placeholder.svg',
    contact: {
      email: 'mayor@example.city.gov',
      phone: '555-123-4567',
      office: 'City Hall, Room 200'
    },
    responseRate: 78,
    upcomingEvents: ['Town Hall: April 15, 6:30pm', 'Business Breakfast: April 22, 8:00am']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    position: 'City Council',
    district: 'District 1',
    party: 'Progressive',
    imageUrl: 'placeholder.svg',
    contact: {
      email: 'district1@example.city.gov',
      phone: '555-123-4568',
      office: 'City Hall, Room 220'
    },
    responseRate: 92,
    upcomingEvents: ['District Office Hours: April 14, 9:00am-12:00pm', 'Community Clean-up: April 29, 10:00am']
  },
  {
    id: '3',
    name: 'James Williams',
    position: 'City Council',
    district: 'District 2',
    party: 'Independent',
    imageUrl: 'placeholder.svg',
    contact: {
      email: 'district2@example.city.gov',
      phone: '555-123-4569',
      office: 'City Hall, Room 225'
    },
    responseRate: 45,
    upcomingEvents: ['Budget Committee Meeting: April 11, 2:00pm', 'Neighborhood Forum: April 20, 7:00pm']
  },
  {
    id: '4',
    name: 'Lisa Chen',
    position: 'City Council',
    district: 'District 3',
    party: 'Unity',
    imageUrl: 'placeholder.svg',
    contact: {
      email: 'district3@example.city.gov',
      phone: '555-123-4570',
      office: 'City Hall, Room 230'
    },
    responseRate: 85,
    upcomingEvents: ['Park Improvement Town Hall: April 12, 6:00pm', 'Youth Advisory Committee: April 18, 4:00pm']
  },
  {
    id: '5',
    name: 'David Thompson',
    position: 'City Council',
    district: 'District 4',
    party: 'Centrist',
    imageUrl: 'placeholder.svg',
    contact: {
      email: 'district4@example.city.gov',
      phone: '555-123-4571',
      office: 'City Hall, Room 235'
    },
    responseRate: 62,
    upcomingEvents: ['Transportation Committee Meeting: April 19, 5:30pm', 'Senior Center Visit: April 25, 10:00am']
  },
];

export const initiatives: Initiative[] = [
  {
    id: '1',
    title: 'Downtown Community Garden Expansion',
    description: 'Expanding the community garden at Central Park with 10 new plots and an educational area for workshops.',
    neighborhood: 'Downtown',
    organizer: 'Green City Coalition',
    date: '2023-04-22',
    participants: 35,
    category: 'community'
  },
  {
    id: '2',
    title: 'Westside Neighborhood Watch Program',
    description: 'Establishing a neighborhood watch program with regular patrols and coordination with local police.',
    neighborhood: 'Westside',
    organizer: 'Westside Community Association',
    date: '2023-04-29',
    participants: 28,
    category: 'safety'
  },
  {
    id: '3',
    title: 'Northpark Creek Cleanup',
    description: 'Volunteer event to remove trash and invasive species from Northpark Creek to improve water quality and habitat.',
    neighborhood: 'Northpark',
    organizer: 'Friends of Northpark Creek',
    date: '2023-05-06',
    participants: 42,
    category: 'cleanup'
  },
  {
    id: '4',
    title: 'Eastview After-School Tutoring Program',
    description: 'Free tutoring program for elementary and middle school students at the Eastview Community Center.',
    neighborhood: 'Eastview',
    organizer: 'Eastview Education Foundation',
    date: '2023-04-18',
    participants: 15,
    category: 'education'
  },
  {
    id: '5',
    title: 'Southbay Farmers Market Launch',
    description: 'New weekly farmers market featuring local produce, crafts, and food vendors at Southbay Park.',
    neighborhood: 'Southbay',
    organizer: 'Southbay Business Association',
    date: '2023-05-13',
    participants: 50,
    category: 'community'
  },
];

export const impactMetrics: ImpactMetric[] = [
  {
    id: '1',
    name: 'Issues Reported',
    icon: AlertTriangle,
    value: 256,
    change: 12,
    description: 'Neighborhood issues reported in the last 30 days'
  },
  {
    id: '2',
    name: 'Issues Resolved',
    icon: FileText,
    value: 189,
    change: 8,
    description: 'Neighborhood issues resolved in the last 30 days'
  },
  {
    id: '3',
    name: 'Feedback Submitted',
    icon: MessageSquare,
    value: 423,
    change: 15,
    description: 'Pieces of citizen feedback submitted to representatives'
  },
  {
    id: '4',
    name: 'Community Votes',
    icon: Vote,
    value: 1847,
    change: 32,
    description: 'Votes cast on community issues and initiatives'
  },
  {
    id: '5',
    name: 'Initiative Participation',
    icon: Users,
    value: 312,
    change: -5,
    description: 'Citizens participating in community initiatives'
  },
];
