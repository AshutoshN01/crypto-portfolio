DATABASE_EXTENSION
==================

This document expands the data model with Wallet, ExchangeAccount, and Goal schemas. Schemas are design-level (Mongoose/JSON Schema friendly) and include fields, validation, indexes, relationships, and notes about transactional behavior.

1) Wallet
---------
Purpose: store user-managed blockchain wallet addresses and metadata for future on-chain sync and balance tracking.

Schema (design)
```
Wallet {
  _id: ObjectId,
  userId: ObjectId (ref Users)  // required, index
  walletName: string (required, 1-80 chars)
  walletAddress: string (required, unique per user, checksummed),
  walletType: enum ['hardware','software','custodial','watch-only'] default 'watch-only',
  blockchain: string (required) // e.g., 'ethereum', 'solana'
  network: string (required) // e.g., 'mainnet', 'goerli'
  balance: { value: Number, currency: String, lastUpdatedAt: Date } // aggregated fiat/native
  metadata: { derivationPath?: string, label?: string, notes?: string }
  isActive: boolean default true
  createdAt: Date default now
  updatedAt: Date
}
```

Indexes
- compound index: { userId: 1, walletAddress: 1 } unique
- index: { userId: 1 }

Relationships
- belongsTo User (userId)
- wallets will be used by background jobs to read balances and transaction history

Validation
- walletAddress format validated per blockchain via provider-adapter
- enforce checksummed address where applicable

2) ExchangeAccount
-------------------
Purpose: store third-party exchange connectivity for users (API keys encrypted) — used for balance sync and trade import.

Schema (design)
```
ExchangeAccount {
  _id: ObjectId,
  userId: ObjectId (ref Users) // required, index
  exchangeName: string (required) // e.g., 'binance'
  apiKeyEncrypted: string (required) // encrypted at rest with KMS
  secretEncrypted: string (required)
  permissions: [ 'read' | 'trade' | 'withdraw' ] // string array
  status: 'active' | 'disabled' | 'revoked' | 'pending'
  lastSyncAt: Date
  syncError: { code: String, message: String } | null
  createdAt: Date
  updatedAt: Date
}
```

Indexes
- compound index: { userId: 1, exchangeName: 1 } unique

Relationships
- belongsTo User
- links to Transaction imports (transactions created by sync reference exchangeAccountId)

Validation
- apiKeyEncrypted and secretEncrypted stored as ciphertext; rotate keys by migrating encryption at application level.
- permissions validated against a whitelist

3) Goal
-------
Purpose: user-defined financial goals tied to portfolios or global user scope.

Schema (design)
```
Goal {
  _id: ObjectId,
  userId: ObjectId (ref Users) // required, index
  portfolioId: ObjectId | null // optional link to portfolio
  goalName: string (required)
  targetValue: Number (required) // in user's base currency
  currentValue: Number default 0
  deadline: Date | null
  status: 'active' | 'completed' | 'paused' | 'failed'
  notifyOnMilestonePct: [10,25,50,75,100] default [25,50,75,100]
  createdAt: Date
  updatedAt: Date
}
```

Indexes
- index: { userId: 1 }
- optional index: { portfolioId: 1 }

Relationships
- belongsTo User; optional belongsTo Portfolio

Validation
- targetValue > 0
- deadline must be in the future when set

Transaction notes
- Updates to `currentValue` should be performed by scheduled jobs calculating portfolio valuation; use transactions when writing multiple docs.

Notes on encryption and secrets
- Store encrypted API credentials using a KMS-backed service or per-platform secret storage; encrypt before writing to DB.

End of DATABASE_EXTENSION
