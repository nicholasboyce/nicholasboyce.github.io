---
title: 'Deploying to Railway'
pubDate: 2024-08-28
description: 'Well It Works On MY Machine'
tags: ["full stack", "deployment", "setbacks", "growth mindset", "learning in public"]
---

I was so excited that I had not only Dockerized my app, but that the Docker image seemed to be working splendidly. Railway made it startingly simple - all I needed to do was keep it in my git repository, point Railway to it on GitHub, and watch the magic happen. 

Git add, git commit, git push.

Building...
Building...
Deployment failed.

What?!?

Ah, okay, I just need to look at the logs. There was an issue during building? That can't be right. The Docker image worked when I built it on my machine. ...Wait, isn't the pitch that I shouldn't be saying that? What's the snag?

I looked into the logs and saw this error message: 'Cache mount ID is not prefixed with cache key'. Luckily, other people seemed to have had the exact same error and posted about it on the [Railway forums](https://help.railway.app/questions/cache-mount-id-is-not-prefixed-with-cach-fcaed775). Nice! But looking at their Docker images seemed like a mystery - my Dockerfile seemed so simple compared to theirs. All I saw was that the "Railway service id" needed to be hardcoded. I saw all sorts of things about turporepo and nixpacks in the Railway docs and I wasn't sure whether or not I needed to use these tools more explicitly.

I decided after much hemming and hawing to just hardcode the id into my file and see what would happen. Oops. It failed again. I thought about it - why not have the courage to post about it on the forums? In the worst case, someone else may come along who's also dealing with the same thing and we can solve the problem together. So I [did](https://help.railway.app/questions/my-docker-file-builds-locally-but-contin-67addf8e). And the magic thing about asking for help is that it usually allows you to see whatever it is you needed help with, like magic! Staring at me in the face was the typo I had made. Interestingly enough, someone else responded to my thread with a similar issue very shortly after - so I feel happy in a way that I may have helped someone out just a bit!

I fixed the id, and the build stage worked! Hooray! After adding my custom domain, my site was live at [LinkCards](https://linkcards.bio).
Yeah, the link was in the last post. But I just wanted to make sure you knew the story worked out alright!

Going forward, I'll likely be transitioning the project from JavaScript to TypeScript, and have read that JSDocs are a good way to facilitate that. So be on the look out! Catch ya later!