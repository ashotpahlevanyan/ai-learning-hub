# Mobile Apps with Expo and React Native: pipeline report

Date: 2026-11-12
Bundle: `src/content/tracks/engineering/exams/mobile-expo.json`

Rebuilt from the run's journal (the assemble stage did not write report.md).

## Counts

| | Target | Actual |
|---|---|---|
| Lessons | 22 | 29 |
| Flashcards | 120 | 159 |
| Questions | 120 | 149 |

Answer positions 0/1/2/3: 46/42/42/42

Review: `{"date": "2026-11-12", "questionsChecked": 149, "fixed": 25, "dropped": 0}`.

## Research corrections

- Current stack as of 2026-11-12 is Expo SDK 58 (released 2026-10-15), React Native 0.88 and React 19.3.0. Expo packages now share the SDK major version (expo-router 58.x) since SDK 55.
- The Legacy Architecture is gone. RN 0.82+ ignores newArchEnabled=false, RN 0.84 removed legacy code, and Expo SDK 55 removed newArchEnabled from app.json (SDK 54 was the last with the Legacy Architecture). Don't teach the bridge as an option.
- Hermes V1 is the default engine (RN 0.84, Expo SDK 56).
- expo-router no longer depends on react-navigation (SDK 56). SDK 58 deprecates withLayoutContext in favor of integrateWithRouter. Native tabs import from expo-router/native-tabs (SDK 58+).
- SDK 58 / RN 0.88 removed InteractionManager, the Touchable root export and the Modal animated prop. RN 0.85 removed StyleSheet.absoluteFillObject. InputAccessoryView is deprecated in favor of react-native-keyboard-controller.
- eas update requires --environment (SDK 55+). SDK 58 changed NODE_ENV handling so each command sets it to its own mode.
- Google Play: new apps and updates must target API 36 since 2026-08-31. The extension to 2026-11-01 has expired.
- Apple: uploads need Xcode 26 with the iOS 26 SDK since 2026-04-28, and iOS apps must target iOS 13+ since 2026-09-09. The iOS 27 SDK requires the UIScene lifecycle, which SDK 58 prebuild generates.
- App Review Guidelines were last updated 2026-10-16 (1.2, 2.5.19, Section 5). 2.5.19 now covers changing features after approval, which matters for OTA updates.
- Google Play 16 KB page size: the current page says non-compliant updates are blocked from 2027-02-01.
- FlashList v2 has no estimatedItemSize; masonry is now a prop. Reanimated 4 needs the New Architecture and react-native-worklets. Gesture Handler is v3 with a hook API.
- Expo minimum iOS is 16.4 since SDK 56. Expo Go supports only the latest SDK and has required login on iOS since 2026-09-03. Push in Expo Go on Android throws an error since SDK 55.
- expo-av was removed (use expo-video and expo-audio). expo-sqlite libSQL was removed in SDK 58. shouldShowAlert is deprecated in favor of shouldShowBanner and shouldShowList.
- Edge-to-edge is mandatory: edgeToEdgeEnabled was removed in SDK 55, and apps targeting Android 16 cannot opt out.
- Local type-check toolchain lacks expo, expo-router, tanstack and reanimated packages, so TSX importing them will not resolve. Writers need stubs or should limit checked examples to react, react-native and zod.

## Unverified

