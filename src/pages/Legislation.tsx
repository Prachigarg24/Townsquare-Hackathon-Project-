
import React, { useState } from 'react';
import { ChevronDown, FileText, Search, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { legislation } from '@/services/mockData';
import Navbar from '@/components/layout/Navbar';

const Legislation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const filteredLegislation = legislation.filter(item => {
    return (
      (searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plainLanguageSummary.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "all" || item.status === selectedStatus)
    );
  });

  const statusCounts = {
    proposed: legislation.filter(l => l.status === 'proposed').length,
    inCommittee: legislation.filter(l => l.status === 'in-committee').length,
    votingSoon: legislation.filter(l => l.status === 'voting-soon').length,
    passed: legislation.filter(l => l.status === 'passed').length,
    rejected: legislation.filter(l => l.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Local Legislation</h1>
            <p className="mt-2 opacity-90">Stay informed about laws and policies affecting your community with plain language summaries</p>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto max-w-md">
            <Input
              type="text"
              placeholder="Search legislation..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="w-full sm:w-auto">
            <Select 
              value={selectedStatus} 
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="proposed">Proposed</SelectItem>
                <SelectItem value="in-committee">In Committee</SelectItem>
                <SelectItem value="voting-soon">Voting Soon</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({legislation.length})</TabsTrigger>
            <TabsTrigger value="proposed">Proposed ({statusCounts.proposed})</TabsTrigger>
            <TabsTrigger value="in-committee">In Committee ({statusCounts.inCommittee})</TabsTrigger>
            <TabsTrigger value="voting-soon">Voting Soon ({statusCounts.votingSoon})</TabsTrigger>
            <TabsTrigger value="passed">Passed ({statusCounts.passed})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({statusCounts.rejected})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredLegislation.map(item => (
              <LegislationCard key={item.id} legislation={item} />
            ))}
            {filteredLegislation.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No legislation matches your search</p>
              </div>
            )}
          </TabsContent>
          
          {['proposed', 'in-committee', 'voting-soon', 'passed', 'rejected'].map(status => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filteredLegislation.filter(item => item.status === status).map(item => (
                <LegislationCard key={item.id} legislation={item} />
              ))}
              {filteredLegislation.filter(item => item.status === status).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No {status.replace('-', ' ')} legislation matches your search</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

interface LegislationCardProps {
  legislation: {
    id: string;
    title: string;
    summary: string;
    plainLanguageSummary: string;
    status: 'proposed' | 'in-committee' | 'voting-soon' | 'passed' | 'rejected';
    date: string;
    impactAreas: string[];
    votes: { yes: number; no: number };
  };
}

const LegislationCard: React.FC<LegislationCardProps> = ({ legislation }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const statusColor = 
    legislation.status === 'proposed' ? 'bg-blue-100 text-blue-800' :
    legislation.status === 'in-committee' ? 'bg-purple-100 text-purple-800' :
    legislation.status === 'voting-soon' ? 'bg-amber-100 text-amber-800' :
    legislation.status === 'passed' ? 'bg-green-100 text-green-800' :
    'bg-red-100 text-red-800';
  
  const statusText = legislation.status.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FileText className="h-5 w-5 text-civic-primary" />
          </div>
          <div className="ml-3 flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-medium">{legislation.title}</h3>
              <Badge className={`${statusColor} capitalize whitespace-nowrap`}>
                {statusText}
              </Badge>
            </div>
            
            <div className="mt-1 text-sm text-gray-500">
              Introduced: {legislation.date}
            </div>
            
            <div className="mt-3 space-y-2">
              <p className="text-gray-700">{legislation.plainLanguageSummary}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {legislation.impactAreas.map((area, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-civic-primary flex items-center">
                  {isOpen ? 'Hide original text' : 'Show original text'}
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm border-l-2 border-gray-200 pl-3 py-2 text-gray-700">
                {legislation.summary}
              </CollapsibleContent>
            </Collapsible>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="rounded-r-none border-r-0">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Support ({legislation.votes.yes})
                </Button>
                <Button variant="outline" size="sm" className="rounded-l-none">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Oppose ({legislation.votes.no})
                </Button>
              </div>
              
              <Button variant="ghost" size="sm">
                Share Feedback
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Legislation;
