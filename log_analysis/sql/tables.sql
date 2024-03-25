create database log_analysis;

create table statistics(
    name varchar(64),
    value int,
    primary key (name)
);

insert into statistics (name, value) values ('total', 0), ('anomaly', 0), ('not anomaly', 0), ('undefined', 0);

create table anomaly_logs(
    id serial,
    data text,
    primary key (id)
);
