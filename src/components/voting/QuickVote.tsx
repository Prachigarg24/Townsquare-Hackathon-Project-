
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickVoteProps {
  itemId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  onVote?: (itemId: string, vote: 'up' | 'down' | null) => void;
}

const QuickVote: React.FC<QuickVoteProps> = ({ 
  itemId, 
  initialUpvotes = 0, 
  initialDownvotes = 0,
  onVote 
}) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const handleVote = (vote: 'up' | 'down') => {
    // If already voted the same way, remove the vote
    if (userVote === vote) {
      if (vote === 'up') {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
      setUserVote(null);
      if (onVote) onVote(itemId, null);
      toast({
        title: "Vote removed",
        description: "Your vote has been removed.",
      });
    } 
    // If voted the opposite way, switch the vote
    else if (userVote !== null) {
      if (vote === 'up') {
        setUpvotes(prev => prev + 1);
        setDownvotes(prev => prev - 1);
      } else {
        setUpvotes(prev => prev - 1);
        setDownvotes(prev => prev + 1);
      }
      setUserVote(vote);
      if (onVote) onVote(itemId, vote);
      toast({
        title: "Vote changed",
        description: `You ${vote === 'up' ? 'upvoted' : 'downvoted'} this item.`,
      });
    }
    // If not voted yet, add the vote
    else {
      if (vote === 'up') {
        setUpvotes(prev => prev + 1);
      } else {
        setDownvotes(prev => prev + 1);
      }
      setUserVote(vote);
      if (onVote) onVote(itemId, vote);
      toast({
        title: "Vote recorded",
        description: `You ${vote === 'up' ? 'upvoted' : 'downvoted'} this item.`,
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => handleVote('up')}
        className={`vote-button ${userVote === 'up' ? 'vote-button-active' : 'vote-button-inactive'}`}
        aria-label="Upvote"
      >
        <ThumbsUp className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">{upvotes}</span>
      
      <button 
        onClick={() => handleVote('down')}
        className={`vote-button ${userVote === 'down' ? 'vote-button-active' : 'vote-button-inactive'}`}
        aria-label="Downvote"
      >
        <ThumbsDown className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">{downvotes}</span>
    </div>
  );
};

export default QuickVote;
