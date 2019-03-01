select newMinors.team, newMinors.logo, count(distinct newPlayerMaster.playerID) as playerCount, newPlayerMaster.franchise, newPlayerMaster.yr
from newPlayerMaster, newMinors
where newPlayerMaster.classes REGEXP ? 
and newMinors.class = ?
and newPlayerMaster.yr = ?
and newMinors.franchise = newPlayerMaster.franchise
group by newMinors.team
order by count(newPlayerMaster.playerName) desc