- Whether Expo Go for SDK 58 has shipped to the stores, and whether create-expo-app now defaults to SDK 58
- expo prebuild default: the SDK 57 changelog says it cleans by default (--no-clean opts out), but the CNG docs page still describes the --clean flag
- Xcode minimum for SDK 58: the docs table says 26.4+, while the changelog requires Xcode 27 for some features
- Apple distribution certificate limit: the Expo credentials page contradicts itself
- Apple HIG 44x44pt minimum target and the privacy manifest NSPrivacyTracking and NSPrivacyCollectedDataTypes keys: the JS-rendered Apple pages did not load
- MASVS version string v2.1.0 (Jan 2024) and the MAS-L1/L2/R profiles in MASTG come from secondary or search sources (the 24 control statements are confirmed)
- Gesture Handler 3 hook API details and callback renames (onActivate and onDeactivate) come from search snippets only
- Reanimated 4 thread APIs (scheduleOnRN / runOnJS)
- AsyncStorage v3 API changes (docs URL returned 404)
- AccessibilityInfo.isReduceMotionEnabled, announceForAccessibility, allowFontScaling, maxFontSizeMultiplier and hitSlop: not on the fetched page
- router.navigate edge cases (withAnchor, dismissTo); expo-router +api and [...rest] notation not on the fetched excerpt
- iOS 16.4 web push for home-screen PWAs; TestFlight 90-day build expiry; TanStack networkMode default
- EAS Workflows get-build behavior when no build matches

## Verification by domain

### d1 (29 questions, 0 key disagreements)

**Fixed:**
- d1-q15: the explanation and the option-0 rationale implied TouchableOpacity was removed in SDK 58. The SDK 58 changelog removes only the `Touchable` root export, and the RN TouchableOpacity docs carry no deprecation notice. Rewrote both on Pressable's documented strengths (a { pressed } style function, hitSlop, and the RN docs calling it 'more extensive, future-proof'), and swapped the sdk-58 source for the TouchableOpacity docs.
- d1-l3 section 1: reworded the Touchable removal sentence the same way. It now names only the SDK 58 changelog, because the RN 0.88 blog does not mention Touchable.
- d1-q3: the option-2 rationale now credits the InteractionManager removal to SDK 58, matching the changelog ('use requestIdleCallback'), and no longer says 'SDK 58 / RN 0.88'.
- d1-q4: the option-0 rationale had said 'there is no bridge to target'. Softened it to note that interop layers still exist for older modules.
- d1-q5: added the Expo SDK 56 changelog as a source, since it backs the claim that Hermes V1 is the Expo default.
- d1-q27, d1-q29: added Expo's 'Analyzing bundles' guide as a source for not shipping source maps to production.
- d1-l1: added the RN 0.84 blog and the SDK 56 changelog as sources for the Hermes V1 and legacy-removal timeline rows.
- d1-l2: added the SDK 55 changelog (Android push in Expo Go now throws an error) and the SDK 57 changelog (prebuild cleans by default) as sources.
- d1-l3: added the RN Image docs (network images need explicit dimensions) and the SDK 58 changelog as sources.

**Dropped:** none

**Fact fixes:**
- The SDK 58 changelog removes only the `Touchable` root export, not TouchableOpacity. The RN TouchableOpacity docs show no deprecation notice and recommend Pressable as 'more extensive and future-proof' (checked on the live pages with WebFetch).
- RN 0.88 blog: its Deprecations section does not mention Touchable or InteractionManager, and it states 'no user-facing breaking changes'. Both removals are attributed to the Expo SDK 58 changelog.

**Remaining concerns:**
- d1-l2 states that SDK 57+ prebuild cleans by default. That is hedged as 'the changelog says', but research section (c) flags it as conflicting with the CNG docs page. No question depends on it.
- d1-l1 says Turbo Modules are loaded lazily, when first used. This is not in research.md, though it is long-standing documented RN behaviour.
- d1-l5 mentions EAS Observe native crash reporting. The only evidence is changelog titles, and the lesson wording is already soft.
- Blind solve agreed with every key (29/29). The answers were saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/blind-d1.json, and the corrected file was written back to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/domain-d1.json (valid JSON; every question has one rationale per option, (Select two.) labels match the answer counts, and every lesson and question has a source).

### d2 (28 questions, 0 key disagreements)

**Fixed:**
- d2-q2: replaced distractor 'Wrap the button in <Link href="/cart"> without asChild'. A Link's default action is navigate-like, so that option could also fix the duplication, which made the question ambiguous. It is now 'Keep router.push('/cart') but call it inside a setTimeout', and its rationale was updated to match.

**Dropped:** none

**Fact fixes:** none

