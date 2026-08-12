import datetime, json

# GSC daily, 2026-06-17..2026-08-04 (total site, and /shop/ product pages)
total = [118,135,156,198,188,154,160,234,228,211,265,227,287,301,305,480,480,432,600,556,544,541,874,1097,1282,1400,1156,1137,1062,953,1052,1221,1280,1098,998,845,795,804,797,808,761,622,669,683,770,955,1112,796,650]
prod  = [0,1,9,35,24,21,35,86,73,34,51,49,126,166,148,280,278,290,415,380,346,354,716,860,1021,1189,934,912,867,757,819,986,1085,934,799,671,628,676,604,672,596,473,445,502,582,740,878,507,477]
start = datetime.date(2026,6,17)
days  = [start + datetime.timedelta(days=i) for i in range(len(total))]
assert len(total)==len(prod)==49 and days[-1]==datetime.date(2026,8,4)

W,H = 1000,340
L,R,T,B = 46,16,18,42
iw, ih = W-L-R, H-T-B
ymax = 1500
X = lambda i: L + iw*i/(len(days)-1)
Y = lambda v: T + ih*(1 - v/ymax)

def path(series):
    return "M " + " L ".join(f"{X(i):.1f},{Y(v):.1f}" for i,v in enumerate(series))
def area(series):
    return f"M {X(0):.1f},{Y(0):.1f} L " + " L ".join(f"{X(i):.1f},{Y(v):.1f}" for i,v in enumerate(series)) + f" L {X(len(series)-1):.1f},{Y(0):.1f} Z"

marks = [(datetime.date(2026,6,22),"1"),(datetime.date(2026,7,8),"2"),(datetime.date(2026,7,12),"3"),(datetime.date(2026,7,18),"4")]
svg = []
for gv in range(0,ymax+1,300):
    y = Y(gv)
    svg.append(f'<line class="grid" x1="{L}" y1="{y:.1f}" x2="{W-R}" y2="{y:.1f}"/>')
    svg.append(f'<text class="ytick" x="{L-8}" y="{y+3.5:.1f}" text-anchor="end">{gv:,}</text>')
for d,label in marks:
    i = (d-start).days; x = X(i)
    svg.append(f'<line class="evt" x1="{x:.1f}" y1="{T}" x2="{x:.1f}" y2="{T+ih}"/>')
    svg.append(f'<circle class="evtdot" cx="{x:.1f}" cy="{T-2}" r="8"/>')
    svg.append(f'<text class="evtnum" x="{x:.1f}" y="{T+1.5}" text-anchor="middle">{label}</text>')
svg.append(f'<path class="areaTotal" d="{area(total)}"/>')
svg.append(f'<path class="lineTotal" d="{path(total)}"/>')
svg.append(f'<path class="lineProd" d="{path(prod)}"/>')
li = len(prod)-1
svg.append(f'<circle class="endcap" cx="{X(li):.1f}" cy="{Y(prod[li]):.1f}" r="4"/>')
for d in [datetime.date(2026,6,17),datetime.date(2026,7,1),datetime.date(2026,7,15),datetime.date(2026,8,1)]:
    i=(d-start).days
    svg.append(f'<text class="xtick" x="{X(i):.1f}" y="{T+ih+22}" text-anchor="middle">{d.strftime("%b %-d")}</text>')

open('/private/tmp/claude-501/-Users-tomsesler/215c8b6f-6e6c-4ed1-83e5-ebfcbb55828b/scratchpad/cs/chart.svg','w').write(
  f'<svg class="chart" viewBox="0 0 {W} {H}" role="img" aria-label="Daily Google impressions, June 17 to August 4 2026. Product pages rise from near zero to roughly half of all impressions.">\n' + "\n".join(svg) + "\n</svg>")

jun = [i for i,d in enumerate(days) if d.month==6]; jul=[i for i,d in enumerate(days) if d.month==7]
print("June17-30 avg total/day", round(sum(total[i] for i in jun)/len(jun)))
print("July avg total/day", round(sum(total[i] for i in jul)/len(jul)))
print("June avg product/day", round(sum(prod[i] for i in jun)/len(jun)))
print("July avg product/day", round(sum(prod[i] for i in jul)/len(jul)))
print("prod share July", round(100*sum(prod[i] for i in jul)/sum(total[i] for i in jul)))
print("peak day", days[total.index(max(total))], max(total))
