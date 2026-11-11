import { Link } from 'react-router-dom';
import { syncConfigured } from '../lib/sync';
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
      <p>Study time estimates add each lesson's stated reading time to about 2 minutes per practice question and 30 seconds per flashcard: one pass through everything. Hands-on labs, rereading and repeat practice add more, so plan extra time if you're new to the subject.</p>
      <p>Practice questions are original. They are not real exam questions, and the site has no access to any exam bank. Exam facts such as fees, item counts and domain weights can change: always confirm them with the official provider before booking.</p>

      <h2>Not affiliated</h2>
      <p>This is an independent resource. It is not affiliated with, sponsored or endorsed by Anthropic, Google, OpenAI, Amazon Web Services, Microsoft, NVIDIA, Databricks or any other provider. Product names and logos belong to their owners and are shown only to identify which exam or technology a course covers. Logos come from <a href="https://simpleicons.org">Simple Icons</a>.</p>

      <h2>Privacy</h2>
      <ul>
        <li><strong>Who runs it:</strong> Ashot Pahlevanyan, as a personal, non-commercial project. Questions about your data go to the <a href="https://github.com/ashotpahlevanyan/ai-learning-hub/issues">project's GitHub issues</a>.</li>
        <li>There are no cookies, analytics, ads or third-party trackers, and you never need an account. Fonts and icons are served from this site, not from a third-party service.</li>
        <li><strong>Hosting:</strong> the site is served by GitHub Pages. Like any web server, GitHub processes your IP address to deliver pages and may keep it in short-lived security logs; see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub's privacy statement</a>.</li>
        <li>Your progress (answers, flashcard schedule, mock results, study plan) is stored in your browser's local storage. It never leaves your device unless you export it or sign in to sync.</li>
        {syncConfigured && <li>Signing in to sync is optional. If you do, your sign-in identity (email or GitHub/Google account) and a copy of your progress are stored in the site's Supabase database, readable only by your account. Delete that copy at any time from <Link to="/progress">My progress</Link>. That removes your progress but not the sign-in account itself; to have the account deleted too, ask in the <a href="https://github.com/ashotpahlevanyan/ai-learning-hub/issues">project's GitHub issues</a> and it will be removed.</li>}
        <li>Clearing your browser data erases the progress stored there, so sign in to sync or export a backup from <Link to="/progress">My progress</Link> now and then.</li>
        <li>Your reading settings (theme, text size, typeface) are saved in the same local storage and are never synced.</li>
        <li>You can ask what data is held about you, have it corrected or deleted, or object to its use, through the GitHub issues link above. If you are in the EU or UK you can also complain to your data protection authority.</li>
      </ul>

      <h2>Found a mistake?</h2>
      <p>If a question's answer looks wrong or a fact is out of date, please report it on the <a href="https://github.com/ashotpahlevanyan/ai-learning-hub/issues">project's GitHub repository</a> so it can be fixed for everyone.</p>

      <h2>Credits and licences</h2>
      <ul>
        <li>Typefaces: IBM Plex Sans, Serif and Mono, and Atkinson Hyperlegible Next, all under the SIL Open Font License 1.1, served from this site.</li>
        <li>Math rendering: KaTeX and its fonts (MIT licence).</li>
        <li>Brand marks: <a href="https://simpleicons.org">Simple Icons</a> (CC0). The marks remain trademarks of their owners.</li>
        <li>Other open-source libraries are listed in the repository's <a href="https://github.com/ashotpahlevanyan/ai-learning-hub/blob/main/THIRD_PARTY_NOTICES.md">third-party notices</a>.</li>
      </ul>
    </main>
  );
}
