export const RECRUITING_SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'positions', label: 'Position Requirements' },
  { id: 'targets', label: 'Target Schools' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'how-to', label: 'How to Get Recruited' },
  { id: 'communication', label: 'Coach Communication' },
  { id: 'film', label: 'Game Film' },
  { id: 'visits', label: 'Visits & Camps' },
  { id: 'offers', label: 'Offers & Signing' },
  { id: 'resources', label: 'Resources' },
] as const

export type RecruitingSectionId = (typeof RECRUITING_SECTIONS)[number]['id']

export interface GuideCard {
  title: string
  body?: string
  bullets?: string[]
}

export interface SampleMessage {
  title: string
  channel: 'Email' | 'DM'
  when: string
  body: string
}

export interface ResourceLink {
  name: string
  kind: 'Official' | 'Website' | 'Film' | 'Book / guide' | 'Partner'
  note: string
  href?: string
}

export interface FilmPosition {
  name: string
  lookingFor: string[]
}

export interface FilmSportGuide {
  sport: string
  overview: string
  positions: FilmPosition[]
}

export const recruitingGuidelines: GuideCard[] = [
  {
    title: 'Start with eligibility, not likes',
    body: 'Coaches can only offer what you are eligible to accept. Keep NCAA core courses, your NCAA ID, and a test-score plan current before you chase camps.',
    bullets: [
      'Create or confirm your NCAA Eligibility Center account in the sophomore year.',
      'Division I needs 10 core courses before senior year, including 7 in English, math, or science.',
      'Many colleges still want an SAT or ACT on file even when NCAA eligibility does not require one.',
    ],
  },
  {
    title: 'Be honest about your level',
    body: 'A good fit beats a logo. Use film, camp results, and your high school or club coach to sort schools into reach, target, and likely.',
    bullets: [
      'Watch recent recruits at that school who play your position — not just the starters from five years ago.',
      'Include NCAA DII, DIII, NAIA, and NJCAA schools. Playing time and a degree matter more than a hat.',
      'If a service “guarantees” a Division I offer for a fee, walk away.',
    ],
  },
  {
    title: 'Know the contact rules at a high level',
    body: 'NCAA recruiting calendars tell coaches when they may call, visit, or evaluate. Dead periods and recruiting shutdowns are not the time to expect a reply.',
    bullets: [
      'Use this app’s Recruiting Calendar before you email during a holiday or signing week.',
      'Coaches can usually receive your email any time. They may not be allowed to reply during a dead period.',
      'Parents should not contact coaches for you after you are old enough to write your own note. Coaches want to hear your voice.',
    ],
  },
  {
    title: 'Protect yourself and your family',
    bullets: [
      'Never send a Social Security number, bank info, or a copy of a parent’s ID to a “recruiter.”',
      'Do not go on a visit without a parent or guardian knowing the itinerary.',
      'Keep a parent, counselor, or high school coach copied on anything that involves money, housing, or a written offer.',
      'Public social accounts should look like a student-athlete, not a highlight-reel brand with no schoolwork in sight.',
    ],
  },
]

export const howToGetRecruited: GuideCard[] = [
  {
    title: 'The process in one page',
    body: 'Recruiting is a loop: get better, show film, tell the right coaches, follow up, visit, and decide. You own the loop. Coaches will not hunt for every good player.',
    bullets: [
      'Build a coach-ready profile and a 4–6 minute highlight video.',
      'Make a list of 20–40 schools that match your grades, test plan, and athletic level.',
      'Send a short first note with film, GPA, and upcoming schedule.',
      'Follow up after new film, a camp, or a big game — not every week with the same clip.',
      'Visit campuses you can actually see yourself attending if the sport ended tomorrow.',
    ],
  },
  {
    title: 'Class-year timeline',
    bullets: [
      '9th grade: Play, lift, take real core courses, and start a Hudl or similar film account. No mass emails yet.',
      '10th grade: NCAA ID, first highlight reel, camp at 1–2 realistic schools, and a short target list.',
      '11th grade: This is the heavy year. Update film each month of the season, email coaches, go to junior days, and take the SAT or ACT.',
      '12th grade: Finish 10 cores before the seventh semester, take official visits if offered, and only sign a written offer you and your family have read.',
    ],
  },
  {
    title: 'What actually gets you on a board',
    bullets: [
      'Measurables and film that match the position they recruit.',
      'A transcript that will clear NCAA and the school’s admissions office.',
      'A coach or counselor who will pick up the phone when a college calls.',
      'Reliability: you reply, you show up, and your film matches what they see in person.',
    ],
  },
  {
    title: 'Build a school list that works',
    bullets: [
      'Academic fit: major, campus size, and a GPA/test range you can actually hit.',
      'Athletic fit: depth chart, scheme, and how many players they take at your position each year.',
      'Life fit: distance from Tampa, cost after aid, and whether you would stay if you got hurt.',
      'Keep the live list in Coach Search notes: last contact, reply, next event, and “interest level.”',
    ],
  },
]

