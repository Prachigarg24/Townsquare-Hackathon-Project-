
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ThumbsUp, ThumbsDown, Vote } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  daysLeft: number;
  hasVoted?: boolean;
  userVote?: string;
}

interface VotingPollProps {
  poll: PollData;
  onVote?: (pollId: string, optionId: string) => void;
}

const VotingPoll: React.FC<VotingPollProps> = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(poll.userVote || null);
  const [localPoll, setLocalPoll] = useState<PollData>(poll);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an option to vote.",
        variant: "destructive"
      });
      return;
    }

    setIsVoting(true);
    
    // Update local state to show immediate feedback
    const updatedOptions = localPoll.options.map(option => {
      if (option.id === selectedOption) {
        return { ...option, votes: option.votes + (localPoll.hasVoted ? 0 : 1) };
      }
      if (localPoll.userVote === option.id && localPoll.userVote !== selectedOption) {
        return { ...option, votes: Math.max(0, option.votes - 1) };
      }
      return option;
    });

    const updatedTotalVotes = localPoll.hasVoted ? localPoll.totalVotes : localPoll.totalVotes + 1;
    
    setLocalPoll({
      ...localPoll,
      options: updatedOptions,
      totalVotes: updatedTotalVotes,
      hasVoted: true,
      userVote: selectedOption
    });

    // Call external handler if provided
    if (onVote) {
      onVote(localPoll.id, selectedOption);
    }

    toast({
      title: "Vote submitted!",
      description: "Your opinion has been recorded.",
    });
    
    setIsVoting(false);
  };

  const getPercentage = (votes: number): number => {
    if (localPoll.totalVotes === 0) return 0;
    return Math.round((votes / localPoll.totalVotes) * 100);
  };

  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Vote className="h-5 w-5 mr-2 text-civic-primary" />
          {localPoll.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedOption || ""} 
          onValueChange={setSelectedOption}
          className="space-y-2"
        >
          {localPoll.options.map((option) => (
            <div key={option.id} className="flex flex-col space-y-1">
              <div className="flex items-center">
                <RadioGroupItem value={option.id} id={option.id} className="mr-2" />
                <label htmlFor={option.id} className="text-sm font-medium flex-grow cursor-pointer">
                  {option.text}
                </label>
                <span className="text-sm font-medium">{getPercentage(option.votes)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-civic-primary transition-all duration-500 ease-out" 
                  style={{ width: `${getPercentage(option.votes)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>{localPoll.totalVotes} votes</span>
          <span>{localPoll.daysLeft} {localPoll.daysLeft === 1 ? 'day' : 'days'} left</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleVote} 
          className="w-full bg-civic-primary hover:bg-civic-primary/90" 
          disabled={isVoting || !selectedOption}
        >
          {localPoll.hasVoted ? "Update Vote" : "Submit Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VotingPoll;
