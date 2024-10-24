---
title: 'Questions on Database Terms'
pubDate: 2024-10-06
description: 'Reviving My Why'
tags: ["love of learning", "recurse center", "setbacks", "growth mindset", "data structures", "b-trees", "databases", "pages"]
---

Understanding the benefits of B-Trees.

I have been pushing myself to really understand B-Trees and their benefits (especially as it relates to file storage and databases). I've been going through Database Internals in a reading group at RC, and it's been really good! I've gotten to listen in on conversations between kind and humble engineers with much more experience than myself in a low-stakes environment. Honestly, that's kind of the dream! But I tend to find a way to put pressure on myself regardless. One of the topics that has been taking a while to swallow has been understanding the abstraction of files, pages, and how we organize/access them as on-disk data structures. It's been really incredible stretching my mind to understand these topics at a deeper level, as I've also been separately learning about Computer Architecture (and C and Go) to have confidence in my programs going forward.

After a lot of struggle, I think the diffuse mode of my brain has finally solved the puzzle! And I'd like to explain what I was trying to understand in such a simple way it's kind of hard to believe I didn't understand it.


Q: When you say 'page', what exactly are we talking about? There's pages on solid state drives, pages in the OS, pages for databases, and they all seem similar but different. And then there's the "node" concept? What even??

A: You're right! I personally think we should report this to the ISO but that's another matter. Generally speaking, we're talking about pages as a database specific abstraction, and as a way that "we" (the database architects) define the chunks we're breaking up a file into. These tend to be defined in multiples on OS pages (again, alert the ISO!) because an OS page is the *minimum* input/output we can deal with. 

It's sort of easier for me to imagine database pages as sheets of paper associated with one topic. So you cut the long file up into "pages" to make it easier to organize and sort through later. In this way, each paper is a "node" in a B-Tree. 

Remember, a data structure is literally a way to structure data! It's kind of obvious but it's one of those things I think I heard so long I kind of forgot the literal meaning. Data structures arise from the way that we organize them and from what they enable us to do. That's why you can visualize a stack for instance as a PEZ dispenser or stack of plates. 

Q: Okay, I think I get it. So what's the deal with a file? What is that exactly?

A: Well, that can depend on the implementation. But it's helpful for me to have one concrete example to build off of, and so I offer you this: in PostgreSQL (at least to my understanding) a "file" would be analogous to a table. This is what I meant before about sheets of paper related to a single "topic". I hesitate to call it a folder since that probably has a different meaning in your mind but if that's useful, go ahead. 

This file (or table) is the total list of all the records. By breaking up this list into smaller groups (pages), we can chunk information in a way that allows us to be more selective when looking for what we want. 

Q: Alright, alright. But I read somewhere that "each level of the tree is a disk read in a lookup" which is what makes B-Trees so great. But how can you be reading it all at once? I thought we're pulling things in page by page? What's the difference?

A: Yeah, this was kind of hard for me to grok. But (this is the the reason I wrote this post!) let's see if we can make it easier. 

Firstly, when you read this, one good thing to remember is that they don't literally mean that you are always reading ALL the data from an entire level. Rather, getting a child node as the next step in a path is "reading the next level." You're reading the next level as far as it's relevant to getting to where you need to go. 

The way I imagined the benefit of this is by this analogy. 
Imagine that I ask you to find out from the person in the 75th house (out 1 to 100) if they have some sugar to spare.
In this psuedo-50s suburban scenario, we of course can't just walk there. But, we can send mail! To start you off, I give you a letter with various addresses. This is what we can think of as our root node.

Immediately, you might be wondering - why not just give me the address of the 75th house? And that's exactly the question you should be asking!

 You can write a letter to each address, send it to the post office, and the recipient will write back to you 100% of the time. If you had the 75th house's address, you could just write asking for some sugar, and they'd send it to you. But everyone else will just give the address of neighbors who may have it, eventually leading you hopefully to getting the 75th house's address.  

Without getting too deep into the details of binary search, you've likely figured out the benefit of B-trees (n-ary trees) without realizing it. The more information (addresses) that each node (letter/page) gives you, the sooner you'll find the right address for what you're looking for, without having to send out a bunch of letters. 

If my initial letter (the root) gave you the addresses from 1-100, you could find the 75th and get the sugar pretty much right away. But if for some reason I only gave you two addresses, and everyone else only gave you two addresses, you have to keep mailing, and mailing, and mailing...


Really the sticking point here for me was the way that "each level of the tree is a disk read in a lookup" is worded. Once I got past trying to figure out how we went from looking up a single page to an "entire level", I could finally see the bigger picture.

Now, I'm off to implement properly! I've been considering trying to implement in C as well as Go, but for now, since I'm more comfortable with Go, I'll stick to that and see what happens. I'll keep you updated!