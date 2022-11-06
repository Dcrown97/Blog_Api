# ROUTES

This document outlines the request/response structure for the endpoints

## User Routes

### Create a user

To create a user, send a `POST` request to the `/signup` route. The body will contain a json with properties indicated as following:

```json
{
  "first_name": "Darasimi",
  "last_name": "Emmanuel",
  "email": "dara@gmail.com",
  "password": "1234"
}
```
If successful, you'll get a response like this:

```json
{
  "message": "Signup successful",
  "user": {
    "_id": "63677c4c0a5ba888e0c67ac3",
    "first_name": "Darasimi",
    "last_name": "Emmanuel",
    "email": "dara@gmail.com",
    "password": "<password>",
    "__v": 0
  }
}
```

### Login user

To login user, send a `POST` request to the `/login` route. Supply your registered email and password in a json format to the body like this:

```json
{
  "email": "dara@gmail.com",
  "password": "1234"
}
```
If successful, you'll get a response like this with a jwt authenticate/authorization token:

```json
{
  "user": {
    "_id": "63677c4c0a5ba888e0c67ac3",
    "first_name": "Darasimi",
    "last_name": "Emmanuel",
    "email": "dara@gmail.com",
    "password": "<password>",
    "__v": 0
  },
  "token": "<token>"
}
```

## Blog Routes

<details>
<summary>Something to note</summary>
Supply login credentials using bearer auth when sending requests to some of the routes listed below. 
</details>

### Create a new Blog

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users
</details>

To create a new blog, send a `POST` request to the `/api/blog/create_blog` route. The payload will contain a json object, tags is an array[], An example request is:

```json
{
  "title" : "Lorem Ipsum",
  "description" : "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
  "tags" : ["ade", "sola", "sayo"],
  "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has"
}
```

If successful, you'll get a response like this:

```json
{
   "message": "Blog created successfully",
  "data": {
    "title": "Lorem Ipsum",
    "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
    "author": "63677c4c0a5ba888e0c67ac3",
    "state": "draft",
    "read_count": 0,
    "reading_time": 1,
    "tags": [
      "ade", "sola", "sayo"
    ],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    "_id": "636786324fb19a85588fbacb",
    "createdAt": "2022-11-06T10:02:26.615Z",
    "updatedAt": "2022-11-06T10:02:26.615Z",
    "__v": 0
  }
}
```

### Update a User Blog state by ID

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users that has created a blog
</details>

To update the state of an blog by it's ID, send a `PUT` request to the `/api/blog/edit_blog/:id` route where `:id` is the ID of the blog. The body of the request should contain an object with a key of `state` and a string value. To update the state of order with ID of '636786324fb19a85588fbacb' from `draft` to `published`, send a request to:

```text
/api/blog/edit_blog/6366d20e1e4f7582d8c3e3ed
```

and send your login token through the bearer auth to get authorized, this is to make sure you're logged in and to verify you're the owner of the blog you're about to edit the state. The payload will look like this:

```json
{
  "state": "published"
}
```

If request is successful, you'll get a response like this:

```json
{
   "message": "Blog Updated Successfully",
  "data": {
    "_id": "636789944fb19a85588fbb47",
    "title": "Lorem Ipsum 29",
    "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
    "author": "63677c4c0a5ba888e0c67ac3",
    "state": "published",
    "read_count": 0,
    "reading_time": 1,
    "tags": [
      "#project, #done"
    ],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    "createdAt": "2022-11-06T10:16:52.623Z",
    "updatedAt": "2022-11-06T11:55:29.550Z",
    "__v": 0
  }
}
```

### Get list of Published Blogs

<details>
<summary> :sunglasses: </summary>
This route is accessible to both logged in users and not logged in users
</details>

Send a `GET` request to the `/api/blog/all_blogs` route. 

By default, the api returns the first page with a limit of 20 Blogs per page. In order to change the page or increase/decrease the limit, you may pass addition query parameters `page`.

An example response is:

