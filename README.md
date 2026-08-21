# Payment Gateway Prototype

A React and Vite frontend that demonstrates a QRIS-style payment flow. The current UI validates an amount, builds a QR representation, and includes service modules for creating users and transactions through an API.

> **Prototype notice:** this repository is not a payment processor and must not be used to handle real customer funds or personal data without a properly secured backend, provider integration, authentication, audit logging, and compliance review.

## What is implemented

| Area | Current behavior |
| --- | --- |
| Frontend | React single-page interface with reusable layout components |
| Amount entry | Client-side validation and Indonesian Rupiah formatting |
| QR display | QR representation generated from the current payment payload |
| API services | Separate user and transaction modules using Axios |
| Build | Vite production build and ESLint checks |

The live page is intentionally described as a prototype because the backend transaction call and provider credentials are not part of this repository.

## Requirements

Node.js 18 or newer and npm are required.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run lint
npm run build
npm run preview
```

## API configuration

The frontend uses same-origin routes by default. Set these variables when the API is hosted elsewhere:

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_USER_URL` | `/api/create-user` | User creation endpoint |
| `VITE_API_PAYMENT_URL` | `/api/create-transaction` | Transaction creation endpoint |

Only public, non-secret configuration belongs in `VITE_*` variables. Provider server keys, signing secrets, and database credentials must remain on the backend.

## Deployment notes

Deploy the generated `dist/` directory through a Vite-compatible host. Configure the two API URLs for the deployed environment and verify CORS, HTTPS, error handling, idempotency, and webhook signature validation on the server before connecting a payment provider.

## Known limitations

The repository does not include a payment backend, persistent order state, authentication, webhook processing, automated tests, or production-grade payment security. The QR payload should be treated as a demonstration value until it is replaced by a provider-issued, server-generated transaction payload.

## License

Released under the [MIT License](LICENSE).
