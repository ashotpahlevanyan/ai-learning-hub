import { Link } from 'react-router-dom';
import { useMeta } from '../lib/useMeta';

export default function AboutPage() {
  useMeta('About and privacy', 'What AI Learning Hub is, how its content is made, and how your data is handled.');
  return (
    <main className="page prose">
      <h1>About AI Learning Hub</h1>
      <p>AI Learning Hub is a free study site for AI certifications. Each track turns an exam blueprint and the provider's official documentation into lessons, spaced-repetition flashcards, scenario practice questions and timed mock exams.</p>

      <h2>How the content is made</h2>
      <p>Content is drafted with AI assistance from each exam's published blueprint and official documentation.</p>
      <p>Exams are then put through a verification pass: a separate reviewer re-answers every practice question without seeing the answer key. Wherever its answer disagrees with the key, the question is corrected, or removed if it can't be made unambiguous. Each exam's dashboard shows whether it has been through this pass, when, and how many questions were fixed or dropped. Exams that haven't been verified yet say so; treat their answer keys with a little more caution.</p>
      <p>Verification catches ambiguous and mis-keyed questions. It is not a guarantee that every fact is current.</p>
      <p>Practice questions are original. They are not real exam questions, and the site has no access to any exam bank. Exam facts such as fees, item counts and domain weights can change: always confirm them with the official provider before booking.</p>

      <h2>Not affiliated</h2>
      <p>This is an independent resource. It is not affiliated with, sponsored or endorsed by Anthropic, Google, OpenAI, Amazon Web Services, Microsoft or any other provider. Product names belong to their owners.</p>

      <h2>Privacy</h2>
      <ul>
        <li>There are no accounts, cookies, analytics or ads.</li>
        <li>Your progress (answers, flashcard schedule, mock results, study plan) is stored only in your browser's local storage. It never leaves your device unless you export it.</li>
        <li>Clearing your browser data erases your progress, so export a backup from <Link to="/progress">My progress</Link> now and then.</li>
        <li>The site loads fonts from Google Fonts, which receives your IP address when fonts are fetched.</li>
      </ul>

      <h2>Found a mistake?</h2>
      <p>If a question's answer looks wrong or a fact is out of date, please report it on the project's GitHub repository so it can be fixed for everyone.</p>
    </main>
  );
}