export const communicationWhen: GuideCard[] = [
  {
    title: 'When to email',
    body: 'Email is the default. It is searchable, easy to forward to the position coach, and looks like a student who can handle college communication.',
    bullets: [
      'First introduction to a staff.',
      'Sending a new Hudl link, transcript, or camp date.',
      'Thank-you after a camp, junior day, or unofficial visit.',
      'Any question that needs a complete answer (aid, admissions, major).',
    ],
  },
  {
    title: 'When to DM',
    body: 'A short DM is a tap on the shoulder, not the whole conversation. Use it after they already know you, or when a coach is active on that platform.',
    bullets: [
      'After they viewed your Hudl or replied to an email.',
      'The night before a camp: “See you at 8 a.m. check-in — Jude Hewitt, 2028 QB.”',
      'A 15-second clip from last Friday, with the full film still in email.',
      'Do not start with “Hey coach watch this” and no name, class year, or school.',
    ],
  },
  {
    title: 'How often to follow up',
    bullets: [
      'First note, then one follow-up 10–14 days later if there is no reply.',
      'After that, only write when you have news: new film, camp invite, honor, or a schedule change.',
      'If they ask you to send monthly updates, do that on the first Sunday of the month.',
      'Silence during a dead period is normal. Check the calendar before you assume they are ignoring you.',
    ],
  },
  {
    title: 'Keep recruiting organized',
    body: 'If it is only in your head, you will double-send or ghost a school you like.',
    bullets: [
      'Use Coach Search in this app as the live tracker: school, coach, last email, reply, and next step.',
      'One email folder per school. Subject lines like “Jude Hewitt 2028 QB — Thomas Jefferson (Tampa) — updated film.”',
      'A simple sheet with columns: school, division, coach email, last contact, response, visit, offer, notes.',
      'Share the sheet with a parent so someone else can see who is waiting on you.',
      'After every camp or call, write three bullets the same day: who you met, what they asked, what you promised to send.',
    ],
  },
]

export const sampleMessages: SampleMessage[] = [
  {
    title: 'First introduction',
    channel: 'Email',
    when: 'Sophomore spring or junior fall, once film and a GPA are ready.',
    body: `Subject: Jude Hewitt — 2028 QB — Thomas Jefferson HS (Tampa, FL)

Coach LastName,

My name is Jude Hewitt. I am a 2028 quarterback at Thomas Jefferson High School in Tampa, Florida.

I am 5'6" and 155 lbs, Class of 2028, and I am building my NCAA core-course file (current DI core GPA 3.883). I would like to learn more about your program and whether I could be a fit.

Highlight film: [Hudl link]
Upcoming: [next game or camp date]

Thank you for your time. I would be glad to send a transcript or full-game film.

Jude Hewitt
2028 QB | Thomas Jefferson HS
[phone] | [email]`,
  },
  {
    title: 'Follow-up with new film',
    channel: 'Email',
    when: '10–14 days after the first note, or right after a new game is uploaded.',
    body: `Subject: Jude Hewitt 2028 QB — updated Week 3 film

Coach LastName,

Quick update from Thomas Jefferson (Tampa). I started Friday at QB and uploaded the full game plus a 4-minute highlight cut.

Film: [link]
Next game: Friday, [date] vs [opponent]

Please let me know if you would like a transcript or to see me at a camp this spring.

Jude Hewitt`,
  },
  {
    title: 'Thank-you after a camp',
    channel: 'Email',
    when: 'The night of the camp or the next morning.',
    body: `Subject: Thank you — Jude Hewitt 2028 QB, Saturday camp

Coach LastName,

Thank you for having me at camp on Saturday. I learned a lot in the 7-on-7 period and from Coach [Name] in the meeting.

I am a 2028 QB at Thomas Jefferson in Tampa. If it is helpful, here is my updated film: [link].

I would like to stay in touch and visit campus again this fall if that is allowed.

Jude Hewitt`,
  },
  {
    title: 'Short first DM',
    channel: 'DM',
    when: 'Only if the coach is clearly active on that account, or after they have your email.',
    body: `Coach LastName — Jude Hewitt, 2028 QB, Thomas Jefferson (Tampa). Just emailed my film and GPA. Happy to send the full game if useful. Thank you.`,
  },
  {
    title: 'Day-before-camp DM',
    channel: 'DM',
    when: 'After you are registered and they already have your name.',
    body: `Coach — Jude Hewitt 2028 QB, registered for tomorrow’s 8 a.m. camp. See you at check-in.`,
  },
]

