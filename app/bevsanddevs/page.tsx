import Image from 'next/image';

export default function BevsAndDevs() {
  return (
    <main className="min-h-screen bg-tvg-cream text-tvg-forest pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 relative w-48 h-48 rounded-full overflow-hidden shadow-xl ring-4 ring-tvg-orange/20">
              <Image
                src="/images/logo/bevs-and-devs.jpg"
                alt="Bevs & Devs Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">For Builders</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-4 text-tvg-forest">Bevs & Devs</h1>
            <p className="text-xl text-tvg-forest/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Biweekly coworking for student founders. Share what you&apos;re building,
              get feedback, find your people.
            </p>
            <div className="flex gap-4">
              <a href="#schedule" className="px-8 py-4 rounded-sm bg-tvg-orange text-white font-bold hover:bg-tvg-orange/90 transition-all">
                View Schedule
              </a>
              <a href="#join" className="px-8 py-4 rounded-sm border border-tvg-forest hover:bg-tvg-forest hover:text-white transition-colors font-bold">
                Join Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tvg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="md:w-1/2">
              <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">The Idea</span>
              <h2 className="text-4xl font-bold mb-6 mt-4 text-tvg-forest">Built By Founders, For Founders</h2>
              <p className="text-lg text-tvg-forest/80 leading-relaxed mb-6">
                Building something is hard. Building something alone is harder.
                We created this to make the journey less lonely.
              </p>
              <p className="text-lg text-tvg-forest/80 leading-relaxed">
                Connect with YC-backed mentors and VCs from Austin to SF—Sputnik,
                Antler, 1517, Pear VC. Get real feedback from people who&apos;ve done it.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
                <Image
                  src="/images/events/bevs-devs-zf.webp"
                  alt="Bevs and Devs event"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-tvg-forest/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="schedule">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Every Two Weeks</span>
            <h2 className="text-4xl font-bold mt-4 text-tvg-forest">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-tvg-cream p-8 rounded-xl border-l-4 border-tvg-green">
              <h3 className="text-xl font-bold mb-2 text-tvg-green uppercase tracking-wider">Part 1</h3>
              <p className="text-3xl font-bold text-tvg-forest">Updates</p>
              <p className="mt-2 text-tvg-forest/70">Quick wins, blockers, what you need help with.</p>
            </div>
            <div className="bg-tvg-cream p-8 rounded-xl border-l-4 border-tvg-orange">
              <h3 className="text-xl font-bold mb-2 text-tvg-orange uppercase tracking-wider">Part 2</h3>
              <p className="text-3xl font-bold text-tvg-forest">Work Sprint</p>
              <p className="mt-2 text-tvg-forest/70">Heads down. Build. No distractions.</p>
            </div>
            <div className="bg-tvg-cream p-8 rounded-xl border-l-4 border-tvg-green">
              <h3 className="text-xl font-bold mb-2 text-tvg-green uppercase tracking-wider">Part 3</h3>
              <p className="text-3xl font-bold text-tvg-forest">Open Demos</p>
              <p className="mt-2 text-tvg-forest/70">Show what you made. Get feedback. Iterate.</p>
            </div>
          </div>

          <div className="bg-tvg-forest text-white rounded-xl p-8 flex flex-wrap justify-between items-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-tvg-orange text-xl">⏰</span>
              <span className="font-semibold">Be on time</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-tvg-orange text-xl">🚫</span>
              <span className="font-semibold">No schoolwork</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-tvg-orange text-xl">☕</span>
              <span className="font-semibold">Snacks provided</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tvg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Why Join</span>
            <h2 className="text-4xl font-bold mt-4 text-tvg-forest">What You Get</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-10 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-2xl font-bold mb-4 text-tvg-orange">Expert Mentorship</h3>
              <p className="text-tvg-forest/80 leading-relaxed text-lg">
                YC-backed founders, partners at top funds. People who&apos;ve built
                what you&apos;re trying to build.
              </p>
            </div>
            <div className="p-10 bg-white rounded-xl border border-tvg-forest/10">
              <h3 className="text-2xl font-bold mb-4 text-tvg-green">Your Crew</h3>
              <p className="text-tvg-forest/80 leading-relaxed text-lg">
                Other student founders building real things. The people you&apos;ll
                be texting at 2am when something breaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="join">
        <div className="container mx-auto px-6 text-center">
          <span className="font-mono text-sm text-tvg-green uppercase tracking-wider">Sponsored By</span>
          <h2 className="text-4xl font-bold mt-4 mb-12 text-tvg-forest">Our Partner</h2>
          <div className="max-w-md mx-auto bg-tvg-cream rounded-xl p-8 border border-tvg-forest/10">
            <div className="relative h-20 mb-6">
              <Image
                src="/images/logo/Teal_Sputnik.png"
                alt="Sputnik VC Logo"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-tvg-forest">Sputnik VC</h3>
            <p className="text-tvg-forest/70">
              Supporting the next generation of student founders and innovators.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
