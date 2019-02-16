select newPlayerMaster.franchise, newPlayerMaster.classes , newPlayerMaster.yr,
 count(newMinors.team) from newPlayerMaster, newMinors where newPlayerMaster.yr = 2018 and newMinors.franchise = newPlayerMaster.franchise 
 and newPlayerMaster.classes REGEXP '^AAA,|,AAA,|,AAA$' and newMinors.class = 'AAA'
 group by newMinors.team
 order by  count(newMinors.team) desc