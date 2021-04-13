# big-screen-server
大数据可视化，后台服务，基于koa，mysql，mongose，socket.io搭建，动态配置指标.实时展现你的指标数据

> 作者 就别 qq 2363577442 ,让数据成就更好的未来

> 简介 基于 koa ,mysql,mogongdb，socket.io 进行开发，整合系统配置(用户，角色，菜单权限，大屏权限)，结合数据源配置（数据库连接，api 连接，excel 导入），指标通过连接数据库，输入现成sql 语句,或者api，或者excel产生指标数据.后台起另外进程 node-schedule 达到 每 60 s (避免语句过长，卡住)根据指标库，更新指标库 content 实现 实时数据 。后台 通过配置组件，传输前端，拖拽生产大屏， 同时 通过 socket.io 根据不同 角色推送大屏 组件，以及数据结构。实现大屏整体更新。 结合 vue-cli 前端 传递信息进行实时遥控切换




![](http://shutiaogege.top/image/big/big_s1.png)

![](http://shutiaogege.top/image/big/big_s2.png)


![](http://shutiaogege.top/image/big/big_s3.png)

![](http://shutiaogege.top/image/big/big_s4.png)

