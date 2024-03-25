update statistics set value = 5 where name = 'anomaly';
update statistics set value = 21 where name = 'not anomaly';
update statistics set value = 26 where name = 'total';

insert into anomaly_logs (cluster_id, data) values (0, 'filesystem error'), (0, 'network error');
