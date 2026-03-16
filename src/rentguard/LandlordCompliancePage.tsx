import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2, AlertCircle, XCircle,
  Download, ExternalLink, Plus
} from 'lucide-react';
import { mockComplianceData } from './mockData';

export default function LandlordCompliancePage() {
  const [compliance] = useState(mockComplianceData);

  const statusItems = [
    {
      label: 'Properties Registered with Rent Control',
      done: compliance.propertiesRegistered,
      total: compliance.totalProperties,
      cta: 'Register Property'
    },
    {
      label: 'Tenancies with Written Agreements',
      done: compliance.tenanciesWithAgreements,
      total: compliance.totalTenancies,
      cta: 'Upload Agreement'
    },
    {
      label: 'Rent Cards Issued',
      done: compliance.rentCardsIssued,
      total: compliance.totalTenancies,
      cta: 'Issue Rent Card'
    },
    {
      label: 'Advance Payments Within Legal Limit',
      done: compliance.compliantAdvancePayments,
      total: compliance.totalTenancies,
      cta: 'View Details'
    },
    {
      label: 'Tenancy Agreements Registered (14-day rule)',
      done: compliance.registeredAgreements,
      total: compliance.totalTenancies,
      cta: 'Register with Rent Control'
    },
  ];

  const overallScore = compliance.overallScore;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Overall Score Card */}
      <Card className={`border-2 ${
        overallScore >= 80 ? 'border-green-400'
        : overallScore >= 60 ? 'border-yellow-400'
        : 'border-red-400'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Compliance Score</h2>
              <p className="text-sm text-gray-500">Based on Ghana Rent Act (Act 220) & PNDCL 138</p>
            </div>
            <div className="text-center">
              <span className={`text-5xl font-black ${
                overallScore >= 80 ? 'text-green-600'
                : overallScore >= 60 ? 'text-yellow-600'
                : 'text-red-600'
              }`}>
                {overallScore}
              </span>
              <span className="text-gray-500 text-lg">/100</span>
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
          <div className="flex items-center gap-2 mt-3">
            {overallScore >= 80
              ? <><CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Good standing — eligible for Compliance Certificate
                  </span></>
              : overallScore >= 60
              ? <><AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-700 font-medium">
                    Partial compliance — action required
                  </span></>
              : <><XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700 font-medium">
                    Non-compliant — risk of sanctions
                  </span></>
            }
          </div>
        </CardContent>
      </Card>

      {/* Compliance Items */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {statusItems.map((item) => {
            const pct = item.total ? (item.done / item.total) * 100 : 0;
            const allDone = item.done === item.total && item.total > 0;
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {allDone
                      ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                      : item.done > 0
                      ? <AlertCircle className="w-4 h-4 text-yellow-600" />
                      : <XCircle className="w-4 h-4 text-red-500" />
                    }
                    <span className="text-sm font-medium text-gray-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.done}/{item.total}</span>
                    {!allDone && (
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Plus className="w-3 h-3 mr-1" />
                        {item.cta}
                      </Button>
                    )}
                  </div>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Compliance Certificate */}
      {overallScore >= 80 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Compliance Certificate Available</h3>
                <p className="text-sm text-green-700 mt-1">
                  Download your QR-coded certificate for inspections and financing applications
                </p>
              </div>
              <Button className="bg-green-700 hover:bg-green-800">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Link to Official Portal */}
      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-700 mb-3">
          Register properties and tenancies on the official Ghana Rent Control portal
        </p>
        <span className="inline-flex items-center gap-2 text-blue-700 font-medium text-sm">
          rentcontrol.mwh.gov.gh
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
