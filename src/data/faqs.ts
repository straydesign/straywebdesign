/**
 * The twenty questions people actually ask when they're thinking about paying
 * someone for a website.
 *
 * Grouped in four passes, which is the order the questions arrive in real life:
 * what it is, then what that answer makes them wonder, then whether it will
 * work, then the thing they only say out loud at the end of a call. The last
 * group is the one most sites leave out, and it's the one doing the work — by
 * the time someone is this far down the page they are hunting for a reason not
 * to, and an unanswered objection is the reason they find.
 *
 * Every number here traces to a real published price or a shipped client site.
 */

export interface FaqGroup {
  readonly label: string;
  readonly items: readonly { readonly q: string; readonly a: string }[];
}

export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    label: 'Getting started',
    items: [
      {
        q: 'How much does a website cost?',
        a: "Between $500 and $3,000 to build, plus $20 to $100 a month to run it. Where you land depends on how much you sell and how much the site has to do. Tell me what you run and you'll have a real number the same day.",
      },
      {
        q: 'How long does it take?',
        a: 'About a week from the day your photos and details reach me. A catalog takes longer, and how much longer comes down to how many items you have and what shape the list is in.',
      },
      {
        q: 'What do you need from me to start?',
        a: "A conversation about your business, whatever photos you already have, and your list of what you sell. If that list only exists on a whiteboard or in your head, that's normal, and we work from that.",
      },
      {
        q: 'What does the monthly cover?',
        a: 'It covers hosting, and it covers the small edits. New hours, a swapped photo, a price that moved: you send it over and I do it. If the site looks the same next quarter, that should only be because nothing about your business changed.',
      },
      {
        q: 'Do I own the site, or am I renting it?',
        a: "You own it. It isn't sitting on a platform you have to keep paying to keep the lights on, and if you ever want to take it somewhere else, it goes with you.",
      },
    ],
  },
  {
    label: 'While it gets built',
    items: [
      {
        q: 'What happens to my current website in the meantime?',
        a: 'Nothing. It stays up and keeps working. I build the new one alongside it, your domain stays yours, and we switch when you say go.',
      },
      {
        q: 'Can I update it myself, or do I come back to you every time?',
        a: "On the sites that need it, you update it yourself. Andy's and Bullfrog change their own menus and daily specials. Sea Cave runs its own stock and pricing across six hundred products. Presque Isle updates its counters. Nobody waits on me for any of that.",
      },
      {
        q: 'What if I need something changed after it goes live?',
        a: "Small things are already in the monthly — send them over. Anything bigger I quote before I start, so nothing turns up on a bill you didn't agree to.",
      },
      {
        q: 'Do I have to write all the words?',
        a: "No. I write them and you correct me. You know your business and I don't, so the first draft is mine to get wrong and yours to fix.",
      },
      {
        q: 'What about photos?',
        a: "I take them. If you already have good ones, we use those. What I won't do is put stock photos of somebody else's shop on your site.",
      },
    ],
  },
  {
    label: 'Whether it works',
    items: [
      {
        q: 'What actually changes for my business?',
        a: 'People who were already looking for what you sell can find you. It shows up as phone calls, and as people walking in who mention they saw it online.',
      },
      {
        q: 'How will I know if it worked?',
        a: "Calls and walk-ins. Traffic numbers and time on page move whether or not a single person buys anything, so I do not count them. If the phone isn't ringing more, it didn't work, and I'd rather hear that from you than not.",
      },
      {
        q: 'How long before I see anything?',
        a: 'A few weeks. Google has to find the pages and index them first, and that takes as long as it takes. Anyone promising you next week is guessing.',
      },
      {
        q: 'Will this put my products on Google?',
        a: "That's what the catalog is for. Every item gets its own page, structured so Google can read what it is and what it costs. Somebody searches for the thing you sell, finds your item, sees how far away you are, and drives over.",
      },
      {
        q: 'Do I need to run ads for this to work?',
        a: 'No. The catalog earns its keep on its own, because it answers searches people are already typing. Ads make it faster if you decide you want that later.',
      },
    ],
  },
  {
    label: 'The things people ask last',
    items: [
      {
        q: "I'm not technical. Is that going to be a problem?",
        a: "No, and that describes most of the people I work with. If something needs doing on the site and you'd rather not touch it, send it to me and it's handled.",
      },
      {
        q: 'I already have a website. Why would I replace it?',
        a: "You might not need to. If it loads fast, says the right things, and people are finding you, keep it. Give me the address on the call and I'll tell you straight if there's nothing here worth doing.",
      },
      {
        q: "What if I don't like it?",
        a: "That's the Stray Success Guarantee. Ninety days after your site goes live, you decide whether it worked. If it didn't, every dollar comes back, same day or the next one. There's no form to fill in and no call where I try to talk you out of it.",
      },
      {
        q: "What if I'm not in Erie?",
        a: "That's fine. Calls and screen shares do the job, and the hosting and the edits are the same wherever you are. The only thing that changes is that I can't come and take the photos myself.",
      },
      {
        q: 'Why not just use Squarespace or Wix?',
        a: "You can, and for some businesses that's the right call. The bill turns up in the hours you spend fighting it, and in the rebuild you pay for once you outgrow it. A catalog is where it gets hardest — those builders don't make it easy to get every item structured the way Google wants to read it.",
      },
    ],
  },
];

export const FAQ_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);
