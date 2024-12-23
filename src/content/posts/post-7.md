---
title: 'Understanding Game Trees: Dissatisfaction with the Current Infosphere'
pubDate: 2024-10-26
description: 'Building a Tic-Tac-Toe Solver'
tags: ["learning in public", "recurse center", "setbacks", "growth mindset", "trees", "tic-tac-toe"]
---

I'm going to write not only about the solutions that I find to problems, but also the frustrations I have. People often. only show their "best" selves, and that is usually inclusive of the finished product of whatever they're making. But it can be a bit demoralizing to find all of these people who hide away their struggles... it's understandable why, but it makes it hard to feel like your confusion "makes sense". So, I'm going to be vulnerable and record my questions in hopes that others (including myself) who read this can see how others go through the problem solving process for REAL.

I'm currently attempting to get a deep understanding of trees in all forms. This started from an interest in getting better understanding of data structures, then I got to learning about trees, realized they were very important and wanted to really get a handle on them. Then I diverged into learning about databases and realized hey, I should probably do more than one thing. 

SO, here I am. Attempting to understand game trees (as well as how to actually use them for playing games). My goal is to write a program that plays Tic-Tac-Toe effectively. The annoying part is though, that I can't seem to figure out WHEN the game tree is meant to be created. The resources I've found so far suggest that some games are two expansive to fully evaluate every possibility. This makes sense to me. And yet, most explanations of game trees start from the leaf nodes up.

How am I meant to square this knowledge? Why immediately tell me about a caveat and then start from a point that not only implies previous work done, but also a state which I may not have ever reached? Not to mention, when the heck is each level evaluated? Is the computer looking at the current state of the board, searching the tree, and then evaluating its possible moves? If the tree has been pre-solved, then I guess this makes sense. But then, what of this question about "partial game trees"?

I can imagine that we create a complete game tree for a game like tic-tac-toe. But it seems to me to be more efficient to create and cache the results of this tree for future reference, rather than rerun useless calculations. If our program can look up the "value" of each decision for a given state quickly, then we can minimize the amount of time our computer spends "deciding" what to do next.

I've also got to think about how to separate the "game" and the "players" and the solving process. I'm looking forward to building this (and hopefully a presentation for RC this week)!