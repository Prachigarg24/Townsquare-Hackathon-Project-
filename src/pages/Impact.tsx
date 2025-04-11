
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { impactMetrics, neighborhoods } from '@/services/mockData';
import Navbar from '@/components/layout/Navbar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Impact = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("month");
  
  const monthlyData = [
    { name: 'Jan', issues: 45, resolved: 32, participation: 112 },
    { name: 'Feb', issues: 52, resolved: 41, participation: 127 },
    { name: 'Mar', issues: 48, resolved: 38, participation: 118 },
    { name: 'Apr', issues: 61, resolved: 52, participation: 143 },
    { name: 'May', issues: 55, resolved: 48, participation: 135 },
    { name: 'Jun', issues: 67, resolved: 58, participation: 156 },
  ];
  
  const policyImpactData = [
    { policy: 'Traffic Calming', positiveImpact: 65, negativeImpact: 15, neutral: 20 },
    { policy: 'Park Renovation', positiveImpact: 78, negativeImpact: 8, neutral: 14 },
    { policy: 'Zoning Changes', positiveImpact: 42, negativeImpact: 38, neutral: 20 },
    { policy: 'Rental Regulations', positiveImpact: 55, negativeImpact: 30, neutral: 15 },
    { policy: 'Bike Lanes', positiveImpact: 60, negativeImpact: 25, neutral: 15 },
  ];
  
  const neighborhoodParticipationData = [
    { name: 'Downtown', participation: 78 },
    { name: 'Westside', participation: 65 },
    { name: 'Northpark', participation: 82 },
    { name: 'Eastview', participation: 58 },
    { name: 'Southbay', participation: 70 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Impact Dashboard</h1>
            <p className="mt-2 opacity-90">Visualize how community engagement and policies affect your neighborhood</p>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <Select 
              value={selectedNeighborhood} 
              onValueChange={setSelectedNeighborhood}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Neighborhood" />
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
            
            <Select 
              value={selectedTimeframe} 
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {impactMetrics.slice(0, 3).map(metric => (
            <Card key={metric.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-3xl font-semibold">{metric.value}</span>
                      <span className={`ml-2 text-sm font-medium ${metric.change >= 0 ? 'text-civic-secondary' : 'text-red-500'}`}>
                        {metric.change >= 0 ? (
                          <span className="flex items-center">
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                            {metric.change}%
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                            {Math.abs(metric.change)}%
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <metric.icon className="h-5 w-5 text-civic-primary" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="policy">Policy Impact</TabsTrigger>
            <TabsTrigger value="participation">Participation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Community Engagement Trends</CardTitle>
                <CardDescription>Issue reporting and resolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="issues" 
                        stroke="#0EA5E9" 
                        activeDot={{ r: 8 }} 
                        name="Issues Reported"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="#22C55E" 
                        name="Issues Resolved"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="participation" 
                        stroke="#F97316" 
                        name="Citizen Participation"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Neighborhood Participation</CardTitle>
                  <CardDescription>Citizen engagement across neighborhoods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {neighborhoodParticipationData.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm font-medium">{item.participation}%</span>
                        </div>
                        <Progress value={item.participation} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Community Priorities</CardTitle>
                  <CardDescription>Most voted issues by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: 'Infrastructure', count: 456, example: 'Road maintenance' },
                      { category: 'Safety', count: 387, example: 'Improved streetlights' },
                      { category: 'Parks', count: 325, example: 'Dog park expansion' },
                      { category: 'Transportation', count: 298, example: 'More bike lanes' },
                      { category: 'Housing', count: 256, example: 'Affordable housing options' },
                    ].map((priority, index) => (
                      <Collapsible key={index}>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{priority.category}</span>
                            <span className="ml-2 text-sm text-gray-500">{priority.count} votes</span>
                          </div>
                          <CollapsibleTrigger className="rounded-full p-1 hover:bg-gray-100">
                            <ChevronRight className="h-4 w-4" />
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                          <div className="pl-4 mt-2 text-sm text-gray-600 border-l-2 border-gray-200">
                            <p>Top issue: {priority.example}</p>
                            <p className="mt-1">Most active neighborhood: {neighborhoods[index % neighborhoods.length].name}</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="policy">
            <Card>
              <CardHeader>
                <CardTitle>Policy Impact Analysis</CardTitle>
                <CardDescription>How recent policies have affected different community segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={policyImpactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="policy" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="positiveImpact" name="Positive Impact" fill="#22C55E" />
                      <Bar dataKey="negativeImpact" name="Negative Impact" fill="#EF4444" />
                      <Bar dataKey="neutral" name="Neutral" fill="#94A3B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-civic-primary" />
                    Demographic Impact
                  </CardTitle>
                  <CardDescription>How policies affect different population groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { group: 'Families with children', positive: 72, negative: 18, neutral: 10 },
                      { group: 'Seniors (65+)', positive: 58, negative: 22, neutral: 20 },
                      { group: 'Small business owners', positive: 64, negative: 26, neutral: 10 },
                      { group: 'Renters', positive: 48, negative: 37, neutral: 15 },
                    ].map((group, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{group.group}</span>
                        </div>
                        <div className="flex h-2 mb-1 overflow-hidden bg-gray-200 rounded">
                          <div 
                            className="bg-civic-secondary" 
                            style={{ width: `${group.positive}%` }}
                          ></div>
                          <div 
                            className="bg-gray-400" 
                            style={{ width: `${group.neutral}%` }}
                          ></div>
                          <div 
                            className="bg-red-500" 
                            style={{ width: `${group.negative}%` }}
                          ></div>
                        </div>
                        <div className="flex text-xs justify-between">
                          <span className="text-civic-secondary">{group.positive}% positive</span>
                          <span className="text-gray-500">{group.neutral}% neutral</span>
                          <span className="text-red-500">{group.negative}% negative</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Progress</CardTitle>
                  <CardDescription>Status of approved policies and initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Traffic Calming Plan', progress: 85, status: 'On track' },
                      { name: 'Park Renovation Project', progress: 62, status: 'Minor delays' },
                      { name: 'Affordable Housing Initiative', progress: 45, status: 'Behind schedule' },
                      { name: 'Public Transit Expansion', progress: 25, status: 'Just started' },
                      { name: 'Downtown Revitalization', progress: 78, status: 'On track' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-xs font-medium">{item.status}</span>
                        </div>
                        <div className="flex items-center">
                          <Progress value={item.progress} className="h-2 flex-grow" />
                          <span className="ml-2 text-xs font-medium">{item.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="participation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Response Rate</CardTitle>
                  <CardDescription>How quickly representatives respond to citizen inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Mayor Sarah Johnson', rate: 78, time: '1.2 days' },
                      { name: 'Councilor Michael Rodriguez', rate: 92, time: '0.8 days' },
                      { name: 'Councilor James Williams', rate: 45, time: '3.5 days' },
                      { name: 'Councilor Lisa Chen', rate: 85, time: '1.0 days' },
                      { name: 'Councilor David Thompson', rate: 62, time: '2.1 days' },
                    ].map((rep, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{rep.name}</span>
                          <span className="text-xs">Avg. response: {rep.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Progress value={rep.rate} className="h-2 flex-grow" />
                          <span className="ml-2 text-xs font-medium">{rep.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Voting Participation</CardTitle>
                  <CardDescription>Citizen engagement in community polls and surveys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { topic: 'Traffic', participation: 68 },
                        { topic: 'Parks', participation: 82 },
                        { topic: 'Budget', participation: 55 },
                        { topic: 'Zoning', participation: 43 },
                        { topic: 'Events', participation: 76 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="participation" name="Participation Rate (%)" fill="#0EA5E9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Community Initiative Impact</CardTitle>
                <CardDescription>Outcomes and participation in neighborhood-led projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      initiative: 'Downtown Community Garden Expansion', 
                      participants: 35, 
                      outcomes: [
                        '10 new garden plots created',
                        'Educational workshop area built',
                        '15% increase in local produce availability'
                      ]
                    },
                    { 
                      initiative: 'Westside Neighborhood Watch Program', 
                      participants: 28, 
                      outcomes: [
                        '12% reduction in reported property crimes',
                        '5 new neighborhood watch groups formed',
                        'Improved coordination with local police'
                      ]
                    },
                    { 
                      initiative: 'Northpark Creek Cleanup', 
                      participants: 42, 
                      outcomes: [
                        '1.2 tons of trash removed',
                        '3 acres of invasive species cleared',
                        'Water quality improved by 18%'
                      ]
                    },
                  ].map((initiative, index) => (
                    <Collapsible key={index}>
                      <div className="border-b pb-2">
                        <CollapsibleTrigger className="flex justify-between items-center w-full text-left">
                          <span className="font-medium">{initiative.initiative}</span>
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="pt-2 pl-4 border-l-2 border-civic-primary mt-2">
                          <div className="text-sm mb-2">
                            <span className="font-medium">Participants:</span> {initiative.participants}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Outcomes:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              {initiative.outcomes.map((outcome, i) => (
                                <li key={i}>{outcome}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Impact;
