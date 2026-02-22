import { promises as fs } from 'fs';
import path from 'path';
import LogoCarousel, { CarouselLogo } from '../components/LogoCarousel';
import Countdown from '../components/Countdown';

const APPLICATION_DEADLINE = new Date('2026-01-22T23:59:00-06:00');

async function getCarouselLogos(): Promise<CarouselLogo[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'carousel-logos.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.logos || [];
}

export default async function Join() {
  const carouselLogos = await getCarouselLogos();

  return (
    <main className="min-h-screen bg-tvg-cream text-tvg-forest pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Ready to Explore?</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 mt-4 text-tvg-forest">Join the Expedition</h1>
            <p className="text-xl text-tvg-forest/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Applications for Spring 2026 are closed. Stay tuned for Fall 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-6 py-2 bg-tvg-orange/10 border border-tvg-orange/20 rounded-full text-tvg-orange font-semibold">
                <span>📅</span>
                <span>Applications Closed</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-2 bg-tvg-green/10 border border-tvg-green/20 rounded-full text-tvg-green font-semibold">
                <span>🚀</span>
                <span>Spring 2026 Cohort</span>
              </div>
            </div>

            <Countdown
              targetDate={APPLICATION_DEADLINE}
              deadlineText="Thursday 01/22 by 11:59 PM CT"
            />

            <div className="flex justify-center gap-4 mt-12">
              <span className="px-8 py-4 rounded-sm border border-tvg-forest/20 bg-white font-semibold cursor-not-allowed text-tvg-forest/50">
                Applications Closed
              </span>
              <a href="mailto:contact.txventuregroup@gmail.com" className="px-8 py-4 rounded-sm bg-tvg-forest text-white font-bold hover:bg-tvg-forest/90 transition-all">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Where Members Land</span>
            <h2 className="text-3xl font-bold mt-4 text-tvg-forest">The Destinations Vary</h2>
          </div>
          <LogoCarousel logos={carouselLogos} />
        </div>
      </section>

      <section className="py-24 bg-tvg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Why Join</span>
            <h2 className="text-4xl font-bold mt-4 text-tvg-forest">What You&apos;ll Get</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-2xl font-bold mb-4 text-tvg-green">Real Experience</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Work on actual projects with startups and investors. Learn by doing, not watching.
              </p>
            </div>
            <div className="p-8 bg-tvg-forest text-white rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-tvg-orange">Your Network</h3>
              <p className="text-white/80 leading-relaxed">
                Meet founders, investors, and other students who think the same way you do.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-2xl font-bold mb-4 text-tvg-green">Your Path</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Figure out which door makes sense for you. Venture, product, founding—the options are open.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">The Process</span>
            <h2 className="text-4xl font-bold mt-4 text-tvg-forest">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-tvg-cream rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-tvg-forest">Who Belongs Here</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Curious students who can&apos;t stop thinking about how technology businesses work.
                All majors. No prior experience needed.
              </p>
            </div>
            <div className="p-8 bg-tvg-cream rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-tvg-forest">Time Commitment</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Weekly meetings, project work, events. Designed to fit around your classes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tvg-cream" id="faq">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Questions</span>
            <h2 className="text-4xl font-bold mt-4 text-tvg-forest">FAQ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-xl font-bold mb-4 text-tvg-orange">How do I join?</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Apply when applications open each semester. Come to info sessions first—meet us, see if it&apos;s right for you.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-xl font-bold mb-4 text-tvg-orange">What programs exist?</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Analyst Program, Associates, Bevs & Devs. Different entry points for different interests.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-xl font-bold mb-4 text-tvg-orange">Do I need to be a business major?</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                No. We want diverse perspectives. CS, liberal arts, engineering—all welcome.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-xl font-bold mb-4 text-tvg-orange">How much time does it take?</h3>
              <p className="text-tvg-forest/80 leading-relaxed">
                Depends on the program. Weekly meetings plus project work. We work around your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tvg-forest text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-sm text-tvg-teal uppercase tracking-wider">Stay Connected</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Applications Closed</h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Check back for Fall 2026. In the meantime, follow us and come to events.
            </p>
            <div className="flex justify-center gap-4">
              <span className="px-8 py-4 rounded-sm border border-white/20 font-semibold cursor-not-allowed text-white/50">
                Applications Closed
              </span>
              <a href="mailto:contact.txventuregroup@gmail.com" className="px-8 py-4 rounded-sm bg-tvg-orange text-white font-bold hover:bg-tvg-orange/90 transition-all">
                Questions? Reach Out
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
