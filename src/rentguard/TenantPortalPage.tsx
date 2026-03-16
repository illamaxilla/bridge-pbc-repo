import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Shield, Search, AlertTriangle, BookOpen,
  Phone, QrCode, CheckCircle2
} from 'lucide-react';
import { mockRentCards, mockTenantCases } from './mockData';

export default function TenantPortalPage() {
  const navigate = useNavigate();
  const [cardSearchInput, setCardSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<typeof mockRentCards[string] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (cardSearchInput.trim().length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      const found = mockRentCards[cardSearchInput.trim().toUpperCase()] || null;
      setSearchResult(found);
      setHasSearched(true);
      setIsLoading(false);
    }, 500);
  };

  const rights = [
    {
      icon: '📜',
      title: 'Right to a Written Agreement',
      text: 'Your landlord must provide a written tenancy agreement before or at the start of your tenancy.',
      law: 'PNDCL 138, Section 4'
    },
    {
      icon: '💳',
      title: 'Right to a Rent Card',
      text: 'Every tenant must receive an official Rent Card with verified tenancy details.',
      law: 'Act 220, Section 20'
    },
    {
      icon: '💰',
      title: 'Protection from Excess Advance',
      text: "Your landlord cannot demand more than 6 months' rent in advance. For monthly tenancies, the cap is 1 month.",
      law: 'Act 220, Section 16(5)'
    },
    {
      icon: '🏠',
      title: 'Right to Habitable Premises',
      text: 'Landlords are responsible for maintaining the property in a fit and habitable condition.',
      law: 'Act 220, Section 17'
    },
    {
      icon: '⚖️',
      title: 'Protection from Unlawful Eviction',
      text: 'You cannot be evicted without proper notice and due process through the Rent Control Committee.',
      law: 'Act 220, Section 18'
    },
    {
      icon: '📋',
      title: 'Right to Registered Tenancy',
      text: 'Your tenancy agreement must be registered with the Rent Control Department within 14 days.',
      law: 'PNDCL 138, Section 4'
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="text-center py-6">
        <Shield className="w-12 h-12 text-green-700 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-900">Tenant Protection Portal</h1>
        <p className="text-gray-500 text-sm mt-1">
          Know your rights · Verify your rent card · File a complaint
        </p>
      </div>

      {/* Rent Card Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <QrCode className="w-5 h-5 text-green-700" />
            Verify Your Rent Card
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={cardSearchInput}
              onChange={e => setCardSearchInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Enter card number (e.g. RG-2025-ACC-00123)"
              className="flex-1"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-green-700 hover:bg-green-800"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
          {isLoading && (
            <p className="text-sm text-gray-500 mt-3 text-center">Verifying...</p>
          )}
          {hasSearched && !isLoading && (
            <div className={`mt-4 rounded-lg p-4 border ${
              searchResult?.status === 'active'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {searchResult?.status === 'active'
                  ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                  : <AlertTriangle className="w-5 h-5 text-red-600" />
                }
                <span className="font-semibold">
                  {searchResult?.status === 'active' ? 'Valid Rent Card' : 'Invalid / Not Found'}
                </span>
              </div>
              {searchResult?.status === 'active' && (
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="text-gray-500">Property:</span> {searchResult.propertyAddress}</p>
                  <p><span className="text-gray-500">Monthly Rent:</span> GH₵ {searchResult.monthlyRent?.toLocaleString()}</p>
                  <p><span className="text-gray-500">Max Advance:</span> {searchResult.advanceLimitMonths} months</p>
                  <div className="mt-2">
                    <Badge variant={searchResult.isAdvanceCompliant ? 'default' : 'destructive'}>
                      {searchResult.isAdvanceCompliant ? '✓ Advance within legal limit' : '⚠ Advance exceeds limit'}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-3 text-center">
            Also verify via USSD: Dial *714*1# → Option 1
          </p>
        </CardContent>
      </Card>

      {/* My Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">My Complaints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockTenantCases.map((c) => (
            <div key={c.id} className="flex items-start justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">{c.caseNumber}</p>
                <p className="text-xs text-gray-500 capitalize mt-0.5">
                  {c.caseType.replace(/_/g, ' ')}
                </p>
              </div>
              <Badge
                variant={
                  c.status === 'resolved' ? 'default'
                  : c.status === 'under_investigation' ? 'secondary'
                  : 'outline'
                }
                className="text-xs"
              >
                {c.status.replace(/_/g, ' ')}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* File Complaint CTA */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800">Experiencing a Violation?</h3>
              <p className="text-sm text-red-700 mt-1 mb-3">
                File a complaint if your landlord is demanding excess advance,
                refusing to provide a rent card, or threatening eviction.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
                  File Online Complaint
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 0302-xxx-xxx
                </Button>
              </div>
              <p className="text-xs text-red-600 mt-2 text-center">
                Or dial *714*1# → Option 2 (works on any phone)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Know Your Rights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="w-5 h-5 text-blue-700" />
            Know Your Rights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rights.map((right) => (
            <div key={right.title} className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-2xl flex-shrink-0">{right.icon}</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">{right.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{right.text}</p>
                <p className="text-xs text-blue-600 mt-1 font-medium">{right.law}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
