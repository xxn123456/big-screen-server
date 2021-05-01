define({ "api": [
  {
    "type": "post",
    "url": "json/friendCircleList",
    "title": "朋友圈动态列表",
    "description": "<p>描述这个API的信息</p>",
    "sampleRequest": [
      {
        "url": "/save"
      }
    ],
    "group": "资讯接口/朋友圈动态接口11",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>Users unique access-key</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int32",
            "optional": false,
            "field": "page",
            "description": "<p>页数</p>"
          },
          {
            "group": "Parameter",
            "type": "int32",
            "optional": false,
            "field": "pageSize",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "int32",
            "optional": false,
            "field": "type",
            "description": "<p>动态发送者类型（1商家 2用户 可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "int32",
            "optional": false,
            "field": "type_id",
            "description": "<p>动态发送者ID（商家或者用户ID，与type对应，可选）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "orderField",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "order_sort",
            "description": "<p>排序升降（-1代表降序  1代表升序）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Sting[]",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.code",
            "description": "<p>返回数据结果码</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.message",
            "description": "<p>返回数据信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"code\": 0,\n\"message\": \"succ\",\n\"data\":[{\n         \"_id\": {\n             \"$oid\": \"5dc618f1ed37514960002395\"\n         },\n         \"address\": \"江苏省苏州市\",\n         \"content\": \"朋友圈动态内容\",\n         \"id\": \"5dc618f1ed37514960002395\",\n         \"zan_num\": 0,\n         \"evaluate_num\": 0,\n         \"create_time\": \"2019-10-28 12:42:44\",\n         \"pics\": [\n               \"http://bbt3.ff.5kb.pw/uploads/20191122/2de13ebac0e6e66bdcd11eb3c28d0d25.jpg\"\n               \"http://bbt3.ff.5kb.pw/uploads/20191122/5b6158382ba17ed8a5a72fab3ca4f984.jpg\"\n          ],\n         \"type\": 2,\n         \"type_id\": 1,\n         \"is_del\": 0,\n         \"author_info\": {\n             head_photo: \"\"\n             nick_name: \"散场的拥抱^_^\"\n             user_id: 1\n         }\n     }....\n   ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "D:/koa/zhihu/controllers/user.js",
    "groupTitle": "资讯接口/朋友圈动态接口11",
    "name": "PostJsonFriendcirclelist"
  }
] });
