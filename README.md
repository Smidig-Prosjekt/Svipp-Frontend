This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Kom i gang lokalt

### Forutsetninger

- Node.js (versjon 18+ anbefalt)
- `npm` (følger med Node)
- Svipp API kjørende lokalt på `http://localhost:5087` (se API‑README for hvordan du starter backend)

Frontend er satt opp til å proxye alle kall til `/api/*` videre til backend via `next.config.ts`:

```ts
// next.config.ts
rewrites() {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:5087/api/:path*",
    },
  ];
}
```

### 1. Installer avhengigheter

I rotmappen til `Svipp-Frontend`:

```bash
npm install
```

### 2. Start utviklingsserveren

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Deretter åpner du `http://localhost:3000` i nettleseren.

- `http://localhost:3000/login` – logg inn
- `http://localhost:3000/register` – registrer ny bruker

Husk at backend må kjøre for at innlogging/registrering skal fungere.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
