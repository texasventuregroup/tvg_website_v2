import type { Metadata } from 'next';
import { APPLY_FORM_EMBED_URL, APPLY_FORM_URL } from '../config/apply';

export const metadata: Metadata = {
  title: 'Apply | Texas Venture Group',
  description: 'Apply to Texas Venture Group for the Fall 2026 cohort.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#fcf7f0] text-[#082820] pt-20">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="font-mono text-sm text-[#01A072] uppercase tracking-wider">
              Fall 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
              Application Portal
            </h1>
            <p className="text-xl text-[#082820]/70 mb-8 leading-relaxed">
              Applications for the Fall 2026 cohort are now open. Complete the form below, or open it in a new tab.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-sm bg-[#082820] text-[#fcf7f0] font-bold hover:bg-[#01A072] transition-all"
              >
                Open Application Form
              </a>
              <a
                href="mailto:contact.txventuregroup@gmail.com"
                className="px-8 py-4 rounded-sm border border-[#082820]/20 bg-white font-semibold hover:border-[#082820]/40 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[#082820]/10 overflow-hidden shadow-sm">
            <iframe
              src={APPLY_FORM_EMBED_URL}
              title="TVG Fall 2026 Application"
              className="w-full h-[min(2200px,240vh)] border-0"
            >
              Loading the application…
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
