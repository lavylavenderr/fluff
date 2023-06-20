export default function cleanName(username: string) {
  const chars: { [key: string]: string } = {
    "*": "\\*",
    _: "\\_",
    "~": "\\~",
    "@": "@\u200b",
  };
  return username.replace(/[*_~@]/g, (m) => chars[m]);
}
