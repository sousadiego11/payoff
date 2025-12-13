# Payoff

Fictional demonstration project showcasing **Stripe** integration and **full stack** development using **React Router**.

## 📋 About the Project

Payoff is a demonstration application that simulates an e-commerce environment to test and showcase Stripe integrations. The project was developed to serve as a reference implementation for payments, including Checkout Sessions, Payment Intents, and Webhooks.

**⚠️ Important:** This is a demonstration project. Only Stripe test keys are used and no real payments are processed.

## 🛠️ Technologies

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **React Router 7** - Routing and server state management
- **TypeScript** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework
- **Stripe Elements** - Stripe payment components

### Backend
- **React Router (Server-side)** - Full stack framework
- **Stripe SDK** - Stripe API integration

### Tools
- **Vite** - Build tool and dev server
- **pnpm** - Package manager

## 🚀 Features

- ✅ **Checkout Sessions** - Complete Stripe payment flow
- ✅ **Payment Intents** - Granular control over payment process
- ✅ **Webhooks** - Real-time Stripe event processing
- ✅ **Responsive Interface** - Mobile and desktop adaptive design
- ✅ **Purchase Management** - Transaction history visualization

## 📦 Installation

```bash
# Install dependencies
pnpm install
```

## 🏃 Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`.

## 🏗️ Production Build

```bash
# Create production build
pnpm build

# Run production build
pnpm start
```

## 🔧 Stripe Configuration

To use this project, you will need to:

1. Create a [Stripe](https://stripe.com) account
2. Get your API keys (test mode)
3. Configure environment variables with your keys
4. Set up the webhook endpoint in the Stripe dashboard

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
├── routes/             # Application routes and pages
├── server/             # Server logic and Stripe integration
├── hooks/              # Custom React hooks
└── assets/             # Static resources
```

## 🎯 Purpose

This project serves as:
- **Demonstration** of complete Stripe integration
- **Reference** for full stack development with React Router
- **Template** for projects that need to process payments
- **Learning** resource for modern web application best practices

## 📝 License

This is a demonstration project and can be freely used for educational purposes.

---

Built with ❤️ using React Router and Stripe.
