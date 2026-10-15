# Create Users

ដោយយើងប្រើពីរ method គឺ GET និង POST ។ ដោយ GET គឺទាញ users មកបង្ហាញ។ ចំណែកឯ POST បញ្ចូល ឈ្មោះ និង email របស់ user តាមរយ postman។ ដើម្បីបញ្ចូលវាបានយើងត្រូវ៖
សរសេរនៅ body:
```bash
{
  "name" : "Dul",
  "email" : "dul@example.com"
}
```
Header ត្រូវកំណត់៖
```bash
Content-Type: application/json
```

## .env
```bash
DATABASE_URL="postgresql://postgres:r**t@localhost:5432/express_db?schema=public"
```

# create post
http://localhost:3000/posts

សរសេរ postman 
```bash
{
  "title": "My first post",
  "body": "Post content",
  "authorId": 1
}
```

វាបាន respont 
```bash
[
  {
    "id": 1,
    "title": "My first post",
    "body": "Post content",
    "published": false,
    "createAt": "2026-10-15T15:35:50.270Z",
    "updateAt": "2026-10-15T15:35:50.270Z",
    "authorId": 1,
    "author": {
      "id": 1,
      "name": "Dara",
      "email": "dara@example.com",
      "createAt": "2026-10-15T13:45:23.429Z"
    }
  }
]
```