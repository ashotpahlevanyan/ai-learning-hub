declare module 'virtual:study-time' {
  import type { StudyTime } from './lib/studyTime';
  /** Study time per exam, keyed "<track>/<exam id>", computed from the bundles at build time. */
  const studyTimes: Record<string, StudyTime>;
  export default studyTimes;
}
