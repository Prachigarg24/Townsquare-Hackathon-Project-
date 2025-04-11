import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell, FileText, MapPin, MessageSquare, Users, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { neighborhoods, issues, legislation, representatives, initiatives } from '@/services/mockData';

const Index = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('1');
  
  const neighborhood = neighborhoods.find(n => n.id === selectedNeighborhood)?.name || 'All Neighborhoods';
  const filteredIssues = selectedNeighborhood !== 'all' 
    ? issues.filter(issue => issue.neighborhood === neighborhood).slice(0, 3) 
    : issues.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold">Your voice matters in <span className="text-civic-accent">{neighborhood}</span></h1>
            <p className="mt-4 text-lg opacity-90">Stay informed, provide feedback, and shape the future of your community with real-time updates and direct channels to your representatives.</p>
            <div className="mt-6 flex items-center space-x-4">
              <Select 
                value={selectedNeighborhood} 
                onValueChange={setSelectedNeighborhood}
              >
                <SelectTrigger className="w-[220px] bg-white text-black">
                  <SelectValue placeholder="Select neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Neighborhoods</SelectItem>
                  {neighborhoods.map(neighborhood => (
                    <SelectItem key={neighborhood.id} value={neighborhood.id}>
                      {neighborhood.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-white text-civic-primary hover:bg-gray-100">
                Get Updates <Bell className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-5 w-5 mr-2 text-civic-primary" />
                Neighborhood Issues
              </CardTitle>
              <CardDescription>Report and track local problems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map(issue => (
                  <div key={issue.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{issue.title}</h3>
                      <span className={`issue-badge ${
                        issue.status === 'new' ? 'issue-badge-new' :
                        issue.status === 'in-progress' ? 'issue-badge-progress' :
                        'issue-badge-resolved'
                      }`}>
                        {issue.status === 'new' ? 'New' : 
                         issue.status === 'in-progress' ? 'In Progress' : 
                         'Resolved'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{issue.neighborhood}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No issues found in this neighborhood</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/issues" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Issues <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 mr-2 text-civic-primary" />
                Recent Legislation
              </CardTitle>
              <CardDescription>Simplified summaries of local laws</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {legislation.slice(0, 3).map(bill => (
                <div key={bill.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{bill.title.split(':')[0]}</h3>
                    <span className={`issue-badge ${
                      bill.status === 'proposed' || bill.status === 'in-committee' ? 'issue-badge-new' :
                      bill.status === 'voting-soon' ? 'issue-badge-progress' :
                      bill.status === 'passed' ? 'issue-badge-resolved' :
                      'bg-gray-500 text-white'
                    }`}>
                      {bill.status.split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{bill.plainLanguageSummary}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link to="/legislation" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Legislation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-xl">
                <Users className="h-5 w-5 mr-2 text-civic-primary" />
                Community Initiatives
              </CardTitle>
              <CardDescription>Neighborhood-led improvement projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {initiatives.slice(0, 3).map(initiative => (
                <div key={initiative.id} className="border-b pb-3 last:border-0">
                  <h3 className="font-medium">{initiative.title}</h3>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-gray-500">{initiative.neighborhood}</p>
                    <p className="text-sm text-gray-500">{initiative.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link to="/initiatives" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Initiatives <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MessageSquare className="h-5 w-5 mr-2 text-civic-primary" />
                Your Representatives
              </CardTitle>
              <CardDescription>Direct communication channels to local officials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {representatives.slice(0, 3).map(rep => (
                  <div key={rep.id} className="flex items-center border-b pb-4 last:border-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img src={rep.imageUrl} alt={rep.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{rep.name}</h3>
                      <p className="text-sm text-gray-500">{rep.position}, {rep.district}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-civic-primary">{rep.responseRate}%</span>
                      <p className="text-xs text-gray-500">Response rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/representatives" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Representatives <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Vote className="h-5 w-5 mr-2 text-civic-primary" />
                Active Community Polls
              </CardTitle>
              <CardDescription>Make your voice heard on local issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">Should the city invest in more bike lanes downtown?</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="w-full max-w-md">
                      <div className="flex items-center">
                        <span className="w-10 text-sm font-medium">Yes</span>
                        <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-civic-primary" style={{ width: '67%' }}></div>
                        </div>
                        <span className="w-10 text-sm font-medium text-right">67%</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="w-10 text-sm font-medium">No</span>
                        <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-400" style={{ width: '33%' }}></div>
                        </div>
                        <span className="w-10 text-sm font-medium text-right">33%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">458 votes • 2 days left</p>
                </div>
                
                <div>
                  <h3 className="font-medium">What should be the priority for park improvements?</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center border-2 mr-2"></span>
                      Playground equipment
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center border-2 mr-2"></span>
                      Sports fields
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center border-2 mr-2"></span>
                      Walking trails
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center border-2 mr-2"></span>
                      Dog park
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">342 votes • 5 days left</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/polls" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Polls <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
