select newMinors.team, count(distinct newPlayerMaster.playerID), newPlayerMaster.franchise
from newPlayerMaster, newMinors
where newPlayerMaster.classes REGEXP '^AAA,|,AAA,|,AAA$' 
and newMinors.class = 'AAA'
and newMinors.franchise = newPlayerMaster.franchise
and newPlayerMaster.yr = 2016
group by newMinors.team
order by count(newPlayerMaster.playerName) desc