后端使用express+socket.io构建

config 项目的一些配置

routes 路由放这里

server/api 接口文件夹

Utils 用于存放一些工具类

登录认证部分采用Token进行认证，并维护一个Token黑名单用于注销用户

## 数据库建模

user表

auction表

userStar表

auctionOrder表

密码在进入数据库前，使用bcrypt 进行密码加密

## 接口文档

### 接口规范

1. JSON格式：

   ```
   {
     "success": true,
     "value": {结果值},
     "msg": "",
     "code": -1
   }
   ```
   
2. Result类的code，msg规范

   ```
   SUCCESS(-1, "请求成功！"),
   RESULT_EMPTY(0, "请求结果为空！"),
   PARAM_ERROR(1, "参数有误！"),
   RUNTIME_ERROR(2, "服务器异常！"),
   DATA_CONFLICT(3, "数据冲突！")
   ;
   ```


### 接口描述

分为四块

#### 1.用户

##### 1.1注册

请求地址：/api/users/register

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段     | 说明 | 类型   | 是否必填 |
| -------- | ---- | ------ | -------- |
| username |      | String | 是       |
| password |      | String | 是       |

返回参数：

| 字段     | 说明                           | 类型   | 是否必填 |
| -------- | ------------------------------ | ------ | -------- |
| register | 表明用户是否已注册             | String | 是       |
| password | -1表示注册成功，其余为注册失败 | String | 是       |

##### 1.2登录

请求地址：/api/users/login

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段     | 说明 | 类型   | 是否必填 |
| -------- | ---- | ------ | -------- |
| username |      | String | 是       |
| password |      | String | 是       |

返回参数：

| 字段     | 说明                       | 类型    | 是否必填 |
| -------- | -------------------------- | ------- | -------- |
| register | 表明用户是否已注册         | Boolean | 否       |
| token    | 用于保存客户端进行登录认证 | String  | 否       |

##### 1.3登出

请求地址：/api/users/logout

方法：ALL

是否需要请求头携带[authorization]：是

请求参数：无

返回参数：

| 字段         | 说明                       | 类型   | 是否必填 |
| ------------ | -------------------------- | ------ | -------- |
| revokedToken | 销毁的token，成功时返回    | String | 否       |
| err          | 用于保存客户端进行登录认证 | String | 否       |

##### 1.4根据用户名获取用户信息

请求地址：/api/users/getUserMes

方法：GET

是否需要请求头携带[authorization]：是

请求参数：无

返回参数：

| 字段     | 说明                  | 类型    | 是否必填 |
| -------- | --------------------- | ------- | -------- |
| value | userId,username,name,sex,avatarPath    | [] | 否       |
| Code     | 0数据为空，-1请求成功 | Number  | 是       |

##### 1.5根据用户名更新用户信息

请求地址：/api/users/updateUserMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段       | 说明                                | 类型   | 是否必填 |
| ---------- | ----------------------------------- | ------ | -------- |
| name       | userId,username,name,sex,avatarPath | String | 否       |
| sex        | 0为女 1为男 2为保密                 | Number | 否       |
| avatarPath | 用户头像                            | String | 否       |

返回参数：

| 字段 | 说明                              | 类型   | 是否必填 |
| ---- | --------------------------------- | ------ | -------- |
| Code | 0数据更新成功但未变化，-1更新成功 | Number | 是       |

##### 1.6*修改用户密码*

请求地址：/api/users/updateUserPassword

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段       | 说明                                | 类型   | 是否必填 |
| ---------- | ----------------------------------- | ------ | -------- |
| username       |  | String | 否       |
| oldPassword        |                  | String | 否       |
| newPassword |                             | String | 否       |

返回参数：

| 字段   | 说明                                  | 类型    | 是否必填 |
| ------ | ------------------------------------- | ------- | -------- |
| change | 0数据更新成功但未变化，-1更新成功成功 | Boolean | 否       |
| code   | 0为old与new的相同，-1为修改成功       | Number  | 是       |

##### 1.7获取用户订单信息

请求地址：/api/users/getUserOrder

方法：GET

是否需要请求头携带[authorization]：是

请求参数：无

返回参数：

