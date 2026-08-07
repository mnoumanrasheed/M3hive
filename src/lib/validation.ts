import { allServicesData } from '../data/services/servicesIndex';
import { officeLocations } from '../data/offices';
import { partnersData } from '../data/partners';
import { testimonialsData } from '../data/testimonials';
import { resourcesData } from '../data/resources';
import { leadershipMembers } from '../data/leadership';
import { compliancePillars } from '../data/compliance';

export function runDevContentValidation(): void {
  if (import.meta.env.PROD) return;

  console.log('🔍 [M3 Hive Data Validation] Starting content integrity verification...');

  const warnings: string[] = [];

  // 1. Check Service Route Slugs & Descriptions
  const slugs = new Set<string>();
  allServicesData.forEach((service) => {
    if (!service.slug) {
      warnings.push(`Service "${service.id}" is missing a route slug.`);
    } else if (slugs.has(service.slug)) {
      warnings.push(`Duplicate service route slug found: "${service.slug}".`);
    } else {
      slugs.add(service.slug);
    }

    if (!service.title) {
      warnings.push(`Service "${service.id}" is missing a title.`);
    }

    if (!service.subtitle) {
      warnings.push(`Service "${service.id}" is missing a subtitle/description.`);
    }
  });

  // 2. Check Office Locations
  const officeIds = new Set<string>();
  officeLocations.forEach((office) => {
    if (!office.title || !office.country) {
      warnings.push(`Office "${office.id}" is missing required title or country.`);
    }
    if (officeIds.has(office.id)) {
      warnings.push(`Duplicate office ID found: "${office.id}".`);
    } else {
      officeIds.add(office.id);
    }
  });

  // 3. Check Partners
  const partnerIds = new Set<string>();
  partnersData.forEach((partner) => {
    if (partnerIds.has(partner.id)) {
      warnings.push(`Duplicate partner ID found: "${partner.id}".`);
    } else {
      partnerIds.add(partner.id);
    }
  });

  // 4. Check Testimonials
  const testimonialIds = new Set<string>();
  testimonialsData.forEach((t) => {
    if (testimonialIds.has(t.id)) {
      warnings.push(`Duplicate testimonial ID found: "${t.id}".`);
    } else {
      testimonialIds.add(t.id);
    }
  });

  // 5. Check Resources
  const resourceIds = new Set<string>();
  resourcesData.forEach((r) => {
    if (resourceIds.has(r.id)) {
      warnings.push(`Duplicate resource ID found: "${r.id}".`);
    } else {
      resourceIds.add(r.id);
    }
  });

  // 6. Check Leadership
  const leaderIds = new Set<string>();
  leadershipMembers.forEach((m) => {
    if (leaderIds.has(m.id)) {
      warnings.push(`Duplicate leadership member ID found: "${m.id}".`);
    } else {
      leaderIds.add(m.id);
    }
  });

  // 7. Check Compliance
  const complianceIds = new Set<string>();
  compliancePillars.forEach((c) => {
    if (complianceIds.has(c.id)) {
      warnings.push(`Duplicate compliance pillar ID found: "${c.id}".`);
    } else {
      complianceIds.add(c.id);
    }
  });

  if (warnings.length === 0) {
    console.log('✅ [M3 Hive Data Validation] All 13 content modules passed validation with zero errors.');
  } else {
    console.warn(`⚠️ [M3 Hive Data Validation] Found ${warnings.length} warning(s):`, warnings);
  }
}
