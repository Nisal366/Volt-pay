export default function IconBadge({ icon }) {
  const icons = {
    pin: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 6c-11 0-20 9-20 20 0 15 20 32 20 32s20-17 20-32C52 15 43 6 32 6Zm0 27a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
      </svg>
    ),
    alert: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 8 5 55h54L32 8Zm3 38h-6v6h6v-6Zm0-23h-6v18h6V23Z" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 8C18 8 7 17 7 29c0 7 4 13 10 17l-2 10 11-6h6c14 0 25-9 25-21S46 8 32 8Zm-10 25a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm20 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm-10 7c-6 0-10-3-12-6h24c-2 3-6 6-12 6Z" />
      </svg>
    ),
    meter: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 7C18 7 7 18 7 32c0 7 3 14 8 18h34c5-4 8-11 8-18C57 18 46 7 32 7Zm0 8c4 0 8 1 11 3l-4 7a15 15 0 0 0-7-2v-8Zm-11 6c2-2 4-4 7-5v8c-2 1-4 2-5 4l-7-4c1-1 3-3 5-3Zm-6 25a20 20 0 0 1-3-10h8c0 3 1 5 3 7l-8 3Zm17-1a8 8 0 0 1-8-8c0-5 3-8 8-8 2 0 4 1 5 2l10-7 3 4-9 8v1c0 4-4 8-9 8Zm17 1-8-3c2-2 3-5 3-7h8c0 4-1 7-3 10Z" />
      </svg>
    )
  };

  return <div className="icon-badge">{icons[icon] || icons.pin}</div>;
}
