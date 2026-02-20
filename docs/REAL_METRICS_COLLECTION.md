# Real Metrics Collection for Investor Pitch

**This document helps you gather ACTUAL current metrics from your production system.**

---

## Critical Questions to Answer

1. **When did you launch?** (Actual date, not "TBD")
2. **How many real users do you have?** (Paying + Free)
3. **What's your current MRR?** (Actual revenue)
4. **Is ekkOS_Code blocking you, or are you ready?**

---

## How to Get Real Metrics

### Option 1: Admin Dashboard (Easiest)

Go to: `https://platform.ekkos.dev/admin` (or your admin route)

The admin page queries:
- `user_subscriptions` table → Total users
- `patterns` table → Total patterns
- `user_subscriptions` where `tier = 'pro'` → Pro subscribers

**What to record:**
- Total Users: `[from admin dashboard]`
- Total Patterns: `[from admin dashboard]`
- Pro Subscribers: `[from admin dashboard]`

### Option 2: Direct Database Queries

Run these queries in Supabase SQL Editor:

```sql
-- Total Users (all tiers)
SELECT COUNT(DISTINCT user_id) as total_users
FROM user_subscriptions;

-- Paying Users (Pro, Team, Enterprise)
SELECT COUNT(DISTINCT user_id) as paying_users
FROM user_subscriptions
WHERE tier IN ('pro', 'team', 'enterprise') AND status = 'active';

-- Free Users
SELECT COUNT(DISTINCT user_id) as free_users
FROM user_subscriptions
WHERE tier = 'free' OR tier IS NULL;

-- Total Patterns
SELECT COUNT(*) as total_patterns FROM patterns;

-- Patterns in last 7 days
SELECT COUNT(*) as patterns_last_7d
FROM patterns
WHERE created_at >= NOW() - INTERVAL '7 days';

-- Active Users (users with activity in last 7 days)
SELECT COUNT(DISTINCT user_id) as active_users_7d
FROM pattern_retrievals
WHERE created_at >= NOW() - INTERVAL '7 days';

-- Daily Active Users (last 7 days)
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as dau
FROM pattern_retrievals
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- MRR (Monthly Recurring Revenue)
SELECT 
  tier,
  COUNT(*) as subscribers,
  CASE 
    WHEN tier = 'pro' THEN COUNT(*) * 99
    WHEN tier = 'team' THEN COUNT(*) * 39  -- per seat, adjust if needed
    WHEN tier = 'enterprise' THEN 0  -- custom pricing
    ELSE 0
  END as mrr
FROM user_subscriptions
WHERE status = 'active' AND tier IN ('pro', 'team', 'enterprise')
GROUP BY tier;

-- Total MRR
SELECT 
  SUM(
    CASE 
      WHEN tier = 'pro' THEN 99
      WHEN tier = 'team' THEN 39  -- per seat, adjust based on actual pricing
      WHEN tier = 'enterprise' THEN 0  -- custom, need to calculate separately
      ELSE 0
    END
  ) as total_mrr
FROM user_subscriptions
WHERE status = 'active' AND tier IN ('pro', 'team', 'enterprise');
```

### Option 3: API Endpoints

**Activity Stats (Last 7 Days):**
```bash
curl https://mcp.ekkos.dev/v1/memory/activity/stats?days=7
```

Returns:
- Total retrievals
- Total applications (verified)
- Patterns forged
- Unique users
- Success rate

**Dashboard Stats (User-specific):**
```bash
# Requires auth token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://platform.ekkos.dev/api/dashboard/stats
```

**Collective Stats (System-wide):**
```bash
curl https://platform.ekkos.dev/api/stats/collective
```

---

## Metrics to Record

### User Metrics

- [ ] **Total Users**: `___`
- [ ] **Paying Users**: `___` (Pro + Team + Enterprise)
- [ ] **Free Users**: `___`
- [ ] **Active Users (7d)**: `___` (users with activity in last 7 days)
- [ ] **Daily Active Users**: `___` (average over last 7 days)

### Revenue Metrics

- [ ] **MRR**: `$___` (Monthly Recurring Revenue)
- [ ] **ARR**: `$___` (MRR × 12)
- [ ] **Pro Subscribers**: `___`
- [ ] **Team Subscribers**: `___`
- [ ] **Enterprise Customers**: `___`

### Product Metrics

- [ ] **Total Patterns Stored**: `___`
- [ ] **Patterns Created (7d)**: `___`
- [ ] **Learning Episodes**: `___` (from `episodic_memory` or `tenant_conversations`)
- [ ] **API Calls (24h)**: `___` (from `mcp_events` or `pattern_retrievals`)
- [ ] **Pattern Success Rate**: `___%` (from patterns table)

### Launch Metrics

- [ ] **Launch Date**: `___` (When did ekkos.dev go live?)
- [ ] **Days Since Launch**: `___`
- [ ] **Signups Since Launch**: `___`
- [ ] **Extension Installs**: `___` (VS Code marketplace stats, if available)

---

## What Makes You Fundraisable

**If you have ANY of these, you're fundraisable:**

✅ **10+ signups** (even free users)
✅ **2-3 active daily users**
✅ **50+ patterns stored**
✅ **Any revenue at all** (even $1 MRR)

**Stronger signals:**
- ✅ **$100+ MRR** → Clear product-market fit signal
- ✅ **5+ paying customers** → Validation
- ✅ **10+ active daily users** → Engagement
- ✅ **1000+ patterns** → System working

---

## ekkOS_Code Status Check

**Is ekkOS_Code blocking you?**

Check:
- [ ] Extension version: `v0.8.0` (from roadmap)
- [ ] Extension status: `PRODUCTION ✅` (from architecture doc)
- [ ] Blocking issues: `[list any]`

**If ekkOS_Code is ready:**
- You can pitch: "IDE extension live, distribution channel ready"
- Stronger story: "Full-stack solution: platform + IDE integration"

**If ekkOS_Code is blocking:**
- Focus pitch on: "Platform live, IDE extension in final testing"
- Timeline: "Extension GA in [X] weeks"

---

## Investor Pitch Template (Once You Have Numbers)

**If you have real metrics, your pitch becomes:**

> "We launched ekkOS [X] weeks/months ago. Here's what's happened since:
> 
> - [X] users signed up ([Y] paying, [Z] free)
> - [X] patterns stored
> - $[X] MRR
> - [X] active daily users
> 
> We're raising to hire the team to scale this."

**This is 10x stronger than hypotheticals.**

---

## Next Steps

1. **Run the SQL queries above** in Supabase
2. **Fill in the metrics checklist**
3. **Update investor positioning** with real numbers
4. **If numbers are low but real**: That's OK! Early traction is still traction.

---

**Remember:** Real numbers, even small ones, beat hypotheticals every time.

**Last Updated:** 2026-01-07

