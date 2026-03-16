import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle, CheckCircle2, FileText,
  CreditCard, MapPin, TrendingUp, Users, Home
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { mockDashboardStats } from './mockData';
import type { DashboardStats } from './types';

export default function NationalAdminDashboard() {
  const [stats] = useState<DashboardStats>(mockDashboardStats);

  const kpiCards = [
    {
      title: 'Registered Tenancies',
      value: stats.registeredTenancies.toLocaleString(),
      change: stats.tenanciesChangePercent,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Rent Cards Issued',
      value: stats.rentCardsIssued.toLocaleString(),
      change: stats.cardsChangePercent,
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      title: 'Active Violations',
      value: stats.activeViolations.toLocaleString(),
      change: stats.violationsChangePercent,
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Compliance Rate',
      value: `${stats.complianceRate}%`,
      change: stats.complianceChangePercent,
      icon: CheckCircle2,
      color: 'text-emerald-600'
    },
    {
      title: 'Properties Registered',
      value: stats.propertiesRegistered.toLocaleString(),
      change: undefined,
      icon: Home,
      color: 'text-purple-600'
    },
    {
      title: 'Open Cases',
      value: stats.openCases.toLocaleString(),
      change: undefined,
      icon: MapPin,
      color: 'text-orange-600'
    },
    {
      title: 'Officers Active Today',
      value: stats.officersActiveToday.toLocaleString(),
      change: undefined,
      icon: Users,
      color: 'text-cyan-600'
    },
    {
      title: 'Advance Violations (MTD)',
      value: stats.advanceViolationsMTD.toLocaleString(),
      change: undefined,
      icon: TrendingUp,
      color: 'text-rose-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            National Rental Enforcement Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time visibility across all regions — Ghana Rent Control Department
          </p>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-300">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse inline-block" />
          Live
        </Badge>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold mt-1 text-gray-900">
                    {kpi.value}
                  </p>
                  {kpi.change !== undefined && (
                    <p className={`text-xs mt-1 ${
                      kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change >= 0 ? '↑' : '↓'} {Math.abs(kpi.change)}% vs last month
                    </p>
                  )}
                </div>
                <kpi.icon className={`w-6 h-6 ${kpi.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Map placeholder + Pie */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Rent Card Adoption Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.rentCardTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="issued" fill="#22c55e" radius={[4, 4, 0, 0]} name="Cards Issued" />
                <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Violation Types (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.violationBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {stats.violationBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Advance Violations: Detected vs Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.violationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="detected" stroke="#ef4444" strokeWidth={2} name="Detected" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} name="Resolved" dot={{ r: 4 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Regional Compliance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: 'Greater Accra', score: 74, properties: 2410 },
                { region: 'Ashanti', score: 61, properties: 1820 },
                { region: 'Western', score: 55, properties: 890 },
                { region: 'Central', score: 48, properties: 650 },
                { region: 'Eastern', score: 42, properties: 420 },
                { region: 'Northern', score: 38, properties: 242 },
              ].map((r) => (
                <div key={r.region} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-32 truncate">{r.region}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        r.score >= 70 ? 'bg-green-500' : r.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{r.score}%</span>
                  <span className="text-xs text-gray-400 w-20 text-right">{r.properties.toLocaleString()} props</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
