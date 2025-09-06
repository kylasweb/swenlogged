import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Users, DollarSign, Target, Download, TrendingUp } from 'lucide-react';

interface CRMStats {
  totalContacts: number;
  totalLeads: number;
  totalOpportunities: number;
  totalActivities: number;
  totalOpportunityValue: number;
  leadsConversionRate: number;
  leadsBySource: Record<string, number>;
  opportunitiesByStage: Record<string, number>;
  activitiesByType: Record<string, number>;
  monthlyTrends: Record<string, { leads: number; opportunities: number; value: number }>;
}

const CRMReportsManager = () => {
  const [stats, setStats] = useState<CRMStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  useEffect(() => {
    fetchCRMStats();
  }, [selectedPeriod]);

  const fetchCRMStats = async () => {
    try {
      const [
        contactsResult,
        leadsResult,
        opportunitiesResult,
        activitiesResult
      ] = await Promise.all([
        supabase.from('crm_contacts').select('*'),
        supabase.from('crm_leads').select('*'),
        supabase.from('crm_opportunities').select('*'),
        supabase.from('crm_activities').select('*')
      ]);

      const contacts = contactsResult.data || [];
      const leads = leadsResult.data || [];
      const opportunities = opportunitiesResult.data || [];
      const activities = activitiesResult.data || [];

      // Calculate leads by source
      const leadsBySource = leads.reduce((acc, lead) => {
        const source = lead.source || 'Unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate opportunities by stage
      const opportunitiesByStage = opportunities.reduce((acc, opp) => {
        const stage = opp.stage || 'Unknown';
        acc[stage] = (acc[stage] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate activities by type
      const activitiesByType = activities.reduce((acc, activity) => {
        acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate total opportunity value
      const totalOpportunityValue = opportunities.reduce((sum, opp) => {
        return sum + (parseFloat(opp.value?.toString() || '0') || 0);
      }, 0);

      // Calculate conversion rate (simplified)
      const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
      const leadsConversionRate = leads.length > 0 ? (convertedLeads / leads.length) * 100 : 0;

      // Calculate monthly trends
      const monthlyTrends = leads.reduce((acc, lead) => {
        const month = new Date(lead.created_at).toLocaleString('default', { month: 'short' });
        if (!acc[month]) {
          acc[month] = { leads: 0, opportunities: 0, value: 0 };
        }
        acc[month].leads += 1;
        return acc;
      }, {} as Record<string, { leads: number; opportunities: number; value: number }>);

      // Add opportunities to monthly trends
      opportunities.forEach(opp => {
        const month = new Date(opp.created_at).toLocaleString('default', { month: 'short' });
        if (!monthlyTrends[month]) {
          monthlyTrends[month] = { leads: 0, opportunities: 0, value: 0 };
        }
        monthlyTrends[month].opportunities += 1;
        monthlyTrends[month].value += parseFloat(opp.value?.toString() || '0') || 0;
      });

      setStats({
        totalContacts: contacts.length,
        totalLeads: leads.length,
        totalOpportunities: opportunities.length,
        totalActivities: activities.length,
        totalOpportunityValue,
        leadsConversionRate: parseFloat(leadsConversionRate.toFixed(1)),
        leadsBySource,
        opportunitiesByStage,
        activitiesByType,
        monthlyTrends
      });
    } catch (error) {
      console.error('Error fetching CRM stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!stats) return;
    
    const reportData = {
      generatedAt: new Date().toISOString(),
      period: `Last ${selectedPeriod} days`,
      ...stats
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crm-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading CRM reports...</div>;
  }

  if (!stats) {
    return <div className="flex justify-center p-8">No data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <h2 className="text-2xl font-bold">CRM Reports & Analytics</h2>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalOpportunityValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsConversionRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.leadsBySource).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-sm font-medium">{source}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opportunities by Stage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.opportunitiesByStage).map(([stage, count]) => (
              <div key={stage} className="flex justify-between items-center">
                <span className="text-sm font-medium">{stage}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activities by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(stats.activitiesByType).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-sm font-medium">{type}</span>
                <Badge variant="outline">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.monthlyTrends).map(([month, data]) => (
              <div key={month} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{month}</h4>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Leads</p>
                  <p className="font-bold">{data.leads}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Opportunities</p>
                  <p className="font-bold">{data.opportunities}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-bold">${data.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Lead Performance</h4>
              <p className="text-sm text-blue-700">
                {stats.totalLeads} leads with {stats.leadsConversionRate}% conversion rate. 
                Top source: {Object.entries(stats.leadsBySource).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Pipeline Health</h4>
              <p className="text-sm text-green-700">
                {stats.totalOpportunities} opportunities worth ${stats.totalOpportunityValue.toLocaleString()} in pipeline.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Activity Volume</h4>
              <p className="text-sm text-purple-700">
                {stats.totalActivities} total activities. Most common: {
                  Object.entries(stats.activitiesByType).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                }.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900">Contact Base</h4>
              <p className="text-sm text-yellow-700">
                {stats.totalContacts} contacts in database. Strong foundation for lead generation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CRMReportsManager;