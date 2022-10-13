define({ "api": [
  {
    "type": "post",
    "url": "/api/users",
    "title": "添加用户",
    "name": "addUser",
    "group": "userGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>年龄</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像，多个上传多个</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username: '张三',\n    password: '123',\n    age: 12,\n    avatar: File对象1,\n    avatar: File对象2,\n}",
          "type": "multipart/form-data"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "删除用户",
    "name": "deleteUser",
    "group": "userGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id，必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  },
  {
    "type": "get",
    "url": "/api/users?pageNum=1&pageSize=10",
    "title": "查询用户信息",
    "name": "getUser",
    "group": "userGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNum",
            "description": "<p>页码，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>页数，必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "登录",
    "name": "login",
    "group": "userGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username: '张三',\n    password: '123'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  },
  {
    "type": "get",
    "url": "/api/logout",
    "title": "退出登录",
    "name": "logout",
    "group": "userGroup",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  },
  {
    "type": "put",
    "url": "/api/users/:id",
    "title": "更新用户",
    "name": "updateUser",
    "group": "userGroup",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，必填</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>年龄</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    username: '张三',\n    password: '123',\n    age: 12\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ok",
            "description": "<p>1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回成功样例:",
          "content": "{\n    ok : 1\n}",
          "type": "Number"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "userGroup"
  }
] });