| 字段   | 说明                                                         | 类型 | 是否必填 |
| ------ | ------------------------------------------------------------ | ---- | -------- |
| change | id<br/>aucId<br/>userId<br/>state<br/>createTime<br/>updateTime | []   | 是       |
| code   |                                                              |      | 是       |

##### 1.8根据拍品id收藏

请求地址：/api/users/star

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段     | 说明   | 类型   | 是否必填 |
| -------- | ------ | ------ | -------- |
| username | 拍品id | String | 否       |



返回参数：

| 字段 | 说明                                | 类型 | 是否必填 |
| ---- | ----------------------------------- | ---- | -------- |
| star | true表示收藏成功，false表示取消收藏 | 是   | 是       |

##### 1.9获取用户所有收藏

请求地址：/api/users/getUserStars

方法：GET

是否需要请求头携带[authorization]：是

请求参数：无

返回参数：

| 字段  | 说明                                              | 类型   | 是否必填 |
| ----- | ------------------------------------------------- | ------ | -------- |
| value | aucId,name,price,provider,state,startTime,endTime | []     | 是       |
| code  | 0为查询为空 ，-1为查询成功                        | Number | 是       |

#### 2.拍品

##### 2.1根据拍品id获取拍品详情

请求地址/api/auction

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段  | 说明   | 类型   | 是否必填 |
| ----- | ------ | ------ | -------- |
| aucId | 拍品id | Number | 是       |

返回参数：

| 字段 | 说明                                              | 类型 | 是否必填 |
| ---- | ------------------------------------------------- | ---- | -------- |
| star | aucId,name,price,provider,state,startTime,endTime | []   | 是       |

##### 2.2分页查询拍品表

请求地址/api/auction/pageSelectAuctionList

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段 | 说明         | 类型   | 是否必填       |
| ---- | ------------ | ------ | -------------- |
| page | 当前页数     | Number | 否（默认为1）  |
| size | 每页显示最大 | Number | 否（默认为10） |

返回参数：

| 字段                                              | 说明                                              | 类型 | 是否必填 |
| ------------------------------------------------- | ------------------------------------------------- | ---- | -------- |
| aucId,name,price,provider,state,startTime,endTime | aucId,name,price,provider,state,startTime,endTime | []   | 是       |

#### 3.主页

##### 3.1分页  带搜索功能 查询拍品表

请求地址/api/index/pageSearchAuction

方法：POST

是否需要请求头携带[authorization]：否

请求参数：

| 字段    | 说明         | 类型   | 是否必填                         |
| ------- | ------------ | ------ | -------------------------------- |
| page    | 当前页数     | Number | 否，（默认为1）                  |
| size    | 每页显示最大 | Number | 否（默认为10）                   |
| keyword | 搜索关键字   | String | 否，（默认值为''，即不筛选结果） |

返回参数：

| 字段                                              | 说明                                              | 类型 | 是否必填 |
| ------------------------------------------------- | ------------------------------------------------- | ---- | -------- |
| aucId,name,price,provider,state,startTime,endTime | aucId,name,price,provider,state,startTime,endTime | 是   | 是       |

#### 4.后台管理

##### 4.1拍品表管理

###### 4.1.1分页查询拍品表

请求地址/api/admin/auction/pageSelectAuctionList

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明         | 类型          | 是否必填       |
| ---- | ------------ | ------------- | -------------- |
| page | 当前页数     | 否（默认为1） | 否（默认为1）  |
| size | 每页显示最大 | Number        | 否（默认为10） |

返回参数：

| 字段                                              | 说明 | 类型 | 是否必填 |
| ------------------------------------------------- | ---- | ---- | -------- |
| aucId,name,price,provider,state,startTime,endTime | []   | []   | 是       |

###### 4.1.2更新拍品表信息（新增和修改）

请求地址/api/admin/auction/updateAuctionMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段      | 说明 | 类型          | 是否必填       |
| --------- | ---- | ------------- | -------------- |
| name      |      | 否（默认为1） | 否             |
| price     |      | Number        | 否（默认为10） |
| provider  |      | String        | 否             |
| state     |      | Number        | 否             |
| ownerId   |      | Number        | 否             |
| startTime |      | date          | 否             |
| endTime   |      | date          | 否             |
| aucId     |      | Number        | 是             |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

