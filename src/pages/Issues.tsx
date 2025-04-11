
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronDown, Filter, MapPin, MessageSquare, Plus, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { issues, neighborhoods } from '@/services/mockData';
import Navbar from '@/components/layout/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['new', 'in-progress', 'resolved']);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(neighborhoods.map(n => n.name));
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['infrastructure', 'safety', 'parks', 'traffic', 'other']);

  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhoods(prev => 
      prev.includes(neighborhood)
        ? prev.filter(n => n !== neighborhood)
        : [...prev, neighborhood]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredIssues = issues.filter(issue => {
    return (
      (searchTerm === "" || 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        issue.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      selectedStatuses.includes(issue.status) &&
      selectedNeighborhoods.includes(issue.neighborhood) &&
      selectedCategories.includes(issue.category)
    );
  });

  const newCount = filteredIssues.filter(issue => issue.status === 'new').length;
  const progressCount = filteredIssues.filter(issue => issue.status === 'in-progress').length;
  const resolvedCount = filteredIssues.filter(issue => issue.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Neighborhood Issues</h1>
            <p className="mt-2 opacity-90">Report, track, and resolve local problems affecting your neighborhood</p>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto max-w-md">
            <Input
              type="text"
              placeholder="Search issues..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-new" 
                          checked={selectedStatuses.includes('new')} 
                          onCheckedChange={() => handleStatusChange('new')}
                        />
                        <Label htmlFor="status-new" className="ml-2">New</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-progress" 
                          checked={selectedStatuses.includes('in-progress')} 
                          onCheckedChange={() => handleStatusChange('in-progress')}
                        />
                        <Label htmlFor="status-progress" className="ml-2">In Progress</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="status-resolved" 
                          checked={selectedStatuses.includes('resolved')} 
                          onCheckedChange={() => handleStatusChange('resolved')}
                        />
                        <Label htmlFor="status-resolved" className="ml-2">Resolved</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Neighborhood</h4>
                    <ScrollArea className="h-32">
                      <div className="space-y-2">
                        {neighborhoods.map(neighborhood => (
                          <div key={neighborhood.id} className="flex items-center">
                            <Checkbox 
                              id={`neighborhood-${neighborhood.id}`} 
                              checked={selectedNeighborhoods.includes(neighborhood.name)} 
                              onCheckedChange={() => handleNeighborhoodChange(neighborhood.name)}
                            />
                            <Label htmlFor={`neighborhood-${neighborhood.id}`} className="ml-2">{neighborhood.name}</Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="category-infrastructure" 
                          checked={selectedCategories.includes('infrastructure')} 
                          onCheckedChange={() => handleCategoryChange('infrastructure')}
                        />
                        <Label htmlFor="category-infrastructure" className="ml-2">Infrastructure</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="category-safety" 
                          checked={selectedCategories.includes('safety')} 
                          onCheckedChange={() => handleCategoryChange('safety')}
                        />
                        <Label htmlFor="category-safety" className="ml-2">Safety</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="category-parks" 
                          checked={selectedCategories.includes('parks')} 
                          onCheckedChange={() => handleCategoryChange('parks')}
                        />
                        <Label htmlFor="category-parks" className="ml-2">Parks</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="category-traffic" 
                          checked={selectedCategories.includes('traffic')} 
                          onCheckedChange={() => handleCategoryChange('traffic')}
                        />
                        <Label htmlFor="category-traffic" className="ml-2">Traffic</Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="category-other" 
                          checked={selectedCategories.includes('other')} 
                          onCheckedChange={() => handleCategoryChange('other')}
                        />
                        <Label htmlFor="category-other" className="ml-2">Other</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button className="flex items-center gap-2 bg-civic-primary hover:bg-civic-dark">
              <Plus className="h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Issues ({filteredIssues.length})</TabsTrigger>
            <TabsTrigger value="new">New ({newCount})</TabsTrigger>
            <TabsTrigger value="progress">In Progress ({progressCount})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {filteredIssues.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No issues match your current filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="space-y-4">
            {filteredIssues.filter(issue => issue.status === 'new').map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {filteredIssues.filter(issue => issue.status === 'new').length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No new issues match your current filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            {filteredIssues.filter(issue => issue.status === 'in-progress').map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {filteredIssues.filter(issue => issue.status === 'in-progress').length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No in-progress issues match your current filters</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-4">
            {filteredIssues.filter(issue => issue.status === 'resolved').map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {filteredIssues.filter(issue => issue.status === 'resolved').length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No resolved issues match your current filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface IssueCardProps {
  issue: {
    id: string;
    title: string;
    description: string;
    neighborhood: string;
    status: 'new' | 'in-progress' | 'resolved';
    date: string;
    category: string;
    votes: number;
    comments: number;
  };
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-grow">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <span className={`w-3 h-3 rounded-full inline-block ${
                  issue.status === 'new' ? 'bg-civic-primary' :
                  issue.status === 'in-progress' ? 'bg-civic-accent' :
                  'bg-civic-secondary'
                }`}></span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">{issue.title}</h3>
                <p className="text-gray-500 mt-1">{issue.description}</p>
                
                <div className="flex flex-wrap items-center mt-3 text-sm text-gray-500 gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {issue.neighborhood}
                  </div>
                  <div>
                    Category: <span className="capitalize">{issue.category}</span>
                  </div>
                  <div>
                    Reported: {issue.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex md:flex-col items-center md:items-end justify-end gap-4 md:gap-2">
            <span className={`issue-badge ${
              issue.status === 'new' ? 'issue-badge-new' :
              issue.status === 'in-progress' ? 'issue-badge-progress' :
              'issue-badge-resolved'
            } md:mb-2`}>
              {issue.status === 'new' ? 'New' : 
              issue.status === 'in-progress' ? 'In Progress' : 
              'Resolved'}
            </span>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {issue.votes}
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {issue.comments}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Issues;
