import { PracticeOptions } from './practice-options';
import { PracticeHistory } from './practice-history';

export default function PracticePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-[#0A2540] mb-2">Practice</h1>
        <p className="text-gray-600">
          Choose your practice session type and start improving your SAT skills.
        </p>
      </div>

      {/* Practice Options */}
      <PracticeOptions />

      {/* Practice History */}
      <PracticeHistory />
    </div>
  );
}