###### 4.1.3 根据拍品id删除拍品信息

请求地址/api/admin/auction/deleteAuctionMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明 | 类型 | 是否必填 |
| ---- | ---- | ---- | -------- |
| name |      | 否   | 是       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

##### 4.2拍品订单表管理

###### 4.2.1分页查询拍品订单表

请求地址/api/admin/auctionOrder/pageSelectAuctionOrderList

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明         | 类型   | 是否必填       |
| ---- | ------------ | ------ | -------------- |
| page | 当前页数     | Number | 否（默认为1）  |
| size | 每页显示最大 | Number | 否（默认为10） |

返回参数：

| 字段 | 说明     | 类型 | 是否必填 |
| ---- | -------- | ---- | -------- |
| code | 所有字段 | []   | 是       |

###### 4.2.2更新拍品订单信息 (新增和更新操作)

请求地址/api/admin/auctionOrder/updateAuctionOrderMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段   | 说明                                  | 类型   | 是否必填       |
| ------ | ------------------------------------- | ------ | -------------- |
| aucId  |                                       | Number | 否             |
| userId |                                       | Number | 否（默认为10） |
| state  | 0为竞拍成功 1为竞拍失败 2为交易进行中 | Number | 否             |
| id     | 拍品订单号                            | Number | 是             |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

###### 4.2.3 根据id删除拍品订单信息

请求地址/api/admin/auctionOrder/deleteAuctionOrderMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明 | 类型   | 是否必填 |
| ---- | ---- | ------ | -------- |
| id   | 是   | Number | 是       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

##### 4.3用户表管理

###### 4.3.1分页查询用户表

请求地址/api/admin/user/pageSelectUserList

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明         | 类型   | 是否必填       |
| ---- | ------------ | ------ | -------------- |
| page | 当前页数     | Number | 否（默认为1）  |
| size | 每页显示最大 | Number | 否（默认为10） |

返回参数：

| 字段  | 说明     | 类型 | 是否必填 |
| ----- | -------- | ---- | -------- |
| value | 所有字段 | []   | 是       |

###### 4.3.2*新增或修改用户信息*

请求地址/api/admin/user/updateUserMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段       | 说明 | 类型   | 是否必填 |
| ---------- | ---- | ------ | -------- |
| username   |      | String | 是       |
| password   |      | String | 否       |
| name       |      | String | 否       |
| sex        |      | Number | 否       |
| avatarPath |      | String | 否       |
| roleId     |      | Number | 否       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

###### 4.3.3 根据username删除用户

请求地址/api/admin/user/deleteUser

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段     | 说明 | 类型   | 是否必填 |
| -------- | ---- | ------ | -------- |
| username |      | String | 是       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

##### 4.4用户收藏表管理

###### 4.4.1*分页查询用户收藏信息*

请求地址/api/admin/userStar/pageSelectUserStarList

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明         | 类型   | 是否必填       |
| ---- | ------------ | ------ | -------------- |
| page | 当前页数     | Number | 否（默认为1）  |
| size | 每页显示最大 | Number | 否（默认为10） |

返回参数：

| 字段  | 说明     | 类型 | 是否必填 |
| ----- | -------- | ---- | -------- |
| value | 所有字段 | []   | 是       |

###### 4.3.2*新增或修改用户信息*

请求地址/api/admin/userStar/updateUserStarMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段   | 说明 | 类型   | 是否必填 |
| ------ | ---- | ------ | -------- |
| id     |      | Number | 是       |
| aucId  |      | Number | 否       |
| userId |      | Number | 否       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

###### 4.3.3 根据username删除用户

请求地址/api/admin/userStar/deleteUserStarMes

方法：POST

是否需要请求头携带[authorization]：是

请求参数：

| 字段 | 说明 | 类型   | 是否必填 |
| ---- | ---- | ------ | -------- |
| id   |      | Number | 是       |

返回参数：

| 字段 | 说明                  | 类型   | 是否必填 |
| ---- | --------------------- | ------ | -------- |
| code | 0修改失败，-1修改成功 | Number | 是       |

##### 