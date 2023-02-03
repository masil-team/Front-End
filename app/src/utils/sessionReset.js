export default function reset(url) {
  if (url !== '/') {
    sessionStorage.removeItem('pageNum');
    sessionStorage.setItem('category', 1);
    sessionStorage.removeItem('postList');
  }
}