export const filmBasics: GuideCard[] = [
  {
    title: 'What every coach wants from film',
    bullets: [
      'Open with your best three plays. Do not save them for the end.',
      '4–6 minutes of highlights plus a link to at least one full game.',
      'Keep scoreboard, hash marks, and your jersey number readable. Add a telestrator circle only if the camera is far.',
      'Prefer game audio over loud music. Coaches listen for cadence, communication, and crowd context.',
      'Label the video: name, class year, position, school, city, and jersey number.',
      'Update during the season. A reel from last November is a different player.',
    ],
  },
  {
    title: 'How to shoot it',
    bullets: [
      'End-zone or press-box angle beats a phone on the sideline for most team sports.',
      'Hold the play for one second after the whistle so coaches see effort and finish.',
      'Include a few “unsuccessful” reps if they show processing: a check-down, a blocked shot recovery, a long at-bat.',
      'Do not splice only trick plays. Coaches assume the rest of the film does not exist.',
    ],
  },
]

export const filmBySport: FilmSportGuide[] = [
  {
    sport: 'Football',
    overview:
      'Position coaches watch processing first, then traits. A clean pocket drop with the right read beats a backyard scramble every time.',
    positions: [
      {
        name: 'Quarterback',
        lookingFor: [
          'Pre-snap identification and a timely cadence.',
          'Eyes downfield, not on the rush, with a clean drop and balanced base.',
          'Accuracy on time: hitch, out, and deep ball with catchable placement.',
          'Second-reaction plays without turning into a running back on every pressure.',
          'Leadership: you get the play in, you get people lined up, you own the result.',
        ],
      },
      {
        name: 'Skill (WR / RB / DB)',
        lookingFor: [
          'Release, burst, and play strength at the catch or tackle point.',
          'Route depth and ability to track the ball without drifting.',
          'Run-after-catch or run-after-contact that is real, not just broken tackles on youth film.',
          'Defense: angles, levies, and whether you tackle or just arrive.',
        ],
      },
      {
        name: 'Line / bigs',
        lookingFor: [
          'First step and strike — not just a pancake compilation.',
          'Anchor vs. bull rush and recovery when you lose the first move.',
          'Finish to the second level and effort on the backside.',
        ],
      },
    ],
  },
  {
    sport: 'Baseball',
    overview: 'Coaches want projection and repeatability. One home run is less useful than a round of quality at-bats.',
    positions: [
      {
        name: 'Hitters',
        lookingFor: [
          'Stance, stride, and barrel path that can handle velocity.',
          'Two-strike approach and barrel control, not only pull-side damage.',
          'Exit quality and whether you stay through the middle.',
        ],
      },
      {
        name: 'Pitchers',
        lookingFor: [
          'Fastball command to both sides, not just peak velo on a gun.',
          'A second pitch you can throw for a strike when you are behind.',
          'Tempo, repeatable delivery, and composure after a hit.',
        ],
      },
      {
        name: 'Infield / outfield',
        lookingFor: [
          'First step, glove presentation, and a transferable arm.',
          'Footwork on double plays or do-or-die charges.',
          'Routes in the outfield and a clean transfer.',
        ],
      },
    ],
  },
  {
    sport: 'Softball',
    overview: 'Same idea as baseball, with extra weight on short-game decisions and arm accuracy in the dirt.',
    positions: [
      {
        name: 'Hitters / slappers',
        lookingFor: ['Barrel control vs. movement.', 'Two-strike toughness.', 'Bunt and slap decisions that match the count.'],
      },
      {
        name: 'Pitchers',
        lookingFor: ['Location to both sides.', 'Change of speed you can throw for a strike.', 'Composure with runners on.'],
      },
      {
        name: 'Defense',
        lookingFor: ['First step and transfer.', 'Throws that hold a line.', 'Communication on pop-ups and bunts.'],
      },
    ],
  },
  {
    sport: 'Basketball',
    overview: 'Film should show you on both ends. A scoring montage with no defense reads as incomplete.',
    positions: [
      {
        name: 'Guards',
        lookingFor: [
          'Pick-and-roll decisions and live-dribble passing.',
          'Shot selection and ability to shoot off the catch and the bounce.',
          'On-ball defense, closeouts, and talking on coverage.',
        ],
      },
      {
        name: 'Wings / posts',
        lookingFor: [
          'Finishing through contact and short-roll passing.',
          'Rebounding with two hands and an outlet.',
          'Help defense and verticality without fouling every time.',
        ],
      },
    ],
  },
  {
    sport: 'Soccer',
    overview: 'First touch and the decision after it matter more than a solo goal from the half line.',
    positions: [
      {
        name: 'Field players',
        lookingFor: [
          'First touch under pressure and scanning before the ball arrives.',
          'When you dribble vs. when you play simple.',
          'Defensive work rate and the ability to win a duel cleanly.',
        ],
      },
      {
        name: 'Goalkeepers',
        lookingFor: ['Starting position and claim on crosses.', 'Distribution that starts the next attack.', 'Shot-stopping with a good second save.'],
      },
    ],
  },
  {
    sport: 'Volleyball',
    overview: 'Coaches watch approach mechanics and whether you score in-system and out-of-system.',
    positions: [
      {
        name: 'Hitters',
        lookingFor: ['Approach timing and arm swing.', 'Ability to tool the block and hit high-seam shots.', 'Block and cover effort.'],
      },
      {
        name: 'Setters / liberos',
        lookingFor: ['Tempo and location to more than one option.', 'Serve-receive platform and decision.', 'Defense that keeps the ball high and playable.'],
      },
    ],
  },
  {
    sport: 'Lacrosse',
    overview: 'Stick skills have to survive pressure. Dodges that only work in space will not hold up.',
    positions: [
      {
        name: 'Attack / midfield',
        lookingFor: ['Strong- and weak-hand shooting.', 'Draw-and-kick decisions.', 'Ride and defensive effort after a turnover.'],
      },
      {
        name: 'Defense / goalie',
        lookingFor: ['Footwork and angle, not just takeaway checks.', 'Clearing outlet.', 'Saves with a controllable rebound.'],
      },
    ],
  },
  {
    sport: 'Track & Field',
    overview: 'Marks are the film. Still send a race or attempt video so coaches see mechanics and competitiveness.',
    positions: [
      {
        name: 'All event groups',
        lookingFor: [
          'Legal, recent marks with wind and meet name.',
          'A full race or full attempt series, not only the PR clip.',
          'Mechanics: drive phase, bar clearance, implement finish.',
          'How you compete when you are not winning at 80 meters.',
        ],
      },
    ],
  },
]

