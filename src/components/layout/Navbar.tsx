
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, UserCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginPopup from '../auth/LoginPopup';

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const showNotification = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new neighborhood updates.",
    });
  };

  const handleFullLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="civic-container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="py-4 space-y-4">
                    <Link to="/" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Home</Link>
                    <Link to="/issues" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Neighborhood Issues</Link>
                    <Link to="/legislation" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Legislation</Link>
                    <Link to="/representatives" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Representatives</Link>
                    <Link to="/initiatives" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Community Initiatives</Link>
                    <Link to="/impact" className="block text-base font-medium text-gray-700 hover:text-civic-primary">Impact Dashboard</Link>
                  </div>
                </SheetContent>
              </Sheet>
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-civic-primary flex items-center justify-center text-white font-bold text-lg">T</div>
                  <span className="ml-2 text-xl font-bold text-gray-800">TownSquare</span>
                </div>
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-6">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Home</Link>
              <Link to="/issues" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Neighborhood Issues</Link>
              <Link to="/legislation" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Legislation</Link>
              <Link to="/representatives" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Representatives</Link>
              <Link to="/initiatives" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Community Initiatives</Link>
              <Link to="/impact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-civic-primary">Impact Dashboard</Link>
            </div>
          </div>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <LogIn className="h-5 w-5 text-civic-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Sign In to TownSquare</DialogTitle>
                  <DialogDescription>
                    Access your community dashboard and participate in local discussions.
                  </DialogDescription>
                </DialogHeader>
                <LoginPopup onFullLogin={handleFullLogin} />
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={showNotification} className="ml-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-2">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
