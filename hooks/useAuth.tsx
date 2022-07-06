

export default function useAuth() {
  fetch('/api/logged').then((response) => console.log('response', response))
  return false;
}