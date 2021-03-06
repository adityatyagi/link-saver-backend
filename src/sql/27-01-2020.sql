alter table links
rename to posts;



truncate table links;
truncate table posts cascade;

alter table links
add column link_url text;

insert into posts(title, description, user_id) VALUES('sample title', 'sample desc', 3);

-- inserting multiple rows into table for an array of values
insert into links(post_id, link_url) 
values(5, unnest(array['angular.io/guide/component-interaction', 'angular.io/guide/component-interaction']));


-- setting created_at and updated_at dates
alter table links
alter column "created_at" type timestamp;

alter table links
drop column updated_at;

select * from users;
select * from links;
select * from posts;

alter table links
add column updated_at timestamp not null default now();

-- inner join for posts and links
select p.post_id, p.title, p.description, p.user_id, json_object_agg(l.link_id, l.link_url) as link_urls
from posts p
inner join links l on p.post_id = l.post_id where p.post_id = 35 group by p.post_id;


select u.user_id, u.email, u."name", p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls
from users u inner join posts p on u.user_id = p.user_id
inner join links l on p.post_id = l.post_id where p.post_id = 35 group by p.post_id, u.user_id, u."name", u.email;

select u.user_id, u."name", u.email, p.post_id, p.title, p.description 
from users u
inner join posts p on u.user_id = p.user_id;

select u.user_id, u.email, u."name", p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls
from users u inner join posts p on u.user_id = p.user_id
inner join links l on p.post_id = l.post_id group by p.post_id, u.user_id, u."name", u.email;

-- get post details
select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls
from posts p inner join links l on p.post_id = l.post_id where p.post_id=48 group by p.post_id;

delete from posts
where post_id=43;

select * from links;
select * from posts;

alter table links
drop constraint links_post_id_fkey,
add constraint links_post_id_fkey foreign key (post_id) references posts (post_id) on delete cascade;

alter table links
alter column updated_at set default now();

-- table schema
 select * from INFORMATION_SCHEMA.COLUMNS where table_name ='users';

select p.post_id, p.title, p.description, json_agg(json_build_object('link_id', l.link_id, 'link_url', l.link_url)) as link_urls from posts p inner join links l on p.post_id = l.post_id where p.user_id = 3 group by p.post_id


alter table users
add constraint users_unique unique (email);

select * from users;
select * from posts;
select * from links;


alter table posts
drop constraint posts_user_id_fkey,
add constraint posts_user_id_fkey foreign key (user_id) references users (user_id) on delete cascade;

-- 23 - 1- 2020

CREATE TABLE users(
   user_id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   password TEXT NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL,
   created_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
   updated_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
   last_login TIMESTAMP,
   token text
);

select * from users;


create table posts(
	post_id serial primary key,
	title varchar (1000) not null,
	description text not null,
	user_id integer not null,
	created_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
   	updated_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
	constraint posts_user_id foreign key (user_id)
		references users (user_id) match simple
		on update no action on delete cascade
);

select * from posts;

create table links(
	link_id serial primary key,
	link_url text not null,
	post_id integer not null,
	created_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
   	updated_on TIMESTAMP NOT null DEFAULT CURRENT_TIMESTAMP,
   	constraint links_post_id_fkey foreign key (post_id)
   		references posts (post_id) match simple
   		on update no action on delete cascade
);

select * from links;

-- rename constraint
alter table posts
rename constraint posts_user_id to posts_user_id_fkey;

select * from users;
select * from posts;
select * from links;


