# 关系型数据库

## 与非关系型数据库的关系：

### 关系型数据库是存的是基础类型的数据，一张一张表，非关系型存的是键值对的 json 数据

### 非关系型数据库没法联表查询，关系型数据库可以

### 关系型数据库读写性能差，非关系型数据库无事务处理，查询快

# Mysql

增

## insert into 表 values()

删

## delete from 表 where

改

## update 表 set name = 'xx' where id = 1

查

## select \* from 表 where xxx order by score DESC/AEC

## select name,age from 表

## select \* from 表 limit x offset y (跳过 y 条数据，读取 x 条数据)

## select \* from 表 where name like '%k%'

##

联合查询

## inner join

## select student.`name`,student.class_id,classes.`name` from student INNER JOIN classes on student.class_id = classes.id

## select s.`name`,s.class_id,c.`name` from student as s INNER JOIN classes as c on s.class_id = c.id

## left join

## right join

外键约束

## 约束某个字段的输入 存储方式改为 InnoDB

## cascade 级联操作可以删除和更新一个记录，与此关联的表格的数据会同步删除和更新

![navicat设置外键截图](./assets/%E8%AE%BE%E7%BD%AE%E5%A4%96%E9%94%AE.png)

## restrict 约束操作 表格中的外键的数据有关联其他表格的数据，不能直接删除和更新，会报错

![外键错误](./assets/%E5%A4%96%E9%94%AE%E9%94%99%E8%AF%AF.png)
