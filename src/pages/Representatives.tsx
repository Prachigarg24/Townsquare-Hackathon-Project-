
import React, { useState } from 'react';
import { Calendar, Mail, MessageCircle, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { representatives } from '@/services/mockData';
import Navbar from '@/components/layout/Navbar';
import { useToast } from '@/components/ui/use-toast';

const Representatives = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredRepresentatives = representatives.filter(rep => {
    return (
      searchTerm === "" || 
      rep.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rep.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the representative. You'll receive a notification when they respond.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-civic-primary text-white">
        <div className="civic-container py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold">Your Representatives</h1>
            <p className="mt-2 opacity-90">Connect directly with your local officials and track their responses</p>
          </div>
        </div>
      </div>
      
      <div className="civic-container py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto max-w-md">
            <Input
              type="text"
              placeholder="Search representatives..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepresentatives.map(rep => (
            <RepresentativeCard key={rep.id} representative={rep} onSendMessage={sendMessage} />
          ))}
          {filteredRepresentatives.length === 0 && (
            <div className="text-center py-8 col-span-3">
              <p className="text-gray-500">No representatives match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface RepresentativeCardProps {
  representative: {
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
  };
  onSendMessage: () => void;
}

const RepresentativeCard: React.FC<RepresentativeCardProps> = ({ representative, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage();
      setMessage("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <img src={representative.imageUrl} alt={representative.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="ml-4 flex-grow">
            <h3 className="text-xl font-medium">{representative.name}</h3>
            <p className="text-gray-500">{representative.position}</p>
            <p className="text-gray-500 text-sm">{representative.district}</p>
            
            <Badge className="mt-2" variant="outline">{representative.party}</Badge>
            
            <div className="mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Response rate</span>
                <span className="font-medium">{representative.responseRate}%</span>
              </div>
              <Progress value={representative.responseRate} className="h-2 mt-1" />
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <a href={`mailto:${representative.contact.email}`} className="text-civic-primary hover:underline">
                  {representative.contact.email}
                </a>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <a href={`tel:${representative.contact.phone}`} className="text-civic-primary hover:underline">
                  {representative.contact.phone}
                </a>
              </div>
            </div>
            
            {representative.upcomingEvents.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming Events
                </h4>
                <ul className="mt-1 text-sm text-gray-500 space-y-1">
                  {representative.upcomingEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center bg-civic-primary hover:bg-civic-dark">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message to {representative.name}</DialogTitle>
                    <DialogDescription>
                      Send a message directly to your representative. Public messages and responses are visible to the community.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="my-4">
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-[100px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 my-2">
                    <input type="checkbox" id="public-message" className="rounded" />
                    <label htmlFor="public-message" className="text-sm">Make this message and response public</label>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSendMessage}>Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">View Profile</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Representatives;
