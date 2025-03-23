---
title: "super-push安装教程"
categories: 分类
tags:
  - 标签
id: "ac2c9c1cf59f8be9"
date: 2025-03-23 12:14:11
cover: ""
---

#### 基于vue3+赛博菩萨+web-push的一个开源私有的推送应用

#### 安装教程
``` bash
# 克隆项目
git clone https://github.com/Nicholas003/super-push.git
# 进入项目目录
cd super-push
# 安装依赖
yarn install
# 执行sql 这是本地
npx wrangler d1 execute super-push --local --file=./schema.sql
# 这是推到cloudflare
npx wrangler d1 execute super-push --remote --file=./schema.sql
# 把返回值放到wrangler.jsonc中
# "d1_databases": [
# 		{
# 			"binding": "DB",
# 			"database_name": "super-push",
# 			"database_id": "<yourid>"
# 		}
# 	],

```
#### 配置秘钥

.dev.vars.example 重命名为 .dev.vars
[生成公钥私钥](https://web-push-codelab.glitch.me/)
放里面

### 执行一下 
``` bash
yarn deploy
```
应该就可以了

---

API参数

