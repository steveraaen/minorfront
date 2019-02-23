select newMinors.team, count(distinct newPlayerMaster.playerID), newPlayerMaster.franchise, newPlayerMaster.yr
from newPlayerMaster, newMinors
where newPlayerMaster.classes REGEXP '^AAA,|,AAA,|,AAA$' 
and newMinors.class = 'AAA'
and newMinors.franchise = newPlayerMaster.franchise
group by newMinors.team, newPlayerMaster.yr
order by count(newPlayerMaster.playerName) desc