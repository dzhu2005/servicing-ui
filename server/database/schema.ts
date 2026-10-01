import { bigint, boolean, integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// Mirrors the existing public.users table (introspected from los.htb). The
// table is owned by another system, so don't generate migrations from this.
export const users = pgTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    contactId: bigint('contact_id', { mode: 'number' }),
    oasUserId: bigint('oas_user_id', { mode: 'number' }),
    refreshToken: text('refresh_token'),
    refreshTokenExpiryTime: timestamp('refresh_token_expiry_time', { withTimezone: true }),
    additionalInfo: jsonb('additional_info'),
    userOnlineStatusDd: integer('user_online_status_dd'),
    inactiveDate: timestamp('inactive_date', { withTimezone: true }),
    salesforceId: text('salesforce_id'),
    lmsId: text('lms_id'),
    isActive: boolean('is_active'),
    mosUserId: bigint('mos_user_id', { mode: 'number' }),
    delegateUwUserId: bigint('delegate_uw_user_id', { mode: 'number' }),
    delegateFunderUserId: bigint('delegate_funder_user_id', { mode: 'number' }),
    delegateMosUserId: bigint('delegate_mos_user_id', { mode: 'number' }),
    province: integer('province').array(),
    jobTitle: text('job_title'),
    userManagerId: bigint('user_manager_id', { mode: 'number' }),
    designatedMosPrimaryUserId: bigint('designated_mos_primary_user_id', { mode: 'number' }),
    designatedMosSecondaryUserId: bigint('designated_mos_secondary_user_id', { mode: 'number' }),
    designatedFulfillmentUnderwriterIds: bigint('designated_fulfillment_underwriter_ids', { mode: 'number' }).array(),
    designatedFundingUnderwriterIds: bigint('designated_funding_underwriter_ids', { mode: 'number' }).array(),
    designatedFunderId: bigint('designated_funder_id', { mode: 'number' })
})
