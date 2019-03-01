select distinct newPlayerMaster.playerName
from newPlayerMaster, players18 
where newPlayerMaster.classes REGEXP '^AA,|,AA,|,AA$'
and players18.playercode = newPlayerMaster.playerID
and newPlayerMaster.franchise = 'NYY'
and newPlayerMaster.yr = 2017