# Rebuild pipeline/reports/<track>-<id>-<date>.md from a run journal when the assemble stage did not write report.md.
# Usage: python3 scripts/build-report.py <journal.jsonl> <bundle.json> "<Title>" <out.md> [YYYY-MM-DD]
import json,collections,sys
import datetime
J,bundle,title,out=sys.argv[1:5]
day=sys.argv[5] if len(sys.argv)>5 else datetime.date.today().isoformat()
res=[json.loads(l)['result'] for l in open(J) if '"type":"result"' in l]
research=next(r for r in res if isinstance(r,dict) and 'corrections' in r)
ver=[r for r in res if isinstance(r,dict) and 'keyDisagreements' in r]
e=json.load(open(bundle))
pos=collections.Counter(i for q in e['questions'] for i in q['answer'])
L=[f"# {title}: pipeline report","",f"Date: {day}",f"Bundle: `{bundle.split('web/')[-1]}`","","Rebuilt from the run's journal (the assemble stage did not write report.md).","","## Counts","","| | Target | Actual |","|---|---|---|",
f"| Lessons | 22 | {len(e['lessons'])} |",f"| Flashcards | 120 | {len(e['flashcards'])} |",f"| Questions | 120 | {len(e['questions'])} |","",
"Answer positions 0/1/2/3: "+"/".join(str(pos[k]) for k in range(4)),"",f"Review: `{json.dumps(e.get('review'))}`.","","## Research corrections",""]+[f"- {c}" for c in research['corrections']]+["","## Unverified",""]+[f"- {c}" for c in research.get('unverified',[])]+["","## Verification by domain",""]
for v in sorted(ver,key=lambda v:v['domain']):
  L+=[f"### {v['domain']} ({v['questions']} questions, {v['keyDisagreements']} key disagreements)",""]
  for k,t in (('fixed','Fixed'),('dropped','Dropped'),('factFixes','Fact fixes'),('remainingConcerns','Remaining concerns')):
    items=v.get(k) or []
    L.append(f"**{t}:**"+(" none" if not items else "")); L+=[f"- {x}" for x in items]; L.append("")
open(out,'w').write("\n".join(L)+"\n")
print(out, len(L))
