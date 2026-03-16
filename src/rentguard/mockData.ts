import type { DashboardStats, RentCardVerification, ComplianceData, TenantCase, RentGuardUser } from './types';

export const mockUser: RentGuardUser = {
  id: 'usr-001',
  role: 'national_admin',
  fullName: 'Kwame Asante',
  phone: '+233201234567',
  email: 'k.asante@rentcontrol.gov.gh',
  district: 'Accra Metropolitan',
  region: 'Greater Accra',
};

export const mockDashboardStats: DashboardStats = {
  registeredTenancies: 12_847,
  tenanciesChangePercent: 14.2,
  rentCardsIssued: 9_631,
  cardsChangePercent: 22.1,
  activeViolations: 1_284,
  violationsChangePercent: -8.3,
  complianceRate: 68.4,
  complianceChangePercent: 3.1,
  propertiesRegistered: 6_432,
  openCases: 847,
  officersActiveToday: 42,
  advanceViolationsMTD: 312,
  violationBreakdown: [
    { name: 'Illegal Advance', value: 412, color: '#ef4444' },
    { name: 'No Rent Card', value: 298, color: '#f97316' },
    { name: 'No Agreement', value: 187, color: '#eab308' },
    { name: 'Unlawful Eviction', value: 134, color: '#8b5cf6' },
    { name: 'Unregistered', value: 156, color: '#3b82f6' },
    { name: 'Other', value: 97, color: '#6b7280' },
  ],
  rentCardTrend: [
    { month: 'Oct', issued: 620, target: 800 },
    { month: 'Nov', issued: 780, target: 800 },
    { month: 'Dec', issued: 890, target: 800 },
    { month: 'Jan', issued: 1020, target: 1000 },
    { month: 'Feb', issued: 1150, target: 1000 },
    { month: 'Mar', issued: 940, target: 1000 },
  ],
  violationTrend: [
    { month: 'Oct', detected: 180, resolved: 120 },
    { month: 'Nov', detected: 210, resolved: 155 },
    { month: 'Dec', detected: 240, resolved: 190 },
    { month: 'Jan', detected: 195, resolved: 175 },
    { month: 'Feb', detected: 220, resolved: 200 },
    { month: 'Mar', detected: 185, resolved: 170 },
  ],
};

export const mockRentCards: Record<string, RentCardVerification> = {
  'RG-2025-ACC-00123': {
    cardNumber: 'RG-2025-ACC-00123',
    propertyAddress: '14 Osu Badu Street, Osu RE, Accra',
    landlordIdSuffix: '4821',
    monthlyRent: 2500,
    issuedAt: '2025-06-15T10:30:00Z',
    advanceLimitMonths: 6,
    isAdvanceCompliant: true,
    status: 'active',
  },
  'RG-2025-KMA-00456': {
    cardNumber: 'RG-2025-KMA-00456',
    propertyAddress: '27 Adum Road, Kumasi',
    landlordIdSuffix: '7193',
    monthlyRent: 1800,
    issuedAt: '2025-08-22T14:00:00Z',
    advanceLimitMonths: 6,
    isAdvanceCompliant: false,
    status: 'active',
  },
  'RG-2025-TMA-00789': {
    cardNumber: 'RG-2025-TMA-00789',
    propertyAddress: '5 Community 8, Tema',
    landlordIdSuffix: '3056',
    monthlyRent: 3200,
    issuedAt: '2025-09-01T09:15:00Z',
    advanceLimitMonths: 6,
    isAdvanceCompliant: true,
    status: 'active',
  },
};

export const mockComplianceData: ComplianceData = {
  overallScore: 72,
  totalProperties: 5,
  propertiesRegistered: 3,
  totalTenancies: 12,
  tenanciesWithAgreements: 9,
  rentCardsIssued: 8,
  compliantAdvancePayments: 10,
  registeredAgreements: 7,
};

export const mockTenantCases: TenantCase[] = [
  {
    id: 'case-001',
    caseNumber: 'RC-2025-ACC-00142',
    caseType: 'illegal_advance',
    status: 'under_investigation',
    description: 'Landlord demanded 2 years advance rent',
    openedAt: '2025-11-10T08:00:00Z',
  },
  {
    id: 'case-002',
    caseNumber: 'RC-2025-ACC-00198',
    caseType: 'no_rent_card',
    status: 'resolved',
    description: 'Landlord refused to issue rent card',
    openedAt: '2025-10-05T10:30:00Z',
  },
];
