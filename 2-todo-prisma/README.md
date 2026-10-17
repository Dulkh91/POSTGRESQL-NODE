# create post todo

post method of todos:
```bash
const todos = await prisma.todo.create({
       data:{
        title: title.trim(),
        ...(description === undefined ? {}: {description}),
        priority,
        author: {
          connect: {id: parsedAuthorId}
        },
      },
      include: {author: true}
    })
```

postman body:
```bash
{
    "title": "រៀន prisma",
    "description": "រៀន prisma ជាមួយ node express",
    "priority": "low",
    "userId": 1
}
```
responce:
```bash
{
    "id": 1,
    "title": "រៀន prisma",
    "description": "រៀន prisma ជាមួយ node express",
    "completed": false,
    "priority": "low",
    "createdAt": "2026-10-17T09:43:48.183Z",
    "updatedAt": "2026-10-17T09:43:48.183Z",
    "userId": 1,
    "user": {
        "id": 1,
        "name": "Dul",
        "email": "dul@example.com",
        "createdAt": "2026-10-17T08:55:52.062Z"
    }
}
```


### patch និង put 
PATCH ប្រើសម្រាប់ update ទិន្នន័យដែរ—វាប្ដូរតែ field ដែលផ្ញើមកប៉ុណ្ណោះ។ ដូច្នេះ route មួយនេះអាចប្រើសម្រាប់ completed, title, description ឬ priority បាន។


PUT ជាទូទៅប្រើពេលចង់ជំនួស resource ទាំងមូល។

