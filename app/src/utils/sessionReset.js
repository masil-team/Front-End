export default function reset(url) {
  if (url !== '/') {
    sessionStorage.removeItem('pageNum');
    sessionStorage.setItem('category', 1);
    sessionStorage.removeItem('postList');
    sessionStorage.removeItem('myPageList');
    sessionStorage.removeItem('myPageNum');
    sessionStorage.removeItem('searchAddress');
    sessionStorage.removeItem('searchList');
  }
}
