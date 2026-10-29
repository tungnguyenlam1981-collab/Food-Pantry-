import Link from 'next/link';
import { officialPantryContact } from '@/data/recipes';

export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Volunteer</p>
        <h1 className="text-3xl font-bold text-ink">Help support campus food access</h1>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft sm:p-8">
        <p className="text-base leading-7 text-stone-700">
          Volunteer opportunities and application links should only be added when a verified and approved USF Food Pantry URL is available. Until then, this prototype shows the official contact page so students can reach out directly.
        </p>

        <div className="mt-6 rounded-2xl bg-[#f3ead9] p-5">
          <p className="font-semibold text-ink">Current information</p>
          <p className="mt-2 text-sm text-stone-700">
            Please contact the USF Food Pantry for the latest volunteer information and approved application details.
          </p>
          <a href={officialPantryContact} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-xl bg-olive px-4 py-2.5 font-medium text-white">
            Contact the pantry
          </a>
        </div>

        <div className="mt-6 text-sm text-stone-700">
          <p>This prototype does not create a volunteer database or a public application form.</p>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm font-medium text-terracotta">← Back home</Link>
        </div>
      </div>
    </div>
  );
}