export const visitsAndCamps: GuideCard[] = [
  {
    title: 'Unofficial vs. official visits',
    bullets: [
      'Unofficial: your family pays. You can often go earlier and more often, subject to the sport calendar.',
      'Official: the school can pay. Sit with a parent and write down what is covered before you accept.',
      'On any visit, walk a class, see a dining hall, and ask a current player a question the coach did not script.',
    ],
  },
  {
    title: 'Camps, junior days, and showcases',
    bullets: [
      'A school camp is the best place to be seen by that staff. A giant showcase is a billboard — useful, not magic.',
      'Register with the name, class year, and film link you use in email so they can find you in the database.',
      'Sleep, eat, and know the schedule. The evaluation starts at check-in, not at the first drill.',
      'Send the thank-you email before you post the camp photos.',
    ],
  },
  {
    title: 'Questions worth asking',
    bullets: [
      'How many players will you take at my position in the 2028 class?',
      'What does a typical first-year class schedule look like in my major?',
      'How do you handle the transfer portal at my position?',
      'What would you want to see from me between now and signing?',
    ],
  },
]

export const offersAndSigning: GuideCard[] = [
  {
    title: 'Verbal interest is not a contract',
    body: 'A coach saying they want you is the start of a conversation. The document that matters is a written offer of athletics aid from that school.',
    bullets: [
      'The National Letter of Intent program ended in 2024. Athletes now sign the school’s written athletics-aid agreement.',
      'Football early signing for 2026–27 is December 2–4, 2026. Most other sports can sign beginning November 11, 2026.',
      'Read every line with a parent: years of aid, summer school, walk-on vs. aid, and what happens if a coach leaves.',
    ],
  },
  {
    title: 'Before you say yes',
    bullets: [
      'Visit if you can. Do not commit to a campus you have only seen on Instagram.',
      'Ask how many players at your position are already committed or on roster.',
      'Compare academic support and the actual major, not the facility tour.',
      'Give yourself a night to talk with family. A 20-minute deadline on a phone call is a pressure tactic.',
    ],
  },
]

