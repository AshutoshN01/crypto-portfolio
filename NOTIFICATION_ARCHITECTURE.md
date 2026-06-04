NOTIFICATION_ARCHITECTURE
=========================

Scope
-----
Design a robust, scalable notification system supporting in-app, email, push (web/mobile), Telegram, and Discord webhook deliveries. System must be reliable, observable, rate-limited, and extensible.

High-level architecture
-----------------------
- API Producers: backend services (alerts engine, jobs, user actions) publish notification events to a queue.
- Queue: Redis-backed reliable queue (BullMQ) or a managed task queue. Each channel has its worker pool.
- Delivery Workers: channel-specific workers (in-app writer, email sender, push gateway, Telegram bot, Discord webhook) that process, retry, and log outcomes.
- Delivery store: MongoDB collection storing all notifications and delivery statuses for audit/UX.
- Retry & DLQ: exponential backoff, jitter, and Dead Letter Queue for permanent failures.

Flow
----
1. Event generated (e.g., price alert triggered).
2. Service publishes normalized NotificationEvent to Redis queue.
3. Notification router worker consumes and enqueues channel-specific deliveries.
4. Delivery workers attempt delivery; on success update DB and emit socket/real-time push to connected clients.
5. On failure apply retry policy; if retries exhausted, send admin alert and persist failure.

Database schema (design)
-----------------------
Notification (core)
```
Notification {
  _id: ObjectId,
  userId: ObjectId,
  type: string, // 'alert','transaction','system'
  title: string,
  body: string,
  data: object, // structured payload
  channels: { inApp: boolean, email: boolean, push: boolean, telegram: boolean, discord: boolean }
  status: 'pending' | 'delivered' | 'failed' | 'retrying',
  attempts: Number default 0,
  lastAttemptAt: Date | null,
  createdAt: Date,
  deliveredAt: Date | null
}
```

DeliveryLog
```
DeliveryLog {
  _id: ObjectId,
  notificationId: ObjectId,
  channel: string,
  provider: string, // e.g., 'sendgrid','pushgateway'
  status: 'queued'|'sent'|'failed',
  attempt: Number,
  responseCode: Number | null,
  responseBody: Text | null,
  createdAt: Date
}
```

Queue architecture
------------------
- Separate logical queues per priority: high-priority (security alerts), standard (alerts), low (digests).
- Channel sub-queues: email-queue, push-queue, telegram-queue to allow independent scaling.
- Use Redis streams or BullMQ with job events for observability.

Retry logic
-----------
- Exponential backoff: base 2s, factor 2, max interval 1 hour, jitter ±10%.
- Max attempts: 6 by default.
- Permanent failures (4xx from provider) are not retried unless transient.
- On repeated provider failures, escalate to fallback channel (in-app) and create an admin incident.

Rate limiting
-------------
- Global limits: per-user-per-channel e.g., 1 email per 5 minutes by default for alert floods.
- Provider-specific throttling: maintain token buckets per provider.
- Per-channel concurrency limits to avoid hitting provider throttles.

Delivery tracking & observability
--------------------------------
- Persist DeliveryLog for each send attempt.
- Metrics: success rate, P95 latency, queue depth, retries, failures per provider.
- Alerts: Sentry for worker errors, Prometheus alerts for elevated failure rate or queue depth.

Scalability & extensibility
---------------------------
- Worker pools horizontally scalable; workers stateless aside from Redis.
- Add new channels by implementing a DeliveryWorker adapter that conforms to interface: send(payload) -> promise<Result>.
- For heavy email volumes, route through dedicated email service (SendGrid/Postmark) with templates and throttling.

Security
--------
- Sensitive secrets stored in KMS; do not persist provider secrets in plaintext.
- Validate webhooks and provide HMAC signing for outgoing webhooks to external services.

In-app real-time delivery
------------------------
- Use WebSocket / Server-Sent Events or a managed socket service to push delivered notifications to connected clients.
- For offline users, flag unread notifications in DB; the client polls or syncs on reconnect.

Telegram & Discord
------------------
- Telegram: implement bot with registered webhook or long polling; respect Telegram rate limits and message formatting.
- Discord: send to configured webhook URLs; validate response codes and retry on 5xx.

Failure modes and recovery
-------------------------
- Maintain Dead Letter Queue and an admin UI to inspect and requeue failed notifications.
- Provide manual resend and analytics dashboard for notification health.

Compliance & privacy
--------------------
- PII in notifications should be minimal; if required, store only necessary metadata and send secure links for sensitive info.

End of NOTIFICATION_ARCHITECTURE
