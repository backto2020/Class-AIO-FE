export default function t2s(t) {
  if (t.constructor === Number) return new Date(t).toLocaleString();
  if (t.constructor === Date) return t.toLocaleString();
  return 'error';
}
