---
title: 'Impossible Day at RC'
pubDate: 2024-08-27
description: 'What It Means To Do the Impossible'
tags: ["learning in public", "recurse center", "setbacks", "growth mindset"]
---

Impossible Day is a day where more than ever, Recursers (batch members and never-alum alike) strive to work at the edge of their abilities. We share what we're thinking of working on and convene later to find out just how impossible our goals really were! If you've ever seen Meet the Robinsons, this is the kind of family event I think they would have as a holiday for sure. I recently finished my batch at RC, and it's been strange in a way to realize how that sort of changed the pressure on myself. It's kind of like when you finish a class at school and you think to yourself, "Wow, now that I know what was coming, I feel like I could do it way better the next time around. I want to keep learning." I think a lot about the way that so many things that are good for us end up having these constraints placed upon them by practicality, and I've always been a bit frustrated by that tension. RC is different in the sense that you can still be super involved even when your batch ends (time-permitting). So I made the choice to join in on Impossible Day and do the impossible. I just had to figure out what that was.

It was kind of funny in a way not knowing what to do. In my most fight or flight or freeze moments, lots of things seem impossible. But I really wanted to do Impossible Day "right" - what if what I chose wasn't impossible *enough*? What if it was way too possible? What if it was actually, for real, seriously impossible? And then I thought about what I wanted to do. And I thought about the friends I had made at RC. And I thought about Meet the Robinsons. And I remembered that the whole point was to be brave and try something new. Right there and then, I realized my first Impossible Task was give myself permission to do whatever it was I wanted to do. I met with the JavaScript/TypeScript Web Dev group that meets weekly, and informed them of my plan. They were wonderfully supportive. ^_^

Thinking about what I wanted to do, I thought back to a conversation I had with a fellow Recurser. Just a couple weeks prior, before the end of my batch, I had given a presentation on some documentation I thought could use improving in the Passport JS library. Maybe I'll write about that in another blog post.

In any case, he had suggested to me that I submit a pull request to the documentation. It made so much sense when he said it! And I said I'd really do it. And I had let time pass but the thought (as they tend to do when neglected) settled in the back of my mind and knocked at it every once in a while. Today was going to be the day. I sat down, looked through their pull requests, looked at their contributing rules, and- oh! It looks like they probably don't want a pull request of this type... what if I'm totally mistaken anyway... what if I make a pull request and they get so mad that they report me to GitHub and then I'm banned from ever hosting my code on there again???

After a microsecond of escalation, I thought about what would really happen. They'd probably, at worst, make a snarky comment and delete it. Sensitive as I may be, that is something that I think I can handle. So I decided to split the difference and err on the side of caution. I opened a thread on their discussion page inviting others to share their opinion on the documentation change (and also to correct any flaws in my logic). It felt... really good. I felt like a real programmer! And most of all, it felt amazing to realize that the people I was sort of idolizing in my head as these untouchable programmers were just real people like any else. If you'd like to join the discussion, please (please please) [check it out and leave a comment on your thoughts](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70399). 

My coding Impossible Task was a bit more concrete. I really wanted to finish implementing a proper sign up flow for one of my projects, [LinkCards](https://linkcards.bio). I wasn't satisfied with the way it was before, and I wanted to be brave and get the vision in my head on paper. Err, code editor? I was a bit afraid of looking at the code though - I wasn't sure what it would be like trying to extend it. What I broke something important? Luckily, in building this very blog, I built up the momentum of small, meaningful, liberal git commits. I could make a change and reverse. Rebase it, branch it. With git I could rewind time. So there was nothing to worry about. It was past the Impossible Day presentations, but the sun was still up and I knew I would be so much happier if I just went for it. So, I jumped on a new branch and got to work. After much googling and confusion and hooraying, I was able to get a functional version done! Was it perfect? Certainly not. But class isn't over and I can keep improving it. I then decided I wanted to Dockerize it like I had other projects, but it had been a bit. Luckily, vite kept me on my toes. What fun is it if it's easy? The build failed because of a dependency I hadn't even known existed, and then there was an issue with the lockfile, and then it turned out my .dockerignore was in fact NOT ignoring my node_modules and dist files but instead me, which made conflict after conflict. The clock struck twelve. Impossible Day was over. But I still had my glass slippers. After a prayer and thorough Stack Overflow searching, my app was Dockerized. I was ready to deploy my app to Railway using my Docker image the next day. Or so I thought...