**Remaining concerns:**
- d2-q2, lesson d2-l1 and flashcard d2-f3 rely on the claim that router.navigate unwinds to an existing route in the stack. The current Expo Router navigation page states this verbatim (checked with WebFetch). Research item 12 flags the push/navigate/dismissTo edge cases as unconfirmed, so if Expo changes navigate's semantics this question needs revisiting.
- Lesson d2-l5 and d2-q27 cite Stripe's idempotent-requests reference for the general idempotency-key pattern. It is an official vendor doc but not a standard; acceptable as an illustration.
- All 26 source URLs return HTTP 200. The AsyncStorage page ('unencrypted') and the RN 0.88 blog (InputAccessoryView deprecated in favour of KeyboardStickyView) were content-checked with WebFetch. Blind answers saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/blind-d2.json; the corrected file was written to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/domain-d2.json.

### d3 (24 questions, 0 key disagreements)

**Fixed:**
- d3-l4 section 'oauth-for-native-apps-system-browser-plus-pkce': reworded the WebBrowser.maybeCompleteAuthSession() claim. The old text said it 'closes the browser session when the redirect returns'. It now says it lets the redirect page finish the session and matters mainly for the web popup flow.
- d3-q4 rationale for option 2 (READ_EXTERNAL_STORAGE): rewritten to explain that a broader legacy permission works against the minimal-access policy, replacing a vaguer 'policy intent' line.

**Dropped:** none

**Fact fixes:**
- d3-l4: the maybeCompleteAuthSession description was inaccurate (it overstated it as closing the native browser session) and is now softened to match its purpose of finishing the auth session on the redirect page or web popup.

**Remaining concerns:**
- The 'from SDK 58, foreground notifications are shown by default unless setNotificationHandler says otherwise' claim (lesson d3-l2, d3-q9 explanation and rationale 2) rests only on research.md's reading of the SDK 58 changelog. It reverses the long-standing default, so it is worth re-checking against https://expo.dev/changelog/sdk-58 when convenient.
- d3-q13: 'Allow Once' is the keyed cause based on the Expo location docs' 'will silently fail' wording. It is the only option that fits, but the scenario could also arise from a user who picked 'While Using' and declined the upgrade to Always.
- No source URLs were re-fetched in this pass. All are on allowed official domains and match the URLs research.md says it verified.

### d4 (23 questions, 0 key disagreements)

**Fixed:**
- d4-q5: the scenario now says the header animates translateY and opacity, so the native-driver option clearly applies. Option A's parenthetical was corrected from 'only transform and opacity' to 'non-layout properties such as transform and opacity'.
- d4-q17: option A and the explanation now say React.lazy with dynamic import() defers loading and evaluating the module. Previously they said it 'loads code', which is inexact for native single-bundle Metro.
- d4-q14: rationale 2 rewritten. It had claimed 'Expo docs recommend Hermes for debugging Reanimated', which is unsupported.
- d4-l3: the claim 'Reanimated is incompatible with the old remote JS debugging' was replaced with 'debug with React Native DevTools on Hermes'.
- d4-l4: the lazy/Suspense wording in the deferring section was made more precise.
- d4-l5: added the reactnative.dev/docs/pressable source to back the hitSlop, parent-bounds and z-index claims (verified by WebFetch).
- d4-l1 and d4-q1: added the expo.dev/changelog/sdk-58 source to back the claim that InteractionManager was removed.

**Dropped:** none

**Fact fixes:**
- Removed an unsupported claim about Reanimated and remote JS debugging (d4-l3).
- Removed the unsupported 'Expo docs recommend Hermes for debugging Reanimated' (d4-q14 rationale).
- Corrected the useNativeDriver scope from 'only transform and opacity' to non-layout properties (d4-q5).
- Clarified that React.lazy defers module evaluation via dynamic import() (d4-l4, d4-q17).
- Checked these against live RN docs: the requestAnimationFrame onPress advice, requestIdleCallback, LayoutAnimation/Core Animation, and FlashList/Legend List on the performance page; systrace removal and Perfetto on the profiling page; hitSlop parent bounds and z-index on the pressable page; isReduceMotionEnabled, reduceMotionChanged, announceForAccessibility and isScreenReaderEnabled on the accessibilityinfo page. All confirmed.