```json
{
  "status": true,
  "publishedBlogs": [
    {
      "_id": "636786324fb19a85588fbacb",
      "title": "Lorem Ipsum first",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade, sola, sayo"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:02:26.615Z",
      "updatedAt": "2022-11-06T11:44:34.035Z",
      "__v": 0
    },
    {
      "_id": "636787574fb19a85588fbacf",
      "title": "Lorem Ipsum first",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade, sola, sayo"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:07:19.272Z",
      "updatedAt": "2022-11-06T11:48:19.389Z",
      "__v": 0
    },
    {
      "_id": "636787714fb19a85588fbad3",
      "title": "Lorem Ipsum second",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade, sola"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:07:45.713Z",
      "updatedAt": "2022-11-06T11:46:37.082Z",
      "__v": 0
    },
    {
      "_id": "6367877b4fb19a85588fbad7",
      "title": "Lorem Ipsum third",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade, sola"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:07:55.999Z",
      "updatedAt": "2022-11-06T12:07:00.025Z",
      "__v": 0
    },
    {
      "_id": "636787954fb19a85588fbadb",
      "title": "Lorem Ipsum fourth",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:08:21.672Z",
      "updatedAt": "2022-11-06T12:07:19.064Z",
      "__v": 0
    },
    {
      "_id": "6367879f4fb19a85588fbadf",
      "title": "Lorem Ipsum fifth",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "ade"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:08:31.247Z",
      "updatedAt": "2022-11-06T12:07:42.084Z",
      "__v": 0
    },
    {
      "_id": "636787a94fb19a85588fbae3",
      "title": "Lorem Ipsum sixth",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "sola"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:08:41.361Z",
      "updatedAt": "2022-11-06T12:08:30.250Z",
      "__v": 0
    },
    {
      "_id": "636787c34fb19a85588fbae9",
      "title": "Lorem Ipsum seven",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "sayo"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:09:07.664Z",
      "updatedAt": "2022-11-06T12:09:06.203Z",
      "__v": 0
    },
    {
      "_id": "636787d24fb19a85588fbaef",
      "title": "Lorem Ipsum eight",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "bimpe"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:09:22.612Z",
      "updatedAt": "2022-11-06T12:09:20.445Z",
      "__v": 0
    },
    {
      "_id": "636787d74fb19a85588fbaf3",
      "title": "Lorem Ipsum nine",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "bimpe"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:09:27.706Z",
      "updatedAt": "2022-11-06T12:09:34.930Z",
      "__v": 0
    },
    {
      "_id": "636787f34fb19a85588fbaf7",
      "title": "Lorem Ipsum ten",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        ""
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:09:55.680Z",
      "updatedAt": "2022-11-06T12:09:53.989Z",
      "__v": 0
    },
    {
      "_id": "636788014fb19a85588fbafb",
      "title": "Lorem Ipsum 11",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:10:09.937Z",
      "updatedAt": "2022-11-06T12:10:13.548Z",
      "__v": 0
    },
    {
      "_id": "6367880b4fb19a85588fbaff",
      "title": "Lorem Ipsum 12",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:10:19.803Z",
      "updatedAt": "2022-11-06T12:10:27.823Z",
      "__v": 0
    },
    {
      "_id": "636788224fb19a85588fbb03",
      "title": "Lorem Ipsum 13",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:10:42.176Z",
      "updatedAt": "2022-11-06T12:10:47.059Z",
      "__v": 0
    },
    {
      "_id": "636788444fb19a85588fbb07",
      "title": "Lorem Ipsum 14",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "bola"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:11:16.490Z",
      "updatedAt": "2022-11-06T12:11:02.030Z",
      "__v": 0
    },
    {
      "_id": "636788614fb19a85588fbb0d",
      "title": "Lorem Ipsum 15",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "bola, sayo"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:11:45.517Z",
      "updatedAt": "2022-11-06T12:11:18.933Z",
      "__v": 0
    },
    {
      "_id": "6367886f4fb19a85588fbb11",
      "title": "Lorem Ipsum 16",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "bola"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:11:59.641Z",
      "updatedAt": "2022-11-06T12:11:56.065Z",
      "__v": 0
    },
    {
      "_id": "636788fb4fb19a85588fbb15",
      "title": "Lorem Ipsum 17",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "john"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:14:19.171Z",
      "updatedAt": "2022-11-06T12:12:12.748Z",
      "__v": 0
    },
    {
      "_id": "636789094fb19a85588fbb19",
      "title": "Lorem Ipsum 18",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "john"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:14:33.075Z",
      "updatedAt": "2022-11-06T12:12:57.591Z",
      "__v": 0
    },
    {
      "_id": "6367891a4fb19a85588fbb1d",
      "title": "Lorem Ipsum 19",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#alive"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:14:50.154Z",
      "updatedAt": "2022-11-06T12:13:33.886Z",
      "__v": 0
    }
  ]
}
```

To view results from page 2 with a limit of 2 blogs per page, send a request to: 

```text
/api/blog/all_blogs?page=2
```
the corresponding response will be 

```json
{
  "status": true,
  "publishedBlogs": [
    {
      "_id": "636789204fb19a85588fbb21",
      "title": "Lorem Ipsum 20",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#alive"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:14:56.262Z",
      "updatedAt": "2022-11-06T11:53:42.182Z",
      "__v": 0
    },
    {
      "_id": "6367895b4fb19a85588fbb37",
      "title": "Lorem Ipsum 25",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#sunday"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:15:55.162Z",
      "updatedAt": "2022-11-06T12:01:01.335Z",
      "__v": 0
    },
    {
      "_id": "636789944fb19a85588fbb47",
      "title": "Lorem Ipsum 29",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#project, #done"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:16:52.623Z",
      "updatedAt": "2022-11-06T11:55:29.550Z",
      "__v": 0
    },
    {
      "_id": "636789ce4fb19a85588fbb4f",
      "title": "Lorem Ipsum 31",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "published",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#done",
        "project"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:17:50.997Z",
      "updatedAt": "2022-11-06T11:55:02.783Z",
      "__v": 0
    }
  ]
}
```



