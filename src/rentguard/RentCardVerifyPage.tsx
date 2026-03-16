import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, Shield, Search } from 'lucide-react';
import { mockRentCards } from './mockData';

export default function RentCardVerifyPage() {
  const { cardNumber } = useParams<{ cardNumber?: string }>();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(cardNumber || '');
  const [searching, setSearching] = useState(false);

  const card = cardNumber ? mockRentCards[cardNumber.toUpperCase()] : undefined;
  const isValid = card?.status === 'active';
  const hasSearched = !!cardNumber;

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearching(true);
      setTimeout(() => {
        navigate(`/rentguard/verify/${searchInput.trim().toUpperCase()}`);
        setSearching(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
          <h1 className="text-white font-bold text-xl">Ghana Rent Control</h1>
          <p className="text-green-200 text-sm">Official Rent Card Verification</p>
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-6 space-y-4">
            {/* Search */}
            <div className="flex gap-2">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter card number (e.g. RG-2025-ACC-00123)"
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={searching} className="bg-green-700 hover:bg-green-800">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Try: RG-2025-ACC-00123, RG-2025-KMA-00456, or RG-2025-TMA-00789
            </p>

            {/* Loading */}
            {searching && (
              <div className="flex justify-center py-4">
                <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
              </div>
            )}

            {/* Result */}
            {hasSearched && !searching && (
              <>
                <div className={`rounded-lg p-4 flex items-center gap-3 ${
                  isValid
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {isValid
                    ? <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    : <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  }
                  <div>
                    <p className={`font-bold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                      {isValid ? 'VALID RENT CARD' : 'INVALID / NOT FOUND'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isValid
                        ? 'This rent card is officially registered'
                        : 'This card number could not be verified'}
                    </p>
                  </div>
                </div>

                {card && isValid && (
                  <div className="space-y-3">
                    <VerifyField label="Card Number" value={card.cardNumber} />
                    <VerifyField label="Property Address" value={card.propertyAddress} />
                    <VerifyField label="Landlord (ID ending)" value={`...${card.landlordIdSuffix}`} />
                    <VerifyField label="Monthly Rent" value={`GH\u20B5 ${card.monthlyRent.toLocaleString()}`} />
                    <VerifyField label="Issued Date" value={new Date(card.issuedAt).toLocaleDateString('en-GB')} />
                    <VerifyField label="Advance Limit" value={`${card.advanceLimitMonths} months max`} />

                    <div className="bg-blue-50 rounded-lg p-3 mt-2">
                      <div className="flex items-center gap-2">
                        {card.isAdvanceCompliant
                          ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                          : <AlertCircle className="w-4 h-4 text-red-600" />
                        }
                        <span className="text-sm font-medium">
                          Advance payments:{' '}
                          <Badge variant={card.isAdvanceCompliant ? 'default' : 'destructive'}>
                            {card.isAdvanceCompliant ? 'Within legal limit' : 'EXCEEDS LEGAL LIMIT'}
                          </Badge>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Report */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center mb-3">
                Suspect a violation? Report it to Rent Control
              </p>
              <button
                onClick={() => navigate('/rentguard/tenant')}
                className="block w-full text-center bg-green-700 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
              >
                File a Complaint
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-green-200 text-xs mt-4">
          Powered by RentGuard · Ghana Ministry of Works and Housing
        </p>
      </div>
    </div>
  );
}

function VerifyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-48">{value}</span>
    </div>
  );
}
