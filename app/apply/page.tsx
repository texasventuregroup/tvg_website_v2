import type { Metadata } from 'next';
import { APPLY_FORM_URL } from '../config/apply';

export const metadata: Metadata = {
  title: 'Apply | Texas Venture Group',
  description: 'Apply to Texas Venture Group for the Fall 2026 cohort.',
};

const steps = [
  {
    n: '01',
    title: 'Submit the form',
    body: 'Tell us about yourself through the Fall 2026 application.',
  },
  {
    n: '02',
    title: 'Interview',
    body: 'If we move you forward, we will reach out for a conversation.',
  },
  {
    n: '03',
    title: 'Decision',
    body: 'We review every application and follow up with next steps.',
  },
];

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-sm text-[#01A072] uppercase tracking-wider">
              Fall 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
              Application Portal
            </h1>
            <p className="text-xl text-[#082820]/70 mb-8 leading-relaxed">
              Applications for the Fall 2026 cohort are now open. Submit yours through the form.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-6 py-2 bg-[#01A072]/10 border border-[#01A072]/20 rounded-full text-[#01A072] font-semibold">
                Applications Open
              </div>
              <div className="flex items-center gap-2 px-6 py-2 bg-[#bf5700]/10 border border-[#bf5700]/20 rounded-full text-[#bf5700] font-semibold">
                Fall 2026 Cohort
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-sm bg-[#082820] text-[#fcf7f0] font-bold hover:bg-[#01A072] transition-all"
              >
                Apply Now
              </a>
              <a
                href="mailto:contact.txventuregroup@gmail.com"
                className="px-8 py-4 rounded-sm border border-[#082820]/20 bg-white font-semibold hover:border-[#082820]/40 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.n}
                className="p-8 bg-white rounded-xl border border-[#082820]/10"
              >
                <p className="font-mono text-xs text-[#01A072] mb-3">{step.n}</p>
                <h2 className="text-xl font-bold mb-3">{step.title}</h2>
                <p className="text-sm text-[#082820]/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