To sort the blog by author, pass a query parameter `author` with the author id. 

for author order, send a GET request to
```text
/api/blog/all_blogs?author=63677c4c0a5ba888e0c67ac3
```

To sort the blog by read_count, pass a query parameter `order_by` with value `read_count` 
```text
/api/blog/all_blogs?order_by=read_count
```

To sort the blog by reading_time, pass a query parameter `order_by` with value `reading_time` 
```text
/api/blog/all_blogs?order_by=reading_time
```

To sort the blog by createdAt, pass a query parameter `order_by` with value `createdAt` 
```text
/api/blog/all_blogs?order_by=createdAt
```

To sort the blog by tags[], pass a query parameter `tags[]` with value `#alive` 
```text
/api/blog/all_blogs?tags[]=#alive
```

To sort the blog by title, pass a query parameter `title` with value `Lorem Ipsum 15` 
```text
/api/blog/all_blogs?title=#alive
```

To sort the blog by page, pass a query parameter `page` with value `1` 
```text
/api/blog/all_blogs?page=#alive
```

### Get a single published blog

To get a single published blog by it's ID, send a `GET` request to the `/api/blog/single_blog/:id` route where `:id` is the ID of the order. For example, a request to:

```text
/api/blog/single_blog/636786324fb19a85588fbacb
```

When a single blog is requested, the api return the user information(the author) with the blog like this:
```json
{
  "status": true,
  "data": {
    "_id": "636786324fb19a85588fbacb",
    "title": "Lorem Ipsum first",
    "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
    "author": {
      "_id": "63677c4c0a5ba888e0c67ac3",
      "first_name": "Darasimi",
      "last_name": "Emmanuel",
      "email": "dara@gmail.com",
    },
    "state": "published",
    "read_count": 3,
    "reading_time": 1,
    "tags": [
      "ade, sola, sayo"
    ],
    "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    "createdAt": "2022-11-06T10:02:26.615Z",
    "updatedAt": "2022-11-06T12:34:25.124Z",
    "__v": 0
  }
}
```

### Get list of author blogs published blog

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users that has created a blog
</details>

To get the list of blogs an author has created, send a `GET` request to the `/api/blog/user_blog`.
Send your login token through the bearer auth to get authorized, this is to make sure you're logged in and to verify you have created blogs.

```text
/api/blog/user_blog
```

When the api is called it's default to return first 5 blogs per page and it can be filtered by state and page, it returns a sample response like this:
```json
{
  "status": true,
  "blog": [
    {
      "_id": "6367892e4fb19a85588fbb27",
      "title": "Lorem Ipsum 21",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "draft",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#alive"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:15:10.353Z",
      "updatedAt": "2022-11-06T10:15:10.353Z",
      "__v": 0
    },
    {
      "_id": "6367893d4fb19a85588fbb2b",
      "title": "Lorem Ipsum 22",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "draft",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#sunday"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:15:25.982Z",
      "updatedAt": "2022-11-06T10:15:25.982Z",
      "__v": 0
    },
    {
      "_id": "636789434fb19a85588fbb2f",
      "title": "Lorem Ipsum 23",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "draft",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#sunday"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:15:31.884Z",
      "updatedAt": "2022-11-06T10:15:31.884Z",
      "__v": 0
    },
    {
      "_id": "6367894d4fb19a85588fbb33",
      "title": "Lorem Ipsum 24",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "draft",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#sunday"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:15:41.681Z",
      "updatedAt": "2022-11-06T10:15:41.681Z",
      "__v": 0
    },
    {
      "_id": "636789684fb19a85588fbb3b",
      "title": "Lorem Ipsum 26",
      "description": "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
      "author": "63677c4c0a5ba888e0c67ac3",
      "state": "draft",
      "read_count": 0,
      "reading_time": 1,
      "tags": [
        "#altschool"
      ],
      "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
      "createdAt": "2022-11-06T10:16:08.429Z",
      "updatedAt": "2022-11-06T10:16:08.429Z",
      "__v": 0
    }
  ]
}

```

### Delete Blog by ID

<details>
<summary> :sunglasses: </summary>
This route is only accessible to logged in users that has created a blog
</details>

To delete a blog by it's ID, send a `DELETE` request to the `/api/blog/delete_blog/:id` route where `:id` is the ID of the blog.


```text
/api/blog/delete_blog/636787d74fb19a85588fbaf3
```

and send your login token through the bearer auth to get authorization, this is to make sure you're logged in and to verify you're the owner of the blog you're about to delete.

If successful you'll get a response like this:

```json
{
  "status": true,
  "message": "Blog deleted successful"
}
```