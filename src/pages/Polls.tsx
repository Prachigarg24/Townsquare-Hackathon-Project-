
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Vote, HelpCircle, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import VotingPoll, { PollData } from '@/components/voting/VotingPoll';
import QuickVote from '@/components/voting/QuickVote';

// Sample poll data
const initialPolls: PollData[] = [
  {
    id: '1',
    question: 'Should the city invest in more bike lanes downtown?',
    options: [
      { id: '1-1', text: 'Yes', votes: 67 },
      { id: '1-2', text: 'No', votes: 33 },
    ],
    totalVotes: 100,
    daysLeft: 2,
  },
  {
    id: '2',
    question: 'What should be the priority for park improvements?',
    options: [
      { id: '2-1', text: 'Playground equipment', votes: 45 },
      { id: '2-2', text: 'Sports fields', votes: 20 },
      { id: '2-3', text: 'Walking trails', votes: 30 },
      { id: '2-4', text: 'Dog park', votes: 15 },
    ],
    totalVotes: 110,
    daysLeft: 5,
  },
  {
    id: '3',
    question: 'How often do you use public transportation?',
    options: [
      { id: '3-1', text: 'Daily', votes: 30 },
      { id: '3-2', text: 'Weekly', votes: 25 },
      { id: '3-3', text: 'Monthly', votes: 15 },
      { id: '3-4', text: 'Rarely or never', votes: 40 },
    ],
    totalVotes: 110,
    daysLeft: 3,
  },
];

// Sample community proposals with quick voting
const communityProposals = [
  {
    id: 'p1',
    title: 'Install solar-powered streetlights in River Park',
    author: 'Alex Thompson',
    date: '2 days ago',
    upvotes: 24,
    downvotes: 3,
  },
  {
    id: 'p2',
    title: 'Create a community garden on vacant lot at Cedar & 5th',
    author: 'Maria Rodriguez',
    date: '5 days ago',
    upvotes: 42,
    downvotes: 7,
  },
  {
    id: 'p3',
    title: 'Start a monthly neighborhood clean-up program',
    author: 'James Wilson',
    date: '1 week ago',
    upvotes: 38,
    downvotes: 2,
  },
  {
    id: 'p4',
    title: 'Add more recycling bins in commercial areas',
    author: 'Sarah Johnson',
    date: '2 weeks ago',
    upvotes: 31,
    downvotes: 5,
  },
];

const Polls = () => {
  const [polls, setPolls] = useState<PollData[]>(initialPolls);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVote = (pollId: string, optionId: string) => {
    // In a real app, this would send the vote to a backend
    console.log(`Vote recorded for poll ${pollId}, option ${optionId}`);
  };

  const handleProposalVote = (proposalId: string, vote: 'up' | 'down' | null) => {
    // In a real app, this would send the vote to a backend
    console.log(`${vote === null ? 'Vote removed' : vote === 'up' ? 'Upvote' : 'Downvote'} for proposal ${proposalId}`);
  };

  const filteredPolls = polls.filter(poll => 
    poll.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProposals = communityProposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="civic-container py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Community Voting</h1>
            <p className="text-gray-500">Vote on local issues and see what your neighbors think</p>
          </div>
          <div className="w-full md:w-64">
            <Input
              placeholder="Search polls and proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <Tabs defaultValue="polls" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="polls">Official Polls</TabsTrigger>
            <TabsTrigger value="proposals">Community Proposals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="polls" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolls.map(poll => (
                <VotingPoll 
                  key={poll.id} 
                  poll={poll} 
                  onVote={handleVote}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="proposals" className="mt-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-civic-primary/10 flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2 text-civic-primary" />
                  Community Proposals
                </h3>
                <Button variant="secondary" size="sm" className="text-xs">
                  Submit New Proposal
                </Button>
              </div>
              
              <div className="divide-y">
                {filteredProposals.map(proposal => (
                  <div key={proposal.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <QuickVote 
                          itemId={proposal.id} 
                          initialUpvotes={proposal.upvotes} 
                          initialDownvotes={proposal.downvotes}
                          onVote={handleProposalVote} 
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium">{proposal.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>Proposed by {proposal.author}</span>
                          <span className="mx-2">•</span>
                          <span>{proposal.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <h3 className="font-medium flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-civic-primary" />
                How Community Proposals Work
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Community proposals are ideas submitted by residents to improve our neighborhood. 
                The most popular proposals (based on voting) are reviewed by the community board 
                each month. If you have an idea, submit a proposal and gather support!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Polls;