export const recruitingResources: ResourceLink[] = [
  {
    name: 'NCAA Eligibility Center',
    kind: 'Official',
    note: 'Create your NCAA ID, send transcripts, and track amateurism.',
    href: 'https://www.eligibilitycenter.org',
  },
  {
    name: 'NCAA Guide for the College-Bound Student-Athlete',
    kind: 'Book / guide',
    note: 'Free official handbook covering eligibility, recruiting, and amateurism.',
    href: 'https://www.ncaa.org/sports/2021/2/10/student-athletes.aspx',
  },
  {
    name: 'NCAA recruiting calendars',
    kind: 'Official',
    note: 'Sport-by-sport dead, quiet, contact, and evaluation periods. Also mirrored in this app.',
    href: 'https://www.ncaa.org/sports/2015/2/13/recruiting.aspx',
  },
  {
    name: 'NAIA Eligibility Center',
    kind: 'Official',
    note: 'Use this if NAIA schools are on your list. Rules are not the same as NCAA.',
    href: 'https://www.naia.org',
  },
  {
    name: 'NJCAA',
    kind: 'Official',
    note: 'Junior-college path. A smart option for development, academics, or a second look.',
    href: 'https://www.njcaa.org',
  },
  {
    name: 'Hudl',
    kind: 'Film',
    note: 'Standard film home for most high school staffs. Share a public highlight plus full games.',
    href: 'https://www.hudl.com',
  },
  {
    name: 'MaxPreps',
    kind: 'Website',
    note: 'Stats, schedule, and a public profile coaches already search.',
    href: 'https://www.maxpreps.com',
  },
  {
    name: 'SportsRecruits',
    kind: 'Website',
    note: 'Profile and college-search tool used by many club and high school athletes.',
    href: 'https://www.sportsrecruits.com',
  },
  {
    name: 'NCSA',
    kind: 'Website',
    note: 'Large recruiting marketplace. Useful for discovery; you still own the emails and film.',
    href: 'https://www.ncsasports.org',
  },
  {
    name: 'FieldLevel',
    kind: 'Website',
    note: 'Another coach-messaging network. Do not pay for promises — pay only for tools you use.',
    href: 'https://www.fieldlevel.com',
  },
  {
    name: 'Perfect Game',
    kind: 'Website',
    note: 'Baseball showcase and event circuit. Film still matters more than a single event ranking.',
    href: 'https://www.perfectgame.org',
  },
  {
    name: 'PrepRedzone / On3 / 247Sports',
    kind: 'Website',
    note: 'Football news and rankings. Treat rankings as noise unless a coach brings them up.',
  },
  {
    name: 'MileSplit',
    kind: 'Website',
    note: 'Track & field marks and meet results. Keep your legal PRs accurate.',
    href: 'https://www.milesplit.com',
  },
  {
    name: 'College Board SAT / ACT.org',
    kind: 'Website',
    note: 'Register for national test dates listed on the Test Scores page.',
    href: 'https://satsuite.collegeboard.org/sat/dates-deadlines',
  },
  {
    name: 'Your high school counselor',
    kind: 'Partner',
    note: 'Transcripts, NCAA core-course confirmation, and college applications go through this person.',
  },
  {
    name: 'High school and club coaches',
    kind: 'Partner',
    note: 'The phone call a college coach trusts. Ask them which schools are realistic before you spend camp money.',
  },
  {
    name: 'Parent or guardian as logistics partner',
    kind: 'Partner',
    note: 'Travel, visits, and document review — not ghostwriting your emails.',
  },
]
