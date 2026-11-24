# Convo Next

Build a private, text-only app with Chats, Feed, and People. Support text and Unicode emoji. Exclude media uploads, files, calls, and rich previews.

## Foundation

Preserve Convo's current accounts, friendships, and legacy chat data. Ship HTTPS, shared OpenID Connect with verified account linking, revocable sessions and passkeys, per-request authorization, rate limits, blocking, muting, and reports. Keep reports in a restricted queue and audit moderator actions.

## Encrypted chats

Use a private Matrix homeserver and the Matrix JavaScript SDK with Rust crypto. Disable public rooms, guests, federation, and media endpoints. Use invite-only rooms with history available from admission. Support direct and group chat, replies, reactions, edits, unread counts, optional typing and receipts, device verification, encrypted recovery, and local search. Rotate sending keys on removal. Preserve a labeled, read-only legacy archive and create one encrypted room per migrated conversation. Never fall back to plaintext sending. Let people preview any excerpt shared with moderators. Push notifications can follow launch and must omit message content.

## Social

Offer chronological friends and private-group feeds with text posts, one level of comments, emoji reactions, author edits and deletion, and in-app activity. Check current friendship and membership on every resource access. Couple chat and feed membership changes with an idempotent background job. Limit posts to 4,000 characters and comments to 2,000. Hide blocked content and honor mutes on activity. Label the server-managed feed.

## Rollout

Release privacy infrastructure first, then pilot encrypted conversations, then open the private feeds. Gate releases on account, membership, and revocation checks, encrypted recovery and removal tests, reconnect and pagination tests, moderation access, and mobile accessibility. Monitor delivery, recovery, membership sync, and moderation backlog without collecting content.