**Remaining concerns:**
- The Apple HIG figure of 44 x 44 pt is hedged ('has long recommended') because research.md could not confirm the current HIG wording.
- Gesture Handler 3 hook and callback names come from search snippets, not a fully fetched page. The lesson only states this conceptually and no question depends on it.
- AccessibilityInfo docs do not explicitly document subscription.remove(). The usage is standard EventSubscription behavior, and q21 option B relies on it.
- flashcard d4-f6 and q4 say transform-remove-console also strips console calls from third-party libraries. That is consistent with the RN docs' redux-logger example and with Metro applying the Babel config to node_modules, but the plugin docs do not state it verbatim.
- The blind solve agreed with every key (saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/blind-d4.json). The corrected file was written to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/domain-d4.json with 2-space indentation.

### d5 (25 questions, 0 key disagreements)

**Fixed:**
- d5-l2 section 'what-ota-may-and-may-not-change': replaced 'Three texts set the limits, and they agree.' with wording that notes they differ in detail (Google's interpreter exception is broader than Apple's limits), so an update must satisfy all of them
- d5-l1 gotcha 3 (lost upload key): the old 'correct' text mixed up the app signing key and the upload key. Rewritten: Play accepts only uploads signed with the registered upload key, Google keeps the app signing key, and the fix is to reset the upload key through Play support

**Dropped:** none

**Fact fixes:**
- d5-l2: removed the overclaim that Expo's, Apple's and Google Play's OTA rules 'agree'
- d5-l1: corrected the gotcha about the lost Android upload key, which confused the upload key with the app signing key

**Remaining concerns:**
- Every question's key is option index 0 (multi-answer keys are [0,1]). Make sure options are shuffled at render or build time
- d5-q4 R3 says a provisioning profile is specific to one app ID. That is well-known and accurate, but research.md does not state it directly
- d5-q1 R2 dismisses a timestamp-based build number as 'fragile across time zones'. That is a weak reason, though option 0 is still clearly the best answer

### d6 (20 questions, 0 key disagreements)

**Fixed:**
- d6-q10: rationale for option C no longer rests on the unsupported blanket claim 'pinning is native configuration'; it now says the option leaves third-party and single-leaf pinning in place and that native-config pins cannot change OTA
- d6-q10: explanation now cites Android's pinning guidance (pin public keys, always include a backup key); the off-topic EAS Update intro source was replaced with developer.android.com/privacy-and-security/security-config
- d6-l2 pinning section: the backup-pin and public-key-pin advice is now sourced and quoted from Android's Network Security Configuration docs, and 'pinning is native configuration' is narrowed to 'when pins live in native configuration'; the Android source was added to the lesson
- d6-f14: 'until users install a new binary' changed to 'until users get an app update with new pins', with the advice to pin public keys

**Dropped:** none

**Fact fixes:**
- Certificate pinning guidance (public-key pins, backup pin, a key change forcing an app update) was not in research.md. It is now backed by https://developer.android.com/privacy-and-security/security-config, which says to 'always include a backup key ... Otherwise, you must push out an update to the app to restore connectivity'.
- The absolute claim that pinning is always native configuration and needs a new build was softened, because some pinning setups configure pins from JS.

**Remaining concerns:**
- The MASVS-NETWORK-2 control page could not be fully read with WebFetch. The control statement wording comes from research.md, which says it was fetched with curl.
- The iOS PWA limitations in d6-q20 and d6-l4 (no badging) follow web.dev as research.md quotes it. The question stem is scoped to 'supported by web.dev', but newer iOS versions may have changed some of these capabilities (research (c) item 13).
- Blind answers are saved to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/blind-d6.json and match all 20 keys. The corrected file was written to /Users/ashotpahlevanyan/MyProjects/maark/claude-cert/web/.pipeline/engineering-mobile-expo/domain-d6.json.

