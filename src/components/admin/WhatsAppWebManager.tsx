import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Phone, Users, FileText, Plus, Search, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WhatsAppContact {
  id: string;
  name: string;
  phone_number: string;
  profile_picture_url?: string;
  last_seen?: string;
  is_blocked: boolean;
  tags?: string[];
  notes?: string;
}

interface WhatsAppMessage {
  id: string;
  contact_id: string;
  message_text?: string;
  message_type: string;
  media_url?: string;
  is_outgoing: boolean;
  is_read: boolean;
  timestamp: string;
}

const WhatsAppWebManager = () => {
  const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
    fetchMessages();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('name');

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!selectedContact || !newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('whatsapp_messages')
        .insert([{
          contact_id: selectedContact.id,
          message_text: newMessage,
          message_type: 'text',
          is_outgoing: true,
          is_read: true
        }]);

      if (error) throw error;

      setNewMessage('');
      fetchMessages();
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone_number.includes(searchTerm)
  );

  const selectedContactMessages = messages.filter(msg => 
    msg.contact_id === selectedContact?.id
  );

  if (loading) {
    return <div className="p-6">Loading WhatsApp data...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Web</h1>
          <p className="text-muted-foreground">Access WhatsApp Web directly in the admin panel</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('https://web.whatsapp.com', '_blank')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
        </div>
      </div>

      {/* WhatsApp Web Iframe */}
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              WhatsApp Web Interface
            </CardTitle>
            <CardDescription>
              Scan the QR code with your phone to connect WhatsApp Web
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[600px] rounded-lg border bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Web Integration</h3>
                <p className="text-gray-600 mb-4">
                  WhatsApp Web cannot be embedded directly due to security restrictions.
                </p>
                <Button 
                  onClick={() => window.open('https://web.whatsapp.com', '_blank')}
                  className="mb-2"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open WhatsApp Web
                </Button>
                <p className="text-xs text-gray-500">
                  For full integration, consider using WhatsApp Business API
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats (from stored data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Total Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Send className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Sent Today</p>
                <p className="text-2xl font-bold">
                  {messages.filter(m => 
                    m.is_outgoing && 
                    new Date(m.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Active Chats</p>
                <p className="text-2xl font-bold">
                  {new Set(messages.map(m => m.contact_id)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use WhatsApp Web</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>1. Open WhatsApp on your phone</p>
            <p>2. Go to Settings → Linked Devices</p>
            <p>3. Tap "Link a Device"</p>
            <p>4. Scan the QR code displayed in the frame above</p>
            <p>5. Your WhatsApp will be connected and ready to use</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppWebManager;