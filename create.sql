show variables like 'character%';
# set character_set_database = utf8mb4;
# set character_set_server = utf8mb4;
show variables like '%time_zone%';

create database if not exists auction;
use auction;

drop table if exists userStar;
drop table if exists auction;
drop table if exists user;

create table user
(
    userId      bigint unsigned  NOT NULL AUTO_INCREMENT,
    username    varchar(200)     NOT NULL unique,
    password    varchar(200)     NOT NULL,
    name        varchar(200)     NOT NULL unique,
    sex         integer unsigned default '2' NOT NULL COMMENT '0为女 1为男 2为保密',
    avatarPath  varchar(200)     default '测试头像地址' NOT NULL,
    roleId      integer unsigned default '0' NOT NULL COMMENT '0为普通用户 1为管理员',
    PRIMARY KEY (userId)
) ENGINE = InnoDB;

create table auction
(
    aucId        bigint unsigned  NOT NULL unique AUTO_INCREMENT,
    name         varchar(200)     NOT NULL,
    price        DECIMAL(10, 2)   NOT NULL,
    provider     varchar(200)     NOT NULL,
    state        integer unsigned NOT NULL COMMENT '0为上架中 1为已下架 2为已售出下架',
    ownerId      bigint unsigned  NOT NULL,
    PRIMARY KEY (aucId),
    constraint fk_auction_ownerId foreign key (ownerId) references user (userId)
) ENGINE = InnoDB;

create table userStar
(
    id         bigint unsigned  NOT NULL AUTO_INCREMENT,
    aucId      bigint unsigned  NOT NULL ,
    userId     bigint unsigned  NOT NULL ,
    PRIMARY KEY (id),
    constraint fk_userStar_userId foreign key (userId) references user (userId),
    constraint fk_userStar_aucId  foreign key (aucId)  references auction (aucId),
    constraint uk_star_aucId_userId unique key (aucId, userId)
) ENGINE = InnoDB;




# dev data
insert into user (username, name, password, roleId)
values ('admin','管理员', 'admin', 1);

insert into auction (name, price, provider, state, ownerId)
values ('测试拍品:上架中', 100, '管理员', 0, 1),
       ('测试拍品:已下架', 100.99, '管理员', 1, 1),
       ('测试拍品:已售出下架', 100.99, '管理员', 2, 1);









