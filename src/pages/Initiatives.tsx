
import React, { useState } from 'react';
import { Calendar, MapPin, Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initiatives, neighborhoods } from '@/services/mockData';
import Navbar from '@/components/layout/Navbar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Initiatives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const { toast } = useToast();
  
  const filteredInitiatives = initiatives.filter(initiative => {
    return (
      (searchTerm === "" || 
        initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        initiative.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || initiative.category === selectedCategory) &&
      (selectedNeighborhood === "all" || initiative.neighborhood === neighborhoods.find(n => n.id === selectedNeighborhood)?.name)
    );
  });

  const joinInitiative = () => {
    toast({
      title: "Success!",
      description: "You've joined this initiative. Check your email for details.",
    });
  };

  const createInitiative = () => {
    toast({
      title: "Initiative Created",
      description: "Your community initiative has been created and is now visible to your neighbors.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Community Initiatives</h1>
            <p className="mt-2 opacity-90">Join or start neighborhood projects to improve your community</p>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto max-w-md">
            <Input
              type="text"
              placeholder="Search initiatives..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cleanup">Cleanup</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
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
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-civic-primary hover:bg-civic-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Initiative
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Community Initiative</DialogTitle>
                  <DialogDescription>
                    Start a new neighborhood project and invite your community to participate.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Initiative Title</Label>
                    <Input id="title" placeholder="Enter a clear, descriptive title" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe the goals, activities, and benefits of your initiative" className="min-h-[100px]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleanup">Cleanup</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Neighborhood</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          {neighborhoods.map(neighborhood => (
                            <SelectItem key={neighborhood.id} value={neighborhood.id}>
                              {neighborhood.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={createInitiative}>Create Initiative</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="joined">Joined</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInitiatives.map(initiative => (
                <InitiativeCard 
                  key={initiative.id} 
                  initiative={initiative}
                  onJoin={joinInitiative}
                />
              ))}
              {filteredInitiatives.length === 0 && (
                <div className="text-center py-8 col-span-2">
                  <p className="text-gray-500">No initiatives match your current filters</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="text-center py-8">
              <p className="text-gray-500">Past initiatives will be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="joined">
            <div className="text-center py-8">
              <p className="text-gray-500">Initiatives you've joined will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface InitiativeCardProps {
  initiative: {
    id: string;
    title: string;
    description: string;
    neighborhood: string;
    organizer: string;
    date: string;
    participants: number;
    category: string;
  };
  onJoin: () => void;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative, onJoin }) => {
  const categoryColors = {
    cleanup: 'bg-green-100 text-green-800',
    safety: 'bg-red-100 text-red-800',
    education: 'bg-blue-100 text-blue-800',
    community: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800',
  };
  
  const categoryColor = categoryColors[initiative.category as keyof typeof categoryColors];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{initiative.title}</h3>
          <Badge className={`${categoryColor} capitalize`}>
            {initiative.category}
          </Badge>
        </div>
        
        <p className="mt-2 text-gray-700">{initiative.description}</p>
        
        <div className="mt-4 flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {initiative.neighborhood}
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {initiative.date}
          </div>
          
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {initiative.participants} participants
          </div>
        </div>
        
        <div className="mt-2 text-sm">
          <span className="text-gray-500">Organized by:</span> {initiative.organizer}
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={onJoin} className="flex-1 bg-civic-primary hover:bg-civic-dark">
            Join Initiative
          </Button>
          <Button variant="outline" className="flex-1">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Initiatives;
