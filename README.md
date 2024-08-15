# Team Randomiser

This typescript project is intended to be used to randomise players for a soccer match but also roughly match up the teams abilities to try and ensure it is a fair and even game. 

It consists of 2 main parts, 
  1. Squad List - a CSV file record of all the available players
  2. Teamsheet - a text file of the players playing the individual match that you want randomised. 

It works by matching those provided in the teamsheet with those within squad list. The players listed in the teamsheet need to have a matching listing in the squad list. 

Each player has a score which is made up of 

  1. Play Style - playstyle ranges from "Attacker" which has a value of 1; to "specialistDefender", which has a value of 6.
  2. Fitness - fitness determines how much running a player typically does during a match.

These numbers are combined to give each player an individual score, each person is randomly assigned to one of the two teams. The player totals are then added together, if the totals are not close enough it will randomise again. It will also try to divide up specialist players evenly which is configurable.

