create database log_analysis;

create table statistics(
    name varchar(64),
    value int,
    primary key (name)
);

insert into statistics (name, value) values ('total', 0), ('anomaly', 0), ('not anomaly', 0), ('undefined', 0);

create table logs_clusters(
    id int,
    name text,
    description text,
    recommendation text,
    primary key (id)
);

insert into logs_clusters (id, name, description, recommendation) values (0, 'unknown', '', '');

create table anomaly_logs(
    id serial,
    cluster_id int references logs_clusters(id),
    data text,
    primary key (id)
);
