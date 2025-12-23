// Logo.dev API configuration
export const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || '';

// Company domain mappings for logo.dev API
export const logoMappings = {
  tech: [
    { name: 'Google', domain: 'google.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Microsoft', domain: 'office.com' },
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
export function getLogoUrl(
  domain: string,
  size: number = 128,
  variant: 'icon' | 'full' = 'icon'
): string {
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN,
    size: String(size),
    format: 'png',
  });

  if (variant === 'full') {
    params.set('logo', 'full');
  }

  return `https://img.logo.dev/${domain}?${params.toString()}`;
}
