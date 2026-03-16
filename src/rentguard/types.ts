export type UserRole =
  | 'national_admin'
  | 'regional_officer'
  | 'taskforce_officer'
  | 'mmda_focal'
  | 'case_manager'
  | 'landlord'
  | 'tenant'
  | 'gra_auditor'
  | 'external_auditor';

export type TenancyStatus = 'draft' | 'active' | 'expired' | 'disputed' | 'terminated';
export type RentFrequency = 'weekly' | 'monthly' | 'quarterly' | 'biannual' | 'annual';

export type CaseType =
  | 'illegal_advance'
  | 'no_agreement'
  | 'no_rent_card'
  | 'unlawful_eviction'
  | 'unregistered_tenancy'
  | 'harassment'
  | 'false_particulars'
  | 'rent_overcharge'
  | 'maintenance_failure'
  | 'other';

export type CaseStatus =
  | 'received'
  | 'under_investigation'
  | 'notice_issued'
  | 'referred_to_court'
  | 'resolved'
  | 'closed'
  | 'withdrawn';

export type CaseSource = 'portal' | 'taskforce_field' | 'ussd' | 'whatsapp' | 'call_centre' | 'mmda_referral' | 'system_flag';
export type ViolationSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface RentGuardUser {
  id: string;
  role: UserRole;
  fullName: string;
  phone: string;
  email?: string;
  district?: string;
  region?: string;
}

export interface DashboardStats {
  registeredTenancies: number;
  tenanciesChangePercent: number;
  rentCardsIssued: number;
  cardsChangePercent: number;
  activeViolations: number;
  violationsChangePercent: number;
  complianceRate: number;
  complianceChangePercent: number;
  propertiesRegistered: number;
  openCases: number;
  officersActiveToday: number;
  advanceViolationsMTD: number;
  violationBreakdown: { name: string; value: number; color: string }[];
  rentCardTrend: { month: string; issued: number; target: number }[];
  violationTrend: { month: string; detected: number; resolved: number }[];
}

export interface RentCardVerification {
  cardNumber: string;
  propertyAddress: string;
  landlordIdSuffix: string;
  monthlyRent: number;
  issuedAt: string;
  advanceLimitMonths: number;
  isAdvanceCompliant: boolean;
  status: 'active' | 'suspended' | 'revoked';
}

export interface ComplianceData {
  overallScore: number;
  totalProperties: number;
  propertiesRegistered: number;
  totalTenancies: number;
  tenanciesWithAgreements: number;
  rentCardsIssued: number;
  compliantAdvancePayments: number;
  registeredAgreements: number;
}

export interface TenantCase {
  id: string;
  caseNumber: string;
  caseType: CaseType;
  status: CaseStatus;
  description: string;
  openedAt: string;
}
