---
id: error-codes
title: Error Codes
sidebar_position: 4
---

# ⚠️ Error Codes

All API errors return a consistent JSON error structure:

```json
{
  "error": "Human-readable error message"
}
```

## HTTP Status Codes Used

| Code | Name | When it occurs |
|---|---|---|
| `200` | OK | Request succeeded |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid or missing request body fields |
| `404` | Not Found | Requested resource does not exist |
| `500` | Internal Server Error | Unexpected server-side error |
