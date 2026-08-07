const fs = require('fs');

const links = fs.readFileSync('src/data/officialResourceLinks.ts', 'utf8');

// The keys might be in double quotes
const matches = [...links.matchAll(/"originalTitle":\s*"([^"]+)"/g)].map(m => m[1]);
const types = [...links.matchAll(/"kind":\s*"([^"]+)"/g)].map(m => m[1]);

let out = `import { ResourceContent } from '../types/content';\n\n`;
out += `export const resourceContentMap: Record<string, ResourceContent> = {\n`;

for(let i=0; i<matches.length; i++) {
  const t = matches[i];
  const kind = types[i];
  const isArticle = kind === 'article';
  out += `  '${t.replace(/'/g, "\\'")}': {\n`;
  out += `    type: '${isArticle ? 'article' : 'case-study'}',\n`;
  out += `    data: {\n`;
  if (isArticle) {
    out += `      introduction: 'As industries rapidly evolve, ${t.toLowerCase().replace(/'/g, "\\'")} has emerged as a critical focal point for modern enterprises. By adopting forward-thinking strategies, organizations can redefine their operational paradigms.',\n`;
    out += `      keyChallenges: 'Navigating regulatory landscapes, overcoming legacy system constraints, and ensuring data privacy are just some of the hurdles businesses face. Additionally, the sheer pace of technological change can leave unprepared firms behind.',\n`;
    out += `      mainInsights: 'Our research indicates that leveraging advanced analytics, AI-driven automation, and a customer-centric mindset yields significant competitive advantages. Companies that prioritize agility tend to outperform their peers consistently.',\n`;
    out += `      practicalImplications: 'For business leaders, this means investing heavily in scalable digital infrastructure and fostering a culture of continuous learning. Strategic partnerships and cloud-native architectures are no longer optional.',\n`;
    out += `      conclusion: 'In summary, mastering these dynamics requires a balanced approach to innovation and risk management. Those who proactively adapt will be well-positioned to lead in the digital era.',\n`;
  } else {
    out += `      challenge: 'The client faced significant operational bottlenecks, escalating costs, and a fragmented customer experience due to outdated infrastructure and siloed data systems.',\n`;
    out += `      approach: 'We initiated a comprehensive digital transformation strategy, starting with a deep-dive assessment to identify key inefficiencies. Our team collaborated closely with stakeholders to align technical solutions with business goals.',\n`;
    out += `      solution: 'By implementing a unified, cloud-based platform and integrating AI-driven automation tools, we streamlined workflows and established a single source of truth for enterprise data.',\n`;
    out += `      outcomes: 'The project resulted in a 40% reduction in processing time, a 25% decrease in operational costs, and a marked improvement in customer satisfaction scores within the first six months.',\n`;
    out += `      keyTakeaway: 'Successful transformation requires not just technological upgrades, but a holistic realignment of processes and people. Scalable architectures are the foundation for long-term growth.',\n`;
  }
  out += `    }\n  },\n`;
}
out += '};\n';

fs.writeFileSync('src/data/resourceContent.ts', out);
console.log('Successfully generated src/data/resourceContent.ts with ' + matches.length + ' entries.');
