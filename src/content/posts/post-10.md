---
title: "Understanding Game Trees (Part 3)"
pubDate: 2024-11-06
description: 'Building a Tic-Tac-Toe Solver'
tags: ["learning in public", "recurse center", "setbacks", "growth mindset", "trees", "tic-tac-toe", "minimax", "game trees"]
---

View the **[code](https://github.com/nicholasboyce/tictactoe)** for this blog post.

## Introduction
Last week, I wrote about figuring out how to [implement the minimax algorithm](./post-9.md) in Python for my tic-tac-toe solver. I hadn't yet dug too deeply into the different ways that I could optimize yet, so this week I ran a couple of experiments to get an idea of how things could improve.

My goal was really to find out the factor by which this optimization improves the minimax algorithm.

## Alpha-Beta Pruning
Alpha-beta pruning is an optimization technique built upon the minimax algorithm which allows for faster decision making and analysis. Whereas minimax itself answers the question: "Given the state of the game, possible moves, and each player's objective, what is the value of the current board to the current player?"

Alpha-beta pruning asks during the search and evaluation of these possible moves: "Given what we know about our opponent's best options across what we've seen so far, is it even worth checking out the rest of the possibilities from this particular game state?"

For instance, imagine if from a particular game state, you had five possible moves. But you knew that in order to *get* there, your opponent will have had to chosen suboptimally (i.e. choosing a path that doesn't give them the best chance of success/score). You can stop at a certain point and say, alright - looking at what has to happen for me to get these (potentially good) possibilities, my opponent would have to basically let me win. It's not worth investigating all the results of scenarios that they're never going to let happen.

Here's a look at my minimax algorithm without pruning:
```python
def _minimax(self, curr_board : 'Board', available: list[tuple[int]], used: list[int], player: str) -> int:
    """Implemented as a backtracking postorder algorithm traversing the implicit tree of choices given an initial board state.
    """
    if curr_board.is_finished():
        winner = curr_board.game_winner()
        if winner == 'X':
            return 1
        elif winner == 'O':
            return -1
        else:
            return 0
    
    # check whether to maximize value (X) or minimize value (O)
    optimal = maxsize * -1 if player == 'X' else maxsize
    
    for i in range(len(available)):
        if not used[i]:
            spot = available[i]
            used[i] = 1
            #mark the board
            curr_board.mark(spot, player)

            # return and store the value of the marked board, associate it with the position
            next_player = 'O' if player == 'X' else 'X'
            value = self._minimax(curr_board, available, used, next_player)
            if player == 'X':
                optimal = max(optimal, value)
            else:
                optimal = min(optimal, value)

            # unmark the board & restore availability
            curr_board._unmark(spot)
            used[i] = 0

    return optimal
```

And here it is with pruning:
```python
def _minimax_ab(self, curr_board : 'Board', available: list[tuple[int]], used: list[int], alpha: int, beta: int, player: str) -> int:
    """Implemented as a backtracking postorder algorithm traversing the implicit tree of choices given an initial board state.
    """
    if curr_board.is_finished():
        winner = curr_board.game_winner()
        if winner == 'X':
            return 1
        elif winner == 'O':
            return -1
        else:
            return 0
    
    # check whether to maximize value (X) or minimize value (O)
    optimal = maxsize * -1 if player == 'X' else maxsize
    
    for i in range(len(available)):
        if not used[i]:
            spot = available[i]
            used[i] = 1
            #mark the board
            curr_board.mark(spot, player)

            # return and store the value of the marked board, associate it with the position
            next_player = 'O' if player == 'X' else 'X'
            value = self._minimax_ab(curr_board, available, used, alpha, beta, next_player)
            if player == 'X':
                optimal = max(optimal, value)
                alpha = max(alpha, value)
            else:
                optimal = min(optimal, value)
                beta = min(beta, value)

            # unmark the board & restore availability
            curr_board._unmark(spot)
            used[i] = 0
            if beta <= alpha:
                break

    return optimal
```

Was it worth implementing? Well, I benchmarked the data on my 2021 M1 Macbook Pro with 16GB of memory. 

Computer Plays First, No Optimization:
||Time Elapsed (ms)|||||
|-|-|-|-|-|-|
|Round #|Game #1|Game #2|Game #3|Game #4|Average|
|1|643.1366|641.2870|634.3617|667.2151|646.5001|
|2|19.4921|20.5665|19.9321|19.5990|19.8974|
|3|0.5115|0.9745|0.7289|0.5960|0.7027|
|4|0.0760|0.1230|0.1138|0.0773|0.0975|
|5|0.0213|0.0224|0.0173|0.0380|0.02475|

Computer Plays Second, No Optimization:
||Time Elapsed (ms)|||||
|-|-|-|-|-|-|
|Round #|Game #1|Game #2|Game #3|Game #4|Average|
| 1 | 90.4679 | 89.6885 | 90.1249 | 89.7079 | 89.9973  |
| 2 | 3.4958  | 3.5244  | 3.4979  | 3.5125  | 3.50765  |
| 3 | 0.2245  | 0.1989  | 0.1756  | 0.2617  | 0.215175 |
| 4 | 0.0748  | 0.0244  | 0.1054  | 0.1210  | 0.0814   |

Computer Plays First, Alpha-Beta Optimization:
|         | Time Elapsed (ms) |         ||||
| ------- | ----------------- | ------- |-|-|-|
| Round # | Game #1           | Game #2 | Game #3 | Game #4 | Average |
| 1       | 42.0022           | 42.8554 | 41.3975 | 42.2872 | 42.135575 |
| 2       | 2.9619            | 3.1567  | 3.9382 | 1.7098 | 2.94165 |
| 3       | 0.2737            | 0.3729  | 0.2037 | 0.3825 | 0.3082 |
| 4       | 0.0627            | 0.0685  | 0.0644 | 0.0264 | 0.0555 |
| 5       | 0.0254            | 0.0241  | 0.0194 | 0.0227 | 0.0229 |

Computer Plays Second, Alpha-Beta Optimization:
|         | Time Elapsed (ms) |||||
| ------- | ----------------- |-|-|-|-|
| Round # | Game #1           | Game #2 | Game #3 | Game #4 | Average |
| 1       | 8.2627            | 8.0057 | 7.9894 | 8.5866 | 8.2111 |
| 2       | 1.2142            | 1.0354 | 1.6300 | 1.2272 | 1.2767 |
| 3       | 0.1367            | 0.1512 | 0.1906 | 0.1863 | 0.1662 |
| 4       | 0.0423            | 0.0422 | 0.0190 | 0.0456 | 0.037275 |


Wow! To focus on the most dramatic difference, check out that first move where the computer has analyze the best move from the empty game tree.

From an average decision time of 646.5001 ms to 42.1356 ms - that's a speed up of 15.3433 times!
So those data speak for themselves here; alpha-beta pruning is really an incredible optimization technique. Even playing the game myself, the difference was immediately noticeable.


## Setbacks
You may have noticed that my code for the standard minimax algorithm looks a little bit different from my previous blog post. It turns out, I ran into a similar issue after attempting to implement alpha-beta pruning as I did when I was using a set to track available positions! That is, my AI was suddenly making suboptimal and predictable moves, seemingly not properly taking into account what I was doing.

My hypothesis: While a queue that functioned like a round-robin scheduler worked for the suboptimal implementation of the problem, it was likely only so because each evaluated spot was popped and re-appended in order AND able to complete a full cycle. The list of available positions was basically able to go "around" like it was supposed to.

But with alpha-beta pruning, the "cycle" was (by design!) not being completed (or at least, it's not guaranteed to be). By not exploring all of the next possible states from a given position/game state, we were only "turning" the scheduler part-way, replicating a similar error as the set produced in my original for loop implementation.

Thankfully, I realized that the issue was less of an understanding of minimax/alpha-beta pruning itself, and much closer to my understanding of backtracking and how to keep track of valid choices. This [video](https://www.youtube.com/watch?v=Nabbpl7y4Lo&t=346s) (which was once kind of hard for me to grok!) helped me to see that I was, again, over complicating my data structures!
By maintaining a boolean array ```used``` where each index corresponded to whether or not a position had be "picked"/used already, I was able to apply and revert changes to my game state without an insane amount of extra logic or overhead. I also really appreciate that it doesn't ask for too much extra memory (at most for a 3x3 board it will have 9 spaces) and feels a bit more idiomatic.

The extra time spent building the array at the start of choice evaluation also seemed minimal for the ease of use/further optimization that it provided!

## Conclusion
Studying minimax and alpha-beta pruning really helped me to solidify my understanding of backtracking, and learn a little bit more about game trees and how computers make decisions. I'd like to come back to this project in the future and keep experimenting even more - maybe with larger tic-tac-toe games, or different games with variations on evaluation functions.

Slowing down and trying to think of things plainly - while also giving myself room to make imperfect decisions - is really, really helpful in honing my ability to use the right data structures. Not only that but it helps my confidence too - I'm super excited to try out boolean arrays in other backtracking problems now!

My main goal for this sector of the project was to find out the factor by which alpha-beta pruning improved the minimax algorithm. And I was really shocked at how dramatic the difference felt!
Tweaking the original algorithm was a worthwhile exercise in testing how much I understood the rationale behind the code, and making it more robust means that it'll (hopefully) be easier to return to in the future.

Next steps would probably be getting a more solid understanding of fail-hard vs. fail-soft alpha-beta pruning, and other algorithms like Monte-Carlo.

I'm still learning about the topics above, and if there are any errors, tips, or comments you'd like to share with me regarding anything I've discussed, I'd love to hear from you!
Get in touch: <mailto:reachout@nicholasboyce.dev> 