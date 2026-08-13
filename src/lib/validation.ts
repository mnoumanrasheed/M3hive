import { allServicesData } from '../data/services/servicesIndex';
import { officeLocations } from '../data/offices';
import { testimonialsData } from '../data/testimonials';
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

  // 3. Check Testimonials
  const testimonialIds = new Set<string>();
  testimonialsData.forEach((t) => {
    if (testimonialIds.has(t.id)) {
      warnings.push(`Duplicate testimonial ID found: "${t.id}".`);
    } else {
      testimonialIds.add(t.id);
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
    console.log('✅ [M3 Hive Data Validation] All content modules passed validation with zero errors.');
  } else {
    console.warn(`⚠️ [M3 Hive Data Validation] Found ${warnings.length} warning(s):`, warnings);
  }
}
