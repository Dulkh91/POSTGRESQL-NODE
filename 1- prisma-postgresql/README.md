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