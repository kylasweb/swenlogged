import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Users, Hash, Plus, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TeamChatMessage {
  id: string;
  sender_id: string;
  channel_id: string;
  message: string;
  message_type: string;
  attachments?: any;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface Channel {
  id: string;
  name: string;
  description: string;
  member_count: number;
}

const TeamChatManager = () => {
  const [messages, setMessages] = useState<TeamChatMessage[]>([]);
  const [channels] = useState<Channel[]>([
    { id: 'general', name: 'General', description: 'General team discussions', member_count: 12 },
    { id: 'sales', name: 'Sales', description: 'Sales team coordination', member_count: 8 },
    { id: 'operations', name: 'Operations', description: 'Operations and logistics', member_count: 15 },
    { id: 'support', name: 'Support', description: 'Customer support team', member_count: 6 }
  ]);
  const [activeChannel, setActiveChannel] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser();
    fetchMessages();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('team_chat')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'team_chat_messages' },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setCurrentUser({ ...user, ...profile });
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('team_chat_messages')
        .select('*')
        .eq('channel_id', activeChannel)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      // Fetch sender details separately
      const messagesWithSenders = await Promise.all(
        (data || []).map(async (message) => {
          const { data: senderData } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', message.sender_id)
            .single();
          
          return {
            ...message,
            sender: senderData || { full_name: 'Unknown User' }
          };
        })
      );

      setMessages(messagesWithSenders);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeChannel]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    try {
      const { error } = await supabase
        .from('team_chat_messages')
        .insert([{
          sender_id: currentUser.id,
          channel_id: activeChannel,
          message: newMessage,
          message_type: 'text'
        }]);

      if (error) throw error;

      setNewMessage('');
      toast.success('Message sent');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return <div className="p-6">Loading team chat...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Chat</h1>
          <p className="text-muted-foreground">Collaborate with your team in real-time</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Channels Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${
                    activeChannel === channel.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium"># {channel.name}</p>
                      <p className="text-xs text-muted-foreground">{channel.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {channel.member_count}
                    </Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  {channels.find(c => c.id === activeChannel)?.name}
                </CardTitle>
                <CardDescription>
                  {channels.find(c => c.id === activeChannel)?.description}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4">
              {messages.map((message) => (
                <div key={message.id} className="mb-4 flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender?.avatar_url} />
                    <AvatarFallback>
                      {message.sender?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-sm">
                        {message.sender?.full_name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
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
              <div className="bg-green-100 p-2 rounded-lg">
                <Hash className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Active Channels</p>
                <p className="text-2xl font-bold">{channels.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Team Members</p>
                <p className="text-2xl font-bold">
                  {channels.reduce((sum, c) => sum + c.member_count, 0) / channels.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">Messages Today</p>
                <p className="text-2xl font-bold">
                  {messages.filter(m => 
                    new Date(m.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamChatManager;