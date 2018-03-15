insert into injuries (id, name, description, tth, affected_area_id) 
values (ceil(random() * 1000), $1, $2, $3, 2); -- variable place keepers $ 
