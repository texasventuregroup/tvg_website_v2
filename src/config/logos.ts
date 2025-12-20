// Logo.dev API configuration
// Replace LOGO_DEV_TOKEN with your actual publishable key
export const LOGO_DEV_TOKEN = import.meta.env.VITE_LOGO_DEV_TOKEN || 'YOUR_TOKEN_HERE';

// Company domain mappings for logo.dev API
export const logoMappings = {
  tech: [
    { name: 'Google', domain: 'google.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Tesla', domain: 'tesla.com' },
    { name: 'Palantir', domain: 'palantir.com' },
    { name: 'DeepMind', domain: 'deepmind.com' },
    { name: 'Stripe', domain: 'stripe.com' },
    { name: 'Salesforce', domain: 'salesforce.com' },
    { name: 'Coinbase', domain: 'coinbase.com' },
    { name: 'Slack', domain: 'slack.com' },
    { name: 'Expedia', domain: 'expedia.com' },
    { name: 'AMD', domain: 'amd.com' },
    { name: 'MathWorks', domain: 'mathworks.com' },
    { name: 'Raytheon', domain: 'rtx.com' },
    { name: 'Texas Instruments', domain: 'ti.com' },
    { name: 'Y Combinator', domain: 'ycombinator.com' },
    { name: 'Techstars', domain: 'techstars.com' },
    { name: 'Capital Factory', domain: 'capitalfactory.com' },
    { name: 'Antler', domain: 'antler.co' },
    { name: 'Boring Company', domain: 'boringcompany.com' },
    { name: 'Neo', domain: 'neo.com' },
    { name: 'Base Power', domain: 'basepowercompany.com' },
    { name: 'Boundary', domain: 'boundary.com' },
  ],
  finance: [
    { name: 'Goldman Sachs', domain: 'goldmansachs.com' },
    { name: 'Jane Street', domain: 'janestreet.com' },
    { name: 'Harvard Business School', domain: 'hbs.edu' },
    { name: 'Wells Fargo', domain: 'wellsfargo.com' },
    { name: 'Ares', domain: 'aresmgmt.com' },
    { name: 'McKinsey', domain: 'mckinsey.com' },
    { name: 'BCG', domain: 'bcg.com' },
    { name: 'Bain', domain: 'bain.com' },
    { name: 'Accenture', domain: 'accenture.com' },
    { name: 'PwC', domain: 'pwc.com' },
    { name: 'Evercore', domain: 'evercore.com' },
    { name: 'Guggenheim', domain: 'guggenheimpartners.com' },
    { name: 'Piper Sandler', domain: 'pipersandler.com' },
    { name: 'Moelis', domain: 'moelis.com' },
    { name: 'Kleiner Perkins', domain: 'kleinerperkins.com' },
    { name: '8VC', domain: '8vc.com' },
    { name: 'Battery Ventures', domain: 'battery.com' },
    { name: 'Soma Capital', domain: 'somacap.com' },
    { name: 'Contrary', domain: 'contrary.com' },
    { name: 'Republic', domain: 'republic.com' },
    { name: 'Mainsail Partners', domain: 'mainsailpartners.com' },
  ],
};

// Generate logo.dev URL for a domain
export function getLogoUrl(domain: string, size: number = 128): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=${size}&format=png`;
}

// Get all logos with their URLs
export function getLogosWithUrls(size: number = 128) {
  return {
    tech: logoMappings.tech.map(logo => ({
      name: logo.name,
      image: getLogoUrl(logo.domain, size),
      domain: logo.domain,
    })),
    finance: logoMappings.finance.map(logo => ({
      name: logo.name,
      image: getLogoUrl(logo.domain, size),
      domain: logo.domain,
    })),
  };